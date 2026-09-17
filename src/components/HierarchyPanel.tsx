import { useRef, useCallback, useEffect, useState } from 'react'
import { useSceneStore, type SceneNode, type SceneNodeType } from '../core/SceneStore'
import { useSelection } from '../core/SelectionStore'

type DropPos = { id: string; where: 'before' | 'after' | 'inside' } | null
type CtxMenu = { id: string; x: number; y: number } | null

/* ── build ordered display list ── */
function buildList(
  nodes: SceneNode[],
  parentId: string | null,
  depth: number,
  out: { node: SceneNode; depth: number }[],
) {
  const children = nodes.filter(n => n.parentId === parentId)
  for (const c of children) {
    out.push({ node: c, depth })
    if (c.open) buildList(nodes, c.id, depth + 1, out)
  }
}

/* ── collect all descendant ids ── */
function descendants(nodes: SceneNode[], id: string): string[] {
  const children = nodes.filter(n => n.parentId === id)
  return children.flatMap(c => [c.id, ...descendants(nodes, c.id)])
}

let _uid = 0
const uid = () => `node_${++_uid}`

/* ── node type icon + color ── */
const NODE_TYPE_META: Record<SceneNodeType, { icon: string; color: string }> = {
  mesh:     { icon: '⬡', color: '#4a90d9' },
  group:    { icon: '▣', color: '#f0c040' },
  bone:     { icon: '◆', color: '#27c96a' },
  light:    { icon: '☀', color: '#f09030' },
  camera:   { icon: '◎', color: '#c060d0' },
  material: { icon: '◈', color: '#e91e8c' },
}

export default function HierarchyPanel() {
  const { nodes, dispatch } = useSceneStore()
  const { primaryId, dispatch: selDispatch } = useSelection()

  const selected = primaryId ?? ''
  const setSelected = (id: string) => selDispatch({ type: 'SELECT', id })

  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameVal, setRenameVal] = useState('')
  const [dragId, setDragId] = useState<string | null>(null)
  const [dropPos, setDropPos] = useState<DropPos>(null)
  const [ctxMenu, setCtxMenu] = useState<CtxMenu>(null)
  const [search, setSearch] = useState('')
  const [addType, setAddType] = useState<SceneNodeType>('mesh')
  const renameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!ctxMenu) return
    const close = () => setCtxMenu(null)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [ctxMenu])

  useEffect(() => {
    if (renamingId && renameRef.current) {
      renameRef.current.focus()
      renameRef.current.select()
    }
  }, [renamingId])

  /* ── display list ── */
  const displayList: { node: SceneNode; depth: number }[] = []
  buildList(nodes, null, 0, displayList)

  const filtered = search
    ? displayList.filter(({ node }) => node.label.toLowerCase().includes(search.toLowerCase()))
    : displayList

  /* ── helpers ── */
  const update = useCallback((id: string, patch: Partial<SceneNode>) => {
    dispatch({ type: 'UPDATE_NODE', id, patch })
  }, [dispatch])

  const startRename = (id: string) => {
    const n = nodes.find(n => n.id === id)
    if (!n) return
    setRenamingId(id)
    setRenameVal(n.label)
    setCtxMenu(null)
  }

  const commitRename = () => {
    if (renamingId && renameVal.trim()) update(renamingId, { label: renameVal.trim() })
    setRenamingId(null)
  }

  const deleteNode = (id: string) => {
    dispatch({ type: 'DELETE_NODE', id, andDescendants: true })
    if (selected === id) setSelected('')
    setCtxMenu(null)
  }

  const addNode = (parentId: string | null, type: SceneNodeType = addType) => {
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1)
    const newNode: SceneNode = {
      id: uid(), label: `new_${type}`, type, parentId, open: false, visible: true, locked: false,
    }
    dispatch({ type: 'ADD_NODE', node: newNode })
    setSelected(newNode.id)
    setTimeout(() => startRename(newNode.id), 30)
    setCtxMenu(null)
    return newNode
  }

  const duplicate = (id: string) => {
    const src = nodes.find(n => n.id === id)
    if (!src) return
    const newNode: SceneNode = { ...src, id: uid(), label: src.label + '_copy' }
    dispatch({ type: 'ADD_NODE', node: newNode })
    setSelected(newNode.id)
    setCtxMenu(null)
  }

  const getSiblings = (id: string) => {
    const node = nodes.find(n => n.id === id)
    if (!node) return []
    return nodes.filter(n => n.parentId === node.parentId)
  }

  const moveAmongSiblings = (id: string, dir: -1 | 1) => {
    const sibs = getSiblings(id)
    const idx = sibs.findIndex(s => s.id === id)
    const newIdx = idx + dir
    if (newIdx < 0 || newIdx >= sibs.length) return
    const swapId = sibs[newIdx].id
    // swap in array by moving before/after sibling
    const where = dir === -1 ? 'before' : 'after'
    dispatch({ type: 'MOVE_NODE', dragId: id, targetId: swapId, where })
    setCtxMenu(null)
  }

  const expandAll = () => nodes.forEach(n => update(n.id, { open: true }))
  const collapseAll = () => nodes.forEach(n => update(n.id, { open: false }))

  /* ── drag & drop ── */
  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!dragId || dragId === targetId) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const y = e.clientY - rect.top
    const h = rect.height
    const where: 'before' | 'after' | 'inside' = y < h * 0.28 ? 'before' : y > h * 0.72 ? 'after' : 'inside'
    setDropPos({ id: targetId, where })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!dragId || !dropPos) { setDragId(null); setDropPos(null); return }
    dispatch({ type: 'MOVE_NODE', dragId, targetId: dropPos.id, where: dropPos.where })
    setDragId(null)
    setDropPos(null)
  }

  const selNode = nodes.find(n => n.id === selected)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', userSelect: 'none' }}
      onClick={() => setCtxMenu(null)}
      onDragLeave={() => setDropPos(null)}
    >
      {/* Search + actions bar */}
      <div style={{ padding: '6px 10px', borderBottom: '1px solid #1e1b2c', flexShrink: 0 }}>
        <div style={{ position: 'relative', marginBottom: 6 }}>
          <span style={{ position: 'absolute', left: 7, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: '#3e3c58', pointerEvents: 'none' }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search scene nodes..."
            style={{ width: '100%', background: '#181626', border: '1px solid #252336', borderRadius: 5, color: '#c0bfd4', padding: '4px 8px 4px 24px', fontSize: 10.5 }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6a6888', cursor: 'pointer', fontSize: 11, padding: 0 }}>✕</button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={expandAll} style={{ flex: 1, padding: '3px', border: '1px solid #252336', borderRadius: 4, background: '#181626', color: '#8a8aaa', fontSize: 9.5, cursor: 'pointer' }}>Expand All</button>
          <button onClick={collapseAll} style={{ flex: 1, padding: '3px', border: '1px solid #252336', borderRadius: 4, background: '#181626', color: '#8a8aaa', fontSize: 9.5, cursor: 'pointer' }}>Collapse All</button>
          {selNode && (
            <button onClick={() => update(selected, { visible: !selNode.visible })} style={{ padding: '3px 7px', border: '1px solid #252336', borderRadius: 4, background: '#181626', color: selNode.visible ? '#27c96a' : '#4a4868', fontSize: 11, cursor: 'pointer' }} title="Toggle visibility">
              {selNode.visible ? '👁' : '🙈'}
            </button>
          )}
        </div>
      </div>

      {/* Tree */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }} onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
        {filtered.map(({ node, depth }) => {
          const hasChildren = nodes.some(n => n.parentId === node.id)
          const isSelected = selected === node.id
          const isDragging = dragId === node.id
          const isDropTarget = dropPos?.id === node.id
          const isRenaming = renamingId === node.id
          const meta = NODE_TYPE_META[node.type] ?? NODE_TYPE_META.mesh

          return (
            <div key={node.id}>
              {isDropTarget && dropPos?.where === 'before' && (
                <div style={{ height: 2, background: '#e91e8c', margin: `0 0 0 ${8 + depth * 14}px`, borderRadius: 1 }} />
              )}

              <div
                draggable
                onDragStart={e => { e.dataTransfer.effectAllowed = 'move'; setDragId(node.id) }}
                onDragOver={e => handleDragOver(e, node.id)}
                onDrop={handleDrop}
                onClick={e => { e.stopPropagation(); setSelected(node.id); setCtxMenu(null) }}
                onDoubleClick={() => startRename(node.id)}
                onContextMenu={e => { e.preventDefault(); setSelected(node.id); setCtxMenu({ id: node.id, x: e.clientX, y: e.clientY }) }}
                style={{
                  display: 'flex', alignItems: 'center',
                  paddingLeft: 8 + depth * 14, paddingRight: 8, paddingTop: 3, paddingBottom: 3,
                  cursor: 'pointer',
                  opacity: isDragging ? 0.4 : node.locked ? 0.6 : 1,
                  background: isSelected
                    ? 'rgba(233,30,140,0.18)'
                    : isDropTarget && dropPos?.where === 'inside'
                      ? 'rgba(233,30,140,0.08)'
                      : 'transparent',
                  outline: isDropTarget && dropPos?.where === 'inside' ? '1px solid #e91e8c' : 'none',
                  outlineOffset: -1,
                }}
                onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}
                onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                {/* Drag handle */}
                <span style={{ fontSize: 9, color: '#2e2c44', marginRight: 3, cursor: 'grab', opacity: 0.7 }}>⣿</span>

                {/* Expand/collapse triangle */}
                <span
                  onClick={e => { e.stopPropagation(); update(node.id, { open: !node.open }) }}
                  style={{ fontSize: 7, color: hasChildren ? '#6a6888' : 'transparent', marginRight: 4, width: 8, cursor: hasChildren ? 'pointer' : 'default', flexShrink: 0 }}
                >
                  {node.open ? '▼' : '▶'}
                </span>

                {/* Node type icon */}
                <span style={{ fontSize: 9, color: meta.color, marginRight: 5, flexShrink: 0 }}>{meta.icon}</span>

                {/* Label or rename input */}
                {isRenaming ? (
                  <input
                    ref={renameRef}
                    value={renameVal}
                    onChange={e => setRenameVal(e.target.value)}
                    onBlur={commitRename}
                    onKeyDown={e => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') setRenamingId(null); e.stopPropagation() }}
                    onClick={e => e.stopPropagation()}
                    style={{ flex: 1, background: '#252336', border: '1px solid #e91e8c', borderRadius: 3, color: '#e0dff0', padding: '1px 5px', fontSize: 10.5, outline: 'none' }}
                  />
                ) : (
                  <span style={{
                    flex: 1, fontSize: 10.5,
                    color: isSelected ? '#e91e8c' : node.visible ? '#c0bfd4' : '#3e3c58',
                    fontWeight: isSelected ? 600 : 400,
                    textDecoration: node.visible ? 'none' : 'line-through',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {node.label}
                  </span>
                )}

                {/* Lock icon */}
                {node.locked && <span style={{ fontSize: 9, color: '#5a5878', marginLeft: 3, flexShrink: 0 }}>🔒</span>}

                {/* Visibility eye */}
                <span
                  onClick={e => { e.stopPropagation(); update(node.id, { visible: !node.visible }) }}
                  style={{ fontSize: 10, color: node.visible ? '#3a3858' : '#6a6888', marginLeft: 4, cursor: 'pointer', flexShrink: 0, opacity: isSelected ? 1 : 0.5 }}
                  title={node.visible ? 'Hide' : 'Show'}
                >👁</span>
              </div>

              {isDropTarget && dropPos?.where === 'after' && (
                <div style={{ height: 2, background: '#e91e8c', margin: `0 0 0 ${8 + depth * 14}px`, borderRadius: 1 }} />
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#3e3c58', fontSize: 11, padding: '20px 0' }}>
            {search ? 'No scene nodes match' : 'No scene nodes'}
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div style={{ padding: '6px 10px', borderTop: '1px solid #1e1b2c', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 4, marginBottom: 5 }}>
          <select
            value={addType}
            onChange={e => setAddType(e.target.value as SceneNodeType)}
            style={{ flex: 1, background: '#181626', border: '1px solid #252336', borderRadius: 4, color: '#c0bfd4', padding: '3px 6px', fontSize: 10, cursor: 'pointer' }}
          >
            {(Object.keys(NODE_TYPE_META) as SceneNodeType[]).map(t => (
              <option key={t} value={t}>{NODE_TYPE_META[t].icon} {t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
          <button onClick={() => addNode(selected || null)} style={{ flex: 1, padding: '4px', border: '1px solid #252336', borderRadius: 5, background: '#181626', color: '#c0bfd4', fontSize: 10, cursor: 'pointer' }}>+ Add Node</button>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={() => selected && startRename(selected)} disabled={!selected} style={{ flex: 1, padding: '4px', border: '1px solid #252336', borderRadius: 5, background: '#181626', color: selected ? '#c0bfd4' : '#3e3c58', fontSize: 10, cursor: selected ? 'pointer' : 'default' }}>Rename</button>
          <button onClick={() => selected && update(selected, { locked: !selNode?.locked })} disabled={!selected} style={{ padding: '4px 7px', border: '1px solid #252336', borderRadius: 5, background: '#181626', color: selNode?.locked ? '#e91e8c' : '#6a6888', fontSize: 10, cursor: selected ? 'pointer' : 'default' }} title="Toggle lock">🔒</button>
          <button onClick={() => selected && deleteNode(selected)} disabled={!selected} style={{ padding: '4px 8px', border: '1px solid rgba(224,64,64,0.35)', borderRadius: 5, background: 'rgba(224,64,64,0.08)', color: selected ? '#e04040' : '#3e3c58', fontSize: 10, cursor: selected ? 'pointer' : 'default' }}>Delete</button>
        </div>
      </div>

      {/* Context menu */}
      {ctxMenu && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'fixed', left: ctxMenu.x, top: ctxMenu.y, zIndex: 9999,
            background: '#18162a', border: '1px solid #2e2c48', borderRadius: 7,
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)', minWidth: 170, overflow: 'hidden',
          }}
        >
          {[
            { label: '✏️  Rename', action: () => startRename(ctxMenu.id) },
            { label: `➕  Add Child ${addType.charAt(0).toUpperCase() + addType.slice(1)}`, action: () => addNode(ctxMenu.id) },
            { label: '📋  Duplicate', action: () => duplicate(ctxMenu.id) },
            { label: '⬆️  Move Up', action: () => moveAmongSiblings(ctxMenu.id, -1) },
            { label: '⬇️  Move Down', action: () => moveAmongSiblings(ctxMenu.id, 1) },
            null,
            { label: nodes.find(n => n.id === ctxMenu.id)?.visible ? '🙈  Hide' : '👁  Show', action: () => { const n = nodes.find(n => n.id === ctxMenu.id); if (n) update(ctxMenu.id, { visible: !n.visible }); setCtxMenu(null) } },
            { label: nodes.find(n => n.id === ctxMenu.id)?.locked ? '🔓  Unlock' : '🔒  Lock', action: () => { const n = nodes.find(n => n.id === ctxMenu.id); if (n) update(ctxMenu.id, { locked: !n.locked }); setCtxMenu(null) } },
            null,
            { label: '🗑️  Delete', action: () => deleteNode(ctxMenu.id), danger: true },
          ].map((item, i) =>
            item === null ? (
              <div key={i} style={{ height: 1, background: '#252336', margin: '2px 0' }} />
            ) : (
              <button
                key={i}
                onClick={item.action}
                style={{
                  display: 'block', width: '100%', padding: '7px 14px', border: 'none',
                  background: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 11,
                  color: (item as any).danger ? '#e04040' : '#c0bfd4',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >{item.label}</button>
            )
          )}
        </div>
      )}
    </div>
  )
}
