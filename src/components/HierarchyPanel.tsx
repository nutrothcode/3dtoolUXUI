import { useState, useRef, useCallback, useEffect } from 'react'

/* ── types ── */
export type BoneNode = {
  id: string
  label: string
  parentId: string | null
  open: boolean
  visible: boolean
}

const INITIAL_BONES: BoneNode[] = [
  { id: 'character', label: 'Character', parentId: null, open: true, visible: true },
  { id: 'body', label: 'Body', parentId: 'character', open: true, visible: true },
  { id: 'root', label: 'root', parentId: 'body', open: true, visible: true },
  { id: 'pelvis', label: 'pelvis', parentId: 'root', open: true, visible: true },
  { id: 'spine_01', label: 'spine_01', parentId: 'pelvis', open: true, visible: true },
  { id: 'spine_02', label: 'spine_02', parentId: 'spine_01', open: true, visible: true },
  { id: 'spine_03', label: 'spine_03', parentId: 'spine_02', open: true, visible: true },
  { id: 'chest', label: 'chest', parentId: 'spine_03', open: true, visible: true },
  { id: 'neck', label: 'neck', parentId: 'chest', open: true, visible: true },
  { id: 'head', label: 'head', parentId: 'neck', open: true, visible: true },
  { id: 'clavicle_l', label: 'clavicle_l', parentId: 'spine_03', open: true, visible: true },
  { id: 'upperarm_l', label: 'upperarm_l', parentId: 'clavicle_l', open: true, visible: true },
  { id: 'lowerarm_l', label: 'lowerarm_l', parentId: 'upperarm_l', open: true, visible: true },
  { id: 'hand_l', label: 'hand_l', parentId: 'lowerarm_l', open: false, visible: true },
  { id: 'clavicle_r', label: 'clavicle_r', parentId: 'spine_03', open: true, visible: true },
  { id: 'upperarm_r', label: 'upperarm_r', parentId: 'clavicle_r', open: true, visible: true },
  { id: 'lowerarm_r', label: 'lowerarm_r', parentId: 'upperarm_r', open: true, visible: true },
  { id: 'hand_r', label: 'hand_r', parentId: 'lowerarm_r', open: false, visible: true },
  { id: 'thigh_l', label: 'thigh_l', parentId: 'pelvis', open: true, visible: true },
  { id: 'calf_l', label: 'calf_l', parentId: 'thigh_l', open: true, visible: true },
  { id: 'foot_l', label: 'foot_l', parentId: 'calf_l', open: false, visible: true },
  { id: 'thigh_r', label: 'thigh_r', parentId: 'pelvis', open: true, visible: true },
  { id: 'calf_r', label: 'calf_r', parentId: 'thigh_r', open: true, visible: true },
  { id: 'foot_r', label: 'foot_r', parentId: 'calf_r', open: false, visible: true },
]

type DropPos = { id: string; where: 'before' | 'after' | 'inside' } | null
type CtxMenu = { id: string; x: number; y: number } | null

/* ── build ordered display list ── */
function buildList(
  nodes: BoneNode[],
  parentId: string | null,
  depth: number,
  out: { node: BoneNode; depth: number }[],
) {
  const children = nodes.filter(n => n.parentId === parentId)
  for (const c of children) {
    out.push({ node: c, depth })
    if (c.open) buildList(nodes, c.id, depth + 1, out)
  }
}

/* ── collect all descendant ids ── */
function descendants(nodes: BoneNode[], id: string): string[] {
  const children = nodes.filter(n => n.parentId === id)
  return children.flatMap(c => [c.id, ...descendants(nodes, c.id)])
}

/* ── unique id ── */
let _uid = 0
const uid = () => `bone_${++_uid}`

export default function HierarchyPanel() {
  const [nodes, setNodes] = useState<BoneNode[]>(INITIAL_BONES)
  const [selected, setSelected] = useState<string>('head')
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameVal, setRenameVal] = useState('')
  const [dragId, setDragId] = useState<string | null>(null)
  const [dropPos, setDropPos] = useState<DropPos>(null)
  const [ctxMenu, setCtxMenu] = useState<CtxMenu>(null)
  const [search, setSearch] = useState('')
  const renameRef = useRef<HTMLInputElement>(null)

  /* close context menu on outside click */
  useEffect(() => {
    if (!ctxMenu) return
    const close = () => setCtxMenu(null)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [ctxMenu])

  /* focus rename input when it appears */
  useEffect(() => {
    if (renamingId && renameRef.current) {
      renameRef.current.focus()
      renameRef.current.select()
    }
  }, [renamingId])

  /* ── display list ── */
  const displayList: { node: BoneNode; depth: number }[] = []
  buildList(nodes, null, 0, displayList)

  const filtered = search
    ? displayList.filter(({ node }) =>
        node.label.toLowerCase().includes(search.toLowerCase()))
    : displayList

  /* ── helpers ── */
  const update = useCallback((id: string, patch: Partial<BoneNode>) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, ...patch } : n))
  }, [])

  const startRename = (id: string) => {
    const n = nodes.find(n => n.id === id)
    if (!n) return
    setRenamingId(id)
    setRenameVal(n.label)
    setCtxMenu(null)
  }

  const commitRename = () => {
    if (renamingId && renameVal.trim()) {
      update(renamingId, { label: renameVal.trim() })
    }
    setRenamingId(null)
  }

  const deleteNode = (id: string) => {
    const toRemove = new Set([id, ...descendants(nodes, id)])
    setNodes(prev => prev.filter(n => !toRemove.has(n.id)))
    if (selected && toRemove.has(selected)) setSelected('')
    setCtxMenu(null)
  }

  const addBone = (parentId: string | null = selected || null) => {
    const newNode: BoneNode = {
      id: uid(),
      label: 'new_bone',
      parentId,
      open: false,
      visible: true,
    }
    setNodes(prev => [...prev, newNode])
    setSelected(newNode.id)
    setTimeout(() => startRename(newNode.id), 30)
    setCtxMenu(null)
  }

  const duplicate = (id: string) => {
    const src = nodes.find(n => n.id === id)
    if (!src) return
    const newNode: BoneNode = { ...src, id: uid(), label: src.label + '_copy' }
    setNodes(prev => [...prev, newNode])
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
    setNodes(prev => {
      const a = prev.findIndex(n => n.id === id)
      const b = prev.findIndex(n => n.id === swapId)
      const next = [...prev]
      ;[next[a], next[b]] = [next[b], next[a]]
      return next
    })
    setCtxMenu(null)
  }

  const expandAll = () => setNodes(prev => prev.map(n => ({ ...n, open: true })))
  const collapseAll = () => setNodes(prev => prev.map(n => ({ ...n, open: false })))

  /* ── drag & drop ── */
  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!dragId || dragId === targetId) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const y = e.clientY - rect.top
    const h = rect.height
    const where: 'before' | 'after' | 'inside' =
      y < h * 0.28 ? 'before' : y > h * 0.72 ? 'after' : 'inside'
    setDropPos({ id: targetId, where })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!dragId || !dropPos) { setDragId(null); setDropPos(null); return }
    const { id: targetId, where } = dropPos
    if (targetId === dragId) { setDragId(null); setDropPos(null); return }
    if (descendants(nodes, dragId).includes(targetId)) { setDragId(null); setDropPos(null); return }

    setNodes(prev => {
      const target = prev.find(n => n.id === targetId)!
      let updated = prev.filter(n => n.id !== dragId)
      const dragNode = prev.find(n => n.id === dragId)!

      let newParent: string | null
      if (where === 'inside') {
        newParent = targetId
      } else {
        newParent = target.parentId
      }

      const patched = { ...dragNode, parentId: newParent }

      const insertIdx = updated.findIndex(n => n.id === targetId)
      if (where === 'before') {
        updated.splice(insertIdx, 0, patched)
      } else if (where === 'after') {
        updated.splice(insertIdx + 1, 0, patched)
      } else {
        updated.push(patched)
      }
      return updated
    })

    setDragId(null)
    setDropPos(null)
  }

  /* ── node type color ── */
  const nodeColor = (id: string) => {
    if (id === 'character') return '#e91e8c'
    if (id === 'body') return '#4a90d9'
    return '#27c96a'
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
            placeholder="Search hierarchy..."
            style={{ width: '100%', background: '#181626', border: '1px solid #252336', borderRadius: 5, color: '#c0bfd4', padding: '4px 8px 4px 24px', fontSize: 10.5 }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6a6888', cursor: 'pointer', fontSize: 11, padding: 0, lineHeight: 1 }}>✕</button>
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

          return (
            <div key={node.id}>
              {/* Drop indicator — BEFORE */}
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
                  paddingLeft: 8 + depth * 14,
                  paddingRight: 8, paddingTop: 3, paddingBottom: 3,
                  cursor: 'pointer',
                  opacity: isDragging ? 0.4 : 1,
                  background: isSelected
                    ? 'rgba(233,30,140,0.18)'
                    : isDropTarget && dropPos?.where === 'inside'
                      ? 'rgba(233,30,140,0.08)'
                      : 'transparent',
                  outline: isDropTarget && dropPos?.where === 'inside' ? '1px solid #e91e8c' : 'none',
                  outlineOffset: -1,
                  transition: 'background 0.08s',
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

                {/* Node type diamond */}
                <span style={{ fontSize: 9, color: nodeColor(node.id), marginRight: 5, flexShrink: 0 }}>◆</span>

                {/* Label or rename input */}
                {isRenaming ? (
                  <input
                    ref={renameRef}
                    value={renameVal}
                    onChange={e => setRenameVal(e.target.value)}
                    onBlur={commitRename}
                    onKeyDown={e => {
                      if (e.key === 'Enter') commitRename()
                      if (e.key === 'Escape') setRenamingId(null)
                      e.stopPropagation()
                    }}
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
                  }}>{node.label}</span>
                )}

                {/* Visibility eye */}
                <span
                  onClick={e => { e.stopPropagation(); update(node.id, { visible: !node.visible }) }}
                  style={{ fontSize: 10, color: node.visible ? '#3a3858' : '#6a6888', marginLeft: 4, cursor: 'pointer', flexShrink: 0, opacity: isSelected ? 1 : 0.5 }}
                  title={node.visible ? 'Hide' : 'Show'}
                >👁</span>
              </div>

              {/* Drop indicator — AFTER */}
              {isDropTarget && dropPos?.where === 'after' && (
                <div style={{ height: 2, background: '#e91e8c', margin: `0 0 0 ${8 + depth * 14}px`, borderRadius: 1 }} />
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#3e3c58', fontSize: 11, padding: '20px 0' }}>
            {search ? 'No bones match search' : 'No bones'}
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div style={{ padding: '8px 10px', borderTop: '1px solid #1e1b2c', display: 'flex', gap: 5, flexShrink: 0 }}>
        <button onClick={() => addBone(selected || null)} style={{ flex: 1, padding: '5px 4px', border: '1px solid #252336', borderRadius: 5, background: '#181626', color: '#c0bfd4', fontSize: 10, cursor: 'pointer' }}>+ Add Bone</button>
        <button onClick={() => selected && startRename(selected)} disabled={!selected} style={{ flex: 1, padding: '5px 4px', border: '1px solid #252336', borderRadius: 5, background: '#181626', color: selected ? '#c0bfd4' : '#3e3c58', fontSize: 10, cursor: selected ? 'pointer' : 'default' }}>Rename</button>
        <button onClick={() => selected && deleteNode(selected)} disabled={!selected} style={{ padding: '5px 8px', border: '1px solid rgba(224,64,64,0.35)', borderRadius: 5, background: 'rgba(224,64,64,0.08)', color: selected ? '#e04040' : '#3e3c58', fontSize: 10, cursor: selected ? 'pointer' : 'default' }}>Delete</button>
      </div>

      {/* Context menu */}
      {ctxMenu && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'fixed', left: ctxMenu.x, top: ctxMenu.y, zIndex: 9999,
            background: '#18162a', border: '1px solid #2e2c48', borderRadius: 7,
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)', minWidth: 160, overflow: 'hidden',
          }}
        >
          {[
            { label: '✏️  Rename', action: () => startRename(ctxMenu.id) },
            { label: '➕  Add Child Bone', action: () => addBone(ctxMenu.id) },
            { label: '📋  Duplicate', action: () => duplicate(ctxMenu.id) },
            { label: '⬆️  Move Up', action: () => moveAmongSiblings(ctxMenu.id, -1) },
            { label: '⬇️  Move Down', action: () => moveAmongSiblings(ctxMenu.id, 1) },
            null,
            { label: nodes.find(n => n.id === ctxMenu.id)?.visible ? '🙈  Hide' : '👁  Show', action: () => { const n = nodes.find(n => n.id === ctxMenu.id); if (n) update(ctxMenu.id, { visible: !n.visible }); setCtxMenu(null) } },
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
