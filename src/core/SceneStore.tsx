import { createContext, useContext, useReducer, type ReactNode } from 'react'
import { getTemplate } from '../templates/templates'
import type { ModelTypeId } from '../modelTypes'

/* ── SceneNode (replaces BoneNode) ── */
export type SceneNodeType = 'mesh' | 'group' | 'bone' | 'light' | 'camera' | 'material'

export type SceneNode = {
  id: string
  label: string
  type: SceneNodeType
  parentId: string | null
  open: boolean
  visible: boolean
  locked: boolean
}

/* ── Actions ── */
type Action =
  | { type: 'SET_NODES'; nodes: SceneNode[] }
  | { type: 'UPDATE_NODE'; id: string; patch: Partial<SceneNode> }
  | { type: 'ADD_NODE'; node: SceneNode }
  | { type: 'DELETE_NODE'; id: string; andDescendants: boolean }
  | { type: 'MOVE_NODE'; dragId: string; targetId: string; where: 'before' | 'after' | 'inside' }

function descendants(nodes: SceneNode[], id: string): string[] {
  const children = nodes.filter(n => n.parentId === id)
  return children.flatMap(c => [c.id, ...descendants(nodes, c.id)])
}

function reducer(state: SceneNode[], action: Action): SceneNode[] {
  switch (action.type) {
    case 'SET_NODES':
      return action.nodes

    case 'UPDATE_NODE':
      return state.map(n => n.id === action.id ? { ...n, ...action.patch } : n)

    case 'ADD_NODE':
      return [...state, action.node]

    case 'DELETE_NODE': {
      const toRemove = action.andDescendants
        ? new Set([action.id, ...descendants(state, action.id)])
        : new Set([action.id])
      return state.filter(n => !toRemove.has(n.id))
    }

    case 'MOVE_NODE': {
      const { dragId, targetId, where } = action
      if (dragId === targetId) return state
      if (descendants(state, dragId).includes(targetId)) return state

      const target = state.find(n => n.id === targetId)
      if (!target) return state

      const dragNode = state.find(n => n.id === dragId)
      if (!dragNode) return state

      const newParent = where === 'inside' ? targetId : target.parentId
      const patched = { ...dragNode, parentId: newParent }
      const without = state.filter(n => n.id !== dragId)
      const idx = without.findIndex(n => n.id === targetId)

      if (where === 'before') {
        return [...without.slice(0, idx), patched, ...without.slice(idx)]
      } else if (where === 'after') {
        return [...without.slice(0, idx + 1), patched, ...without.slice(idx + 1)]
      } else {
        return [...without, patched]
      }
    }

    default:
      return state
  }
}

/* ── Context ── */
type SceneCtx = {
  nodes: SceneNode[]
  dispatch: React.Dispatch<Action>
}

const SceneContext = createContext<SceneCtx | null>(null)

export function SceneProvider({ children, modelTypeId }: { children: ReactNode; modelTypeId: ModelTypeId }) {
  const template = getTemplate(modelTypeId)
  const [nodes, dispatch] = useReducer(reducer, template.defaultHierarchy)
  return <SceneContext.Provider value={{ nodes, dispatch }}>{children}</SceneContext.Provider>
}

export function useSceneStore() {
  const ctx = useContext(SceneContext)
  if (!ctx) throw new Error('useSceneStore must be used inside SceneProvider')
  return ctx
}
