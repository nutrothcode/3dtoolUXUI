import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { ModelTypeId } from '../modelTypes'

export type ProjectState = {
  name: string
  modelTypeId: ModelTypeId
  customTypeName: string
  created: string
  modified: string
  sceneFileCount: number
  assetCount: number
}

type Action =
  | { type: 'SET_NAME'; name: string }
  | { type: 'SET_MODEL_TYPE'; id: ModelTypeId }
  | { type: 'SET_CUSTOM_TYPE_NAME'; name: string }
  | { type: 'TOUCH' }

function reducer(state: ProjectState, action: Action): ProjectState {
  const today = new Date().toISOString().slice(0, 10)
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.name, modified: today }
    case 'SET_MODEL_TYPE':
      return { ...state, modelTypeId: action.id, modified: today }
    case 'SET_CUSTOM_TYPE_NAME':
      return { ...state, customTypeName: action.name, modified: today }
    case 'TOUCH':
      return { ...state, modified: today }
    default:
      return state
  }
}

const DEFAULT: ProjectState = {
  name: 'MyProject',
  modelTypeId: 'character',
  customTypeName: '',
  created: '2024-11-02',
  modified: '2024-11-10',
  sceneFileCount: 3,
  assetCount: 24,
}

type ProjectCtx = {
  project: ProjectState
  dispatch: React.Dispatch<Action>
}

const ProjectContext = createContext<ProjectCtx | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, dispatch] = useReducer(reducer, DEFAULT)
  return <ProjectContext.Provider value={{ project, dispatch }}>{children}</ProjectContext.Provider>
}

export function useProjectStore() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProjectStore must be used inside ProjectProvider')
  return ctx
}
