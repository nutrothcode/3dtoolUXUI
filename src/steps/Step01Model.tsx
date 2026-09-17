import { useState } from 'react'
import HierarchyPanel from '../components/HierarchyPanel'
import {
  MODEL_TYPES, ASSETS_BY_TYPE, getModelType,
  type ModelTypeId, type ModelAsset,
} from '../modelTypes'
import { useSceneStore } from '../core/SceneStore'
import { useProjectStore } from '../core/ProjectStore'
import { useSelection } from '../core/SelectionStore'
import { getTemplate } from '../templates/index'

/* ── small helpers ── */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', fontSize: 10.5, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <span style={{ color: '#6a6888' }}>{label}</span>
      <span style={{ color: '#c0bfd4', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

function SectionHeader({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
  return (
    <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', cursor: 'pointer', background: '#141220', borderBottom: '1px solid #1e1b2c', userSelect: 'none' }}>
      <span style={{ fontSize: 8, color: '#6a6888' }}>{open ? '▼' : '▶'}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#c0bfd4' }}>{label}</span>
    </div>
  )
}

function ActionBtn({ children, pink, danger, small }: { children: React.ReactNode; pink?: boolean; danger?: boolean; small?: boolean }) {
  return (
    <button style={{
      padding: small ? '4px 10px' : '5px 12px',
      border: danger ? '1px solid rgba(224,64,64,0.4)' : pink ? 'none' : '1px solid #252336',
      borderRadius: 6,
      background: pink ? '#e91e8c' : danger ? 'rgba(224,64,64,0.1)' : '#181626',
      color: pink ? '#fff' : danger ? '#e04040' : '#a0a0c0',
      fontSize: 10.5, fontWeight: pink ? 700 : 500, cursor: 'pointer',
    }}>{children}</button>
  )
}

function ModelThumb({ asset, selected, onClick }: { asset: ModelAsset; selected: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{
      borderRadius: 8, border: `2px solid ${selected ? '#e91e8c' : '#1e1b2c'}`,
      background: selected ? 'rgba(233,30,140,0.08)' : '#141220',
      cursor: 'pointer', overflow: 'hidden', transition: 'border-color 0.1s',
    }}>
      <div style={{
        height: 72, background: `radial-gradient(ellipse at 40% 35%, ${asset.g1}, ${asset.g2} 55%, #070810)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
      }}>{asset.emoji}</div>
      <div style={{ padding: '3px 6px 5px', fontSize: 9.5, color: selected ? '#e91e8c' : '#8a8aaa', textAlign: 'center', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{asset.label}</div>
    </div>
  )
}

/* ── MY ASSETS tab ── */
const MY_ASSETS: (ModelAsset & { uploadedAt: string; usedIn: string })[] = [
  { id: 'my_01', name: 'Custom_Head_v3', label: 'Custom_Head_v3', category: 'head', emoji: '🗣', g1: '#d0a08070', g2: '#804838a0', triangles: '44,800', vertices: '44,800', format: 'FBX', hasRig: true, hasSkin: false, unit: 'Meter (1.0)', path: '/MyAssets/Custom_Head_v3.fbx', materials: 3, textures: 3, fileSize: '9.6 MB', uploadedAt: '2024-11-12', usedIn: 'MyCharacter' },
  { id: 'my_02', name: 'HiPoly_Hand_R', label: 'HiPoly_Hand_R', category: 'hand', emoji: '✋', g1: '#c89070a0', g2: '#704030a0', triangles: '28,400', vertices: '14,200', format: 'OBJ', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/MyAssets/HiPoly_Hand_R.obj', materials: 1, textures: 2, fileSize: '6.2 MB', uploadedAt: '2024-11-14', usedIn: 'None' },
  { id: 'my_03', name: 'Bespoke_Jacket', label: 'Bespoke_Jacket', category: 'clothing', emoji: '🧥', g1: '#2a3860a0', g2: '#121830a0', triangles: '22,000', vertices: '11,000', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/MyAssets/Bespoke_Jacket.fbx', materials: 2, textures: 2, fileSize: '5.8 MB', uploadedAt: '2024-11-15', usedIn: 'MyCharacter' },
  { id: 'my_04', name: 'Stylized_Eye_Set', label: 'Stylized_Eye_Set', category: 'eye', emoji: '👁', g1: '#9030c080', g2: '#601890a0', triangles: '6,400', vertices: '3,200', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/MyAssets/Stylized_Eye_Set.fbx', materials: 2, textures: 2, fileSize: '1.8 MB', uploadedAt: '2024-11-16', usedIn: 'MyCharacter' },
  { id: 'my_05', name: 'ScanBody_Base', label: 'ScanBody_Base', category: 'body', emoji: '🧍', g1: '#c8a06060', g2: '#603830a0', triangles: '120,000', vertices: '60,000', format: 'OBJ', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/MyAssets/ScanBody_Base.obj', materials: 1, textures: 4, fileSize: '28.4 MB', uploadedAt: '2024-11-10', usedIn: 'None' },
]

function MyAssetsTab({ modelTypeId, onSelect, selected }: { modelTypeId: ModelTypeId; onSelect: (id: string) => void; selected: string }) {
  const [mySearch, setMySearch] = useState('')
  const [mySelected, setMySelected] = useState(selected)
  const [showUpload, setShowUpload] = useState(false)

  const filtered = MY_ASSETS.filter(a =>
    !mySearch || a.name.toLowerCase().includes(mySearch.toLowerCase())
  )
  const sel = MY_ASSETS.find(a => a.id === mySelected) ?? MY_ASSETS[0]

  const pick = (id: string) => { setMySelected(id); onSelect(id) }

  return (
    <>
      {/* Search + Upload */}
      <div style={{ padding: '8px 10px 6px', flexShrink: 0, display: 'flex', gap: 6 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: '#3e3c58', pointerEvents: 'none' }}>🔍</span>
          <input value={mySearch} onChange={e => setMySearch(e.target.value)} placeholder="Search my assets..."
            style={{ width: '100%', background: '#181626', border: '1px solid #252336', borderRadius: 6, color: '#c0bfd4', padding: '5px 8px 5px 26px', fontSize: 10.5 }} />
        </div>
        <button onClick={() => setShowUpload(o => !o)} style={{ padding: '5px 10px', border: 'none', borderRadius: 6, background: '#e91e8c', color: '#fff', fontSize: 10.5, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>+ Upload</button>
      </div>

      {/* Upload drop zone (toggleable) */}
      {showUpload && (
        <div style={{ margin: '0 10px 6px', border: '2px dashed #e91e8c', borderRadius: 8, padding: '14px 10px', textAlign: 'center', background: 'rgba(233,30,140,0.05)', flexShrink: 0 }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>📁</div>
          <div style={{ fontSize: 10.5, color: '#c0bfd4', marginBottom: 2 }}>Drop FBX / OBJ / GLB / USD</div>
          <div style={{ fontSize: 9.5, color: '#6a6888' }}>or click to browse files</div>
          <button style={{ marginTop: 8, padding: '4px 14px', border: 'none', borderRadius: 6, background: '#e91e8c', color: '#fff', fontSize: 10, cursor: 'pointer' }}>Browse Files</button>
        </div>
      )}

      {/* Asset list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 10px' }}>
        {filtered.map(a => (
          <div key={a.id} onClick={() => pick(a.id)} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', marginBottom: 3,
            borderRadius: 7, border: `1.5px solid ${mySelected === a.id ? '#e91e8c' : '#1e1b2c'}`,
            background: mySelected === a.id ? 'rgba(233,30,140,0.07)' : '#141220',
            cursor: 'pointer', transition: 'border-color 0.1s',
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 6, background: `radial-gradient(ellipse at 40% 35%, ${a.g1}, ${a.g2} 55%, #070810)`, border: '1px solid #252336', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{a.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: mySelected === a.id ? '#e91e8c' : '#c0bfd4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
              <div style={{ fontSize: 9, color: '#4a4868', marginTop: 1 }}>{a.format} · {a.fileSize} · {a.uploadedAt}</div>
            </div>
            <div style={{ fontSize: 9, color: a.usedIn !== 'None' ? '#27c96a' : '#3e3c58', whiteSpace: 'nowrap' }}>
              {a.usedIn !== 'None' ? '● ' + a.usedIn : '○ Unused'}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#3e3c58', fontSize: 11, padding: '24px 0' }}>No assets found</div>
        )}
      </div>

      {/* Selected asset details */}
      {sel && (
        <div style={{ borderTop: '1px solid #1e1b2c', flexShrink: 0 }}>
          <div style={{ padding: '6px 12px 4px', fontSize: 12, fontWeight: 700, color: '#c0bfd4' }}>My Asset Details</div>
          <div style={{ padding: '0 12px 6px', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <InfoRow label="Name" value={sel.name} />
            <InfoRow label="Format" value={sel.format} />
            <InfoRow label="Triangles" value={sel.triangles} />
            <InfoRow label="Uploaded" value={sel.uploadedAt} />
            <InfoRow label="Used In" value={sel.usedIn} />
          </div>
          <div style={{ display: 'flex', gap: 6, padding: '0 10px 10px' }}>
            <ActionBtn pink>Use in Scene</ActionBtn>
            <ActionBtn>Duplicate</ActionBtn>
            <ActionBtn danger>Delete</ActionBtn>
          </div>
        </div>
      )}
    </>
  )
}

/* ── PROJECT tab — reads from SceneStore + ProjectStore ── */
function ProjectTab() {
  const { nodes, dispatch: sceneDispatch } = useSceneStore()
  const { project, dispatch: projDispatch } = useProjectStore()
  const { primaryId, dispatch: selDispatch } = useSelection()
  const template = getTemplate(project.modelTypeId)

  const [projSearch, setProjSearch] = useState('')
  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal] = useState(project.name)

  // Top-level scene nodes as "assembled parts"
  const topLevel = nodes.filter(n => n.parentId === null)
  const filtered = topLevel.filter(n =>
    !projSearch || n.label.toLowerCase().includes(projSearch.toLowerCase())
  )
  const selId = primaryId ?? ''

  return (
    <>
      {/* Project header */}
      <div style={{ padding: '8px 10px 6px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: '#141220', borderRadius: 8, border: '1px solid #1e1b2c', marginBottom: 6 }}>
          <span style={{ fontSize: 20 }}>{template.icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            {editingName ? (
              <input
                value={nameVal}
                onChange={e => setNameVal(e.target.value)}
                onBlur={() => { projDispatch({ type: 'SET_NAME', name: nameVal }); setEditingName(false) }}
                onKeyDown={e => { if (e.key === 'Enter') { projDispatch({ type: 'SET_NAME', name: nameVal }); setEditingName(false) } }}
                autoFocus
                style={{ width: '100%', background: '#252336', border: '1px solid #e91e8c', borderRadius: 4, color: '#e0dff0', padding: '2px 6px', fontSize: 11, fontWeight: 700 }}
              />
            ) : (
              <div onDoubleClick={() => setEditingName(true)} style={{ fontSize: 11, fontWeight: 700, color: '#e0dff0', cursor: 'text' }} title="Double-click to rename">{project.name}</div>
            )}
            <div style={{ fontSize: 9.5, color: '#6a6888' }}>{template.name} · {nodes.length} scene nodes · Modified {project.modified}</div>
          </div>
          <button style={{ padding: '3px 8px', border: '1px solid #252336', borderRadius: 5, background: '#181626', color: '#c0bfd4', fontSize: 9.5, cursor: 'pointer' }}>Settings</button>
        </div>

        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: '#3e3c58', pointerEvents: 'none' }}>🔍</span>
          <input value={projSearch} onChange={e => setProjSearch(e.target.value)} placeholder="Filter scene nodes..."
            style={{ width: '100%', background: '#181626', border: '1px solid #252336', borderRadius: 6, color: '#c0bfd4', padding: '5px 8px 5px 26px', fontSize: 10.5 }} />
        </div>
      </div>

      {/* Project stats */}
      <div style={{ display: 'flex', gap: 4, padding: '0 10px 6px', flexShrink: 0 }}>
        {[
          { label: 'Nodes', value: String(nodes.length) },
          { label: 'Meshes', value: String(nodes.filter(n => n.type === 'mesh').length) },
          { label: 'Bones', value: String(nodes.filter(n => n.type === 'bone').length) },
          { label: 'Hidden', value: String(nodes.filter(n => !n.visible).length) },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: '#141220', borderRadius: 5, border: '1px solid #1e1b2c', padding: '4px 6px', textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#c0bfd4' }}>{s.value}</div>
            <div style={{ fontSize: 8.5, color: '#4a4868' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Scene node list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 10px' }}>
        <div style={{ fontSize: 9.5, color: '#6a6888', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Scene Root Nodes ({filtered.length})</div>
        {filtered.map(n => (
          <div key={n.id} onClick={() => selDispatch({ type: 'SELECT', id: n.id })} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', marginBottom: 3,
            borderRadius: 7, border: `1.5px solid ${selId === n.id ? '#e91e8c' : '#1e1b2c'}`,
            background: selId === n.id ? 'rgba(233,30,140,0.07)' : '#141220',
            cursor: 'pointer', opacity: n.visible ? 1 : 0.45,
          }}>
            <div style={{ width: 28, height: 28, borderRadius: 5, background: 'rgba(60,50,100,0.6)', border: '1px solid #252336', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>
              {n.type === 'mesh' ? '⬡' : n.type === 'group' ? '▣' : n.type === 'bone' ? '◆' : n.type === 'light' ? '☀' : n.type === 'camera' ? '◎' : '◈'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: selId === n.id ? '#e91e8c' : '#c0bfd4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.label}</div>
              <div style={{ fontSize: 9, color: '#4a4868' }}>{n.type} · {nodes.filter(c => c.parentId === n.id).length} children</div>
            </div>
            <button onClick={ev => { ev.stopPropagation(); sceneDispatch({ type: 'UPDATE_NODE', id: n.id, patch: { visible: !n.visible } }) }} style={{ width: 20, height: 20, border: 'none', background: 'transparent', color: n.visible ? '#8a8aaa' : '#3e3c58', cursor: 'pointer', fontSize: 11 }}>
              {n.visible ? '👁' : '🚫'}
            </button>
            <button onClick={ev => { ev.stopPropagation(); sceneDispatch({ type: 'DELETE_NODE', id: n.id, andDescendants: true }) }} style={{ width: 20, height: 20, border: 'none', background: 'transparent', color: '#3e3c58', cursor: 'pointer', fontSize: 10 }}>✕</button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#3e3c58', fontSize: 11, padding: '24px 0' }}>
            {nodes.length === 0 ? 'No scene nodes yet' : 'No nodes match filter'}
          </div>
        )}
      </div>

      {/* Assembly slots from template */}
      <div style={{ borderTop: '1px solid #1e1b2c', flexShrink: 0 }}>
        <div style={{ padding: '6px 12px 4px', fontSize: 11, fontWeight: 700, color: '#c0bfd4' }}>Assembly Slots</div>
        <div style={{ padding: '0 10px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {template.assemblySlots.map(slot => (
            <div key={slot.id} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', background: '#141220', borderRadius: 5, border: '1px solid #1e1b2c' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: slot.required ? '#e91e8c' : '#3a3858', flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: '#8a8aaa', flex: 1 }}>{slot.label}</span>
              <span style={{ fontSize: 9, color: '#3e3c58' }}>{slot.required ? 'Required' : 'Optional'}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function RightProjectManager({ modelTypeId, isCharacter, openSections, toggleSection }: {
  modelTypeId: ModelTypeId; isCharacter: boolean;
  openSections: Set<string>; toggleSection: (s: string) => void
}) {
  const { project, dispatch: projDispatch } = useProjectStore()
  const { nodes } = useSceneStore()
  const assets = ASSETS_BY_TYPE[modelTypeId] ?? []
  const modelType = getModelType(modelTypeId)
  const template = getTemplate(modelTypeId)

  const [editingName, setEditingName] = useState(false)
  const [draftName, setDraftName] = useState(project.name)

  const meshCount = nodes.filter(n => n.type === 'mesh').length
  const hiddenCount = nodes.filter(n => !n.visible).length

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '10px 12px', borderBottom: '1px solid #1e1b2c' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          {editingName ? (
            <input
              autoFocus value={draftName}
              onChange={e => setDraftName(e.target.value)}
              onBlur={() => { projDispatch({ type: 'SET_NAME', name: draftName }); setEditingName(false) }}
              onKeyDown={e => { if (e.key === 'Enter') { projDispatch({ type: 'SET_NAME', name: draftName }); setEditingName(false) } if (e.key === 'Escape') setEditingName(false) }}
              style={{ background: '#0e0c1a', border: '1px solid #e91e8c', borderRadius: 4, color: '#fff', fontSize: 11, fontWeight: 700, padding: '1px 6px', flex: 1, marginRight: 6 }}
            />
          ) : (
            <span onDoubleClick={() => { setDraftName(project.name); setEditingName(true) }} title="Double-click to rename" style={{ fontSize: 11, fontWeight: 700, color: '#c0bfd4', cursor: 'text' }}>{project.name}</span>
          )}
          <button style={{ padding: '3px 8px', border: '1px solid #252336', borderRadius: 5, background: '#181626', color: '#c0bfd4', fontSize: 9.5, cursor: 'pointer' }}>+ New</button>
        </div>
        <InfoRow label="Model Type" value={modelType.name} />
        {modelTypeId === 'custom' && project.customTypeName && <InfoRow label="Custom Type" value={project.customTypeName} />}
        <InfoRow label="Created" value={project.created} />
        <InfoRow label="Modified" value={project.modified} />
        <InfoRow label="Total Nodes" value={String(nodes.length)} />
        <InfoRow label="Meshes" value={String(meshCount)} />
        {hiddenCount > 0 && <InfoRow label="Hidden" value={String(hiddenCount)} />}
      </div>

      <SectionHeader label="Assembly Slots" open={openSections.has('Assembly Slots')} onToggle={() => toggleSection('Assembly Slots')} />
      {openSections.has('Assembly Slots') && (
        <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1b2c' }}>
          {template.assemblySlots.map(slot => (
            <div key={slot.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: slot.required ? '#e91e8c' : '#4a4868', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10.5, color: '#c0bfd4' }}>{slot.label}</div>
                <div style={{ fontSize: 9, color: '#4a4868' }}>{slot.required ? 'Required' : 'Optional'} · {slot.accepts.join(', ')}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <SectionHeader label="Project Assets" open={openSections.has('Project Assets')} onToggle={() => toggleSection('Project Assets')} />
      {openSections.has('Project Assets') && (
        <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1b2c' }}>
          {assets.slice(0, 5).map(a => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}>
              <div style={{ width: 24, height: 24, borderRadius: 4, background: `radial-gradient(circle at 40% 35%, ${a.g1}, #07081060)`, border: '1px solid #252336', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{a.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10.5, color: '#c0bfd4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
                <div style={{ fontSize: 9.5, color: '#4a4868' }}>{a.category} · {a.fileSize}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <SectionHeader label="Export Settings" open={openSections.has('Export Settings')} onToggle={() => toggleSection('Export Settings')} />
      {openSections.has('Export Settings') && (
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #1e1b2c' }}>
          <div style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 10, color: '#6a6888', marginBottom: 3 }}>Format</div>
            <select style={{ width: '100%', background: '#181626', border: '1px solid #252336', borderRadius: 5, color: '#c0bfd4', padding: '4px 8px', fontSize: 10.5, cursor: 'pointer' }}>
              <option>FBX (Unity)</option><option>FBX (Unreal)</option><option>GLB / glTF</option><option>OBJ</option><option>USD</option>
            </select>
          </div>
          {([['Include Textures', true], ['Embed Materials', false], ...(isCharacter ? [['Export Rig', true], ['Bake Animations', false]] as [string, boolean][] : [])] as [string, boolean][]).map(([label, checked]) => (
            <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, cursor: 'pointer', fontSize: 10.5, color: '#c0bfd4' }}>
              <input type="checkbox" defaultChecked={checked} style={{ accentColor: '#e91e8c', width: 12, height: 12 }} />
              {label}
            </label>
          ))}
          <button style={{ width: '100%', padding: '6px', marginTop: 6, border: 'none', borderRadius: 6, background: '#e91e8c', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Export Project</button>
        </div>
      )}
    </div>
  )
}

interface Props {
  modelTypeId: ModelTypeId
  onModelTypeChange: (id: ModelTypeId) => void
}

export default function Step01Model({ modelTypeId, onModelTypeChange }: Props) {
  const modelType = getModelType(modelTypeId)
  const assets = ASSETS_BY_TYPE[modelTypeId] ?? []

  const [libTab, setLibTab] = useState('Model Library')
  const [catTab, setCatTab] = useState('All')
  const [selected, setSelected] = useState(assets[0]?.id ?? '')
  const [viewTab, setViewTab] = useState('Viewport')
  const [inspTab, setInspTab] = useState('Model')
  const [search, setSearch] = useState('')
  const [overlays, setOverlays] = useState({ skeleton: true, joints: true, mesh: true, wireframe: false, xray: false })
  const [openSections, setOpenSections] = useState(new Set(['Transform', 'Model Info', '3D Merge', 'Retopology', 'UV', 'Scene Files', 'Project Assets', 'Export Settings']))
  const [customTypeName, setCustomTypeName] = useState('')
  const [customCategories, setCustomCategories] = useState<string[]>([])
  const [newCatInput, setNewCatInput] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleSection = (s: string) => setOpenSections(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n })

  // When model type changes, reset category and selection
  const handleModelTypeChange = (id: ModelTypeId) => {
    onModelTypeChange(id)
    setCatTab('All')
    const newAssets = ASSETS_BY_TYPE[id] ?? []
    setSelected(newAssets[0]?.id ?? '')
    setDropdownOpen(false)
  }

  const effectiveCategories = modelTypeId === 'custom'
    ? ['All', ...customCategories]
    : modelType.categories

  const filtered = assets.filter(p => {
    if (catTab !== 'All' && p.category !== catTab.toLowerCase()) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const selAsset: ModelAsset = assets.find(p => p.id === selected) ?? assets[0] ?? {
    id: '', name: '—', label: '—', category: '', emoji: '📦',
    g1: '#30304060', g2: '#1c1c2060', triangles: '0', vertices: '0',
    format: '—', hasRig: false, hasSkin: false, unit: '—', path: '—',
    materials: 0, textures: 0, fileSize: '—',
  }

  const isCharacter = modelTypeId === 'character'

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: '#0b0912', fontSize: 11 }}>

      {/* ── LEFT: Asset Library ── */}
      <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#0f0d18', borderRight: '1px solid #1e1b2c', overflow: 'hidden' }}>

        {/* Panel title + Model Type selector */}
        <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid #1e1b2c', flexShrink: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#e0dff0', marginBottom: 8 }}>Asset Library</div>

          {/* Model Type dropdown */}
          <div style={{ marginBottom: 8, position: 'relative' }}>
            <div style={{ fontSize: 9.5, color: '#6a6888', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Model Type</div>
            <button
              onClick={() => setDropdownOpen(o => !o)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 10px', background: '#181626', border: '1px solid #2e2a42',
                borderRadius: 7, cursor: 'pointer', color: '#e0dff0',
              }}
            >
              <span style={{ fontSize: 14 }}>{modelType.icon}</span>
              <span style={{ flex: 1, textAlign: 'left', fontSize: 11.5, fontWeight: 600 }}>{modelType.name}</span>
              <span style={{ fontSize: 9, color: '#6a6888' }}>▼</span>
            </button>

            {dropdownOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
                background: '#181626', border: '1px solid #2e2a42', borderRadius: 8,
                marginTop: 3, overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              }}>
                {MODEL_TYPES.map(mt => (
                  <button
                    key={mt.id}
                    onClick={() => handleModelTypeChange(mt.id as ModelTypeId)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                      padding: '7px 12px', border: 'none', cursor: 'pointer',
                      background: mt.id === modelTypeId ? 'rgba(233,30,140,0.12)' : 'transparent',
                      color: mt.id === modelTypeId ? '#e91e8c' : '#c0bfd4',
                      fontSize: 11,
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{mt.icon}</span>
                    <span>{mt.name}</span>
                    {mt.id === modelTypeId && <span style={{ marginLeft: 'auto', fontSize: 9 }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Custom type name input */}
          {modelTypeId === 'custom' && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9.5, color: '#6a6888', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Custom Model Type</div>
              <input
                value={customTypeName}
                onChange={e => setCustomTypeName(e.target.value)}
                placeholder="e.g. Robot, Boat, Machine..."
                style={{ width: '100%', background: '#181626', border: '1px solid #252336', borderRadius: 6, color: '#c0bfd4', padding: '5px 8px', fontSize: 10.5 }}
              />
            </div>
          )}

          {/* Library tabs */}
          <div style={{ display: 'flex', gap: 0 }}>
            {['Model Library', 'My Assets', 'Project'].map(t => (
              <button key={t} onClick={() => setLibTab(t)} style={{
                flex: 1, padding: '5px 4px', border: 'none', background: 'none', cursor: 'pointer',
                fontSize: 10.5, fontWeight: 500,
                color: libTab === t ? '#e91e8c' : '#6a6888',
                borderBottom: `2px solid ${libTab === t ? '#e91e8c' : 'transparent'}`,
                marginBottom: -1,
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* ── MODEL LIBRARY TAB ── */}
        {libTab === 'Model Library' && <>
          {/* Search */}
          <div style={{ padding: '8px 10px 4px', flexShrink: 0 }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: '#3e3c58', pointerEvents: 'none' }}>🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder={`Search ${modelType.name.toLowerCase()} models...`}
                style={{ width: '100%', background: '#181626', border: '1px solid #252336', borderRadius: 6, color: '#c0bfd4', padding: '5px 8px 5px 26px', fontSize: 10.5 }}
              />
            </div>
          </div>

          {/* Category chips */}
          <div style={{ display: 'flex', gap: 4, padding: '4px 10px 6px', flexShrink: 0, flexWrap: 'wrap' }}>
            {effectiveCategories.map(t => (
              <button key={t} onClick={() => setCatTab(t)} style={{
                padding: '3px 10px', border: `1px solid ${catTab === t ? '#e91e8c' : '#252336'}`,
                borderRadius: 20, background: catTab === t ? '#e91e8c' : '#181626',
                color: catTab === t ? '#fff' : '#8a8aaa', fontSize: 10, fontWeight: catTab === t ? 700 : 400, cursor: 'pointer',
              }}>{t}</button>
            ))}
            {modelTypeId === 'custom' && (
              <div style={{ display: 'flex', gap: 4, width: '100%', marginTop: 4 }}>
                <input
                  value={newCatInput}
                  onChange={e => setNewCatInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newCatInput.trim()) {
                      setCustomCategories(prev => [...prev, newCatInput.trim()])
                      setNewCatInput('')
                    }
                  }}
                  placeholder="+ Add category..."
                  style={{ flex: 1, background: '#181626', border: '1px solid #252336', borderRadius: 6, color: '#c0bfd4', padding: '4px 8px', fontSize: 10 }}
                />
                <button
                  onClick={() => { if (newCatInput.trim()) { setCustomCategories(prev => [...prev, newCatInput.trim()]); setNewCatInput('') } }}
                  style={{ padding: '4px 8px', border: 'none', borderRadius: 6, background: '#e91e8c', color: '#fff', fontSize: 10, cursor: 'pointer' }}
                >+</button>
              </div>
            )}
          </div>

          {/* Model grid */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '4px 10px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, alignContent: 'start' }}>
            {filtered.map(asset => (
              <ModelThumb key={asset.id} asset={asset} selected={selected === asset.id} onClick={() => setSelected(asset.id)} />
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#3e3c58', fontSize: 11, padding: '24px 0' }}>
                {assets.length === 0 ? 'No models yet — import one to get started' : 'No models found'}
              </div>
            )}
          </div>

          {/* Asset Details */}
          {assets.length > 0 && (
            <div style={{ borderTop: '1px solid #1e1b2c', flexShrink: 0 }}>
              <div style={{ padding: '6px 12px 4px', fontSize: 12, fontWeight: 700, color: '#c0bfd4' }}>Asset Details</div>
              <div style={{ display: 'flex', gap: 10, padding: '0 10px 8px' }}>
                <div style={{ width: 72, height: 72, flexShrink: 0, borderRadius: 8, background: `radial-gradient(ellipse at 40% 35%, ${selAsset.g1}, ${selAsset.g2} 55%, #070810)`, border: '1px solid #252336', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{selAsset.emoji}</div>
                <div style={{ flex: 1 }}>
                  <InfoRow label="Name" value={selAsset.name} />
                  <InfoRow label="Category" value={selAsset.category.charAt(0).toUpperCase() + selAsset.category.slice(1)} />
                  <InfoRow label="Format" value={selAsset.format} />
                  <InfoRow label="Triangles" value={selAsset.triangles} />
                  <InfoRow label="Has Rig" value={selAsset.hasRig ? 'Yes' : 'No'} />
                  <InfoRow label="File Size" value={selAsset.fileSize} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, padding: '0 10px 10px' }}>
                <ActionBtn pink>Import</ActionBtn>
                <ActionBtn>Replace</ActionBtn>
                <ActionBtn danger>Remove</ActionBtn>
              </div>
            </div>
          )}
        </>}

        {/* ── MY ASSETS TAB ── */}
        {libTab === 'My Assets' && <MyAssetsTab modelTypeId={modelTypeId} onSelect={setSelected} selected={selected} />}

        {/* ── PROJECT TAB ── */}
        {libTab === 'Project' && <ProjectTab />}
      </div>

      {/* ── CENTER: Viewport ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Viewport tabs + toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', background: '#0f0d18', borderBottom: '1px solid #1e1b2c', flexShrink: 0, height: 36, paddingLeft: 8 }}>
          {['Viewport', '2D Preview', 'Render Preview'].map(t => (
            <button key={t} onClick={() => setViewTab(t)} style={{
              padding: '0 14px', height: '100%', border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 500,
              color: viewTab === t ? '#e0dff0' : '#6a6888',
              borderBottom: `2px solid ${viewTab === t ? '#e91e8c' : 'transparent'}`,
            }}>{t}</button>
          ))}
          <div style={{ flex: 1 }} />
          {['↖', '✛', '↺', '⊠', '⊙', '⊞', '⊟'].map((ic, i) => (
            <button key={i} style={{ width: 26, height: 26, border: '1px solid #1e1b2c', borderRadius: 4, background: '#181626', color: '#6a6888', fontSize: 11, cursor: 'pointer', margin: '0 1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ic}</button>
          ))}
          <select style={{ margin: '0 8px', background: '#181626', border: '1px solid #252336', color: '#c0bfd4', borderRadius: 5, padding: '2px 8px', fontSize: 10.5, cursor: 'pointer' }}>
            <option>Perspective</option><option>Top</option><option>Front</option><option>Side</option>
          </select>
          {['⬡', '☉', '⊡'].map((ic, i) => (
            <button key={i} style={{ width: 26, height: 26, border: '1px solid #1e1b2c', borderRadius: 4, background: '#181626', color: '#6a6888', fontSize: 11, cursor: 'pointer', margin: '0 1px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ic}</button>
          ))}
          <button style={{ width: 26, height: 26, border: '1px solid #1e1b2c', borderRadius: 4, background: '#181626', color: '#6a6888', fontSize: 11, cursor: 'pointer', margin: '0 8px 0 1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⛶</button>
        </div>

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left tool strip */}
          <div style={{ width: 36, flexShrink: 0, background: '#0f0d18', borderRight: '1px solid #1e1b2c', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0', gap: 3 }}>
            {[
              { ic: '↖', active: true }, { ic: '✛', active: false }, { ic: '↺', active: false },
              { ic: '⊠', active: false }, { ic: '⊙', active: false }, { ic: '○', active: false },
              { ic: '◎', active: false }, { ic: '⌕', active: false }, { ic: '⊟', active: false }, { ic: '⊞', active: false },
            ].map((t, i) => (
              <button key={i} style={{ width: 28, height: 28, border: `1px solid ${t.active ? '#e91e8c' : 'transparent'}`, borderRadius: 5, background: t.active ? 'rgba(233,30,140,0.12)' : 'none', color: t.active ? '#e91e8c' : '#6a6888', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.ic}</button>
            ))}
          </div>

          {/* 3D Viewport */}
          <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(170deg, #0e1220 0%, #090b12 55%, #0c0f1a 100%)', overflow: 'hidden' }}>
            {/* Grid floor */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '42%', backgroundImage: 'linear-gradient(rgba(40,42,65,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(40,42,65,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(58deg)', transformOrigin: 'bottom center', opacity: 0.7 }} />

            {/* Model preview — character gets the SVG figure, others get a large emoji */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              {isCharacter ? (
                <svg width="200" height="480" viewBox="0 0 200 480" style={{ filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.8))', marginTop: -100 }}>
                  <ellipse cx="100" cy="28" rx="28" ry="32" fill="#1c1008" />
                  <ellipse cx="100" cy="38" rx="26" ry="30" fill="#c8a07a" />
                  <ellipse cx="90" cy="36" rx="5" ry="3.5" fill="#0a0608" opacity="0.75" />
                  <ellipse cx="110" cy="36" rx="5" ry="3.5" fill="#0a0608" opacity="0.75" />
                  <circle cx="90" cy="36" r="3" fill="#2a1810" />
                  <circle cx="110" cy="36" r="3" fill="#2a1810" />
                  <circle cx="91.5" cy="35" r="1.2" fill="#fff" opacity="0.9" />
                  <circle cx="111.5" cy="35" r="1.2" fill="#fff" opacity="0.9" />
                  <path d="M 93 52 Q 100 57 107 52" fill="none" stroke="#a07060" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="92" y="65" width="16" height="20" rx="6" fill="#c0987060" />
                  <path d="M 68 85 Q 100 75 132 85 L 138 190 Q 120 200 100 202 Q 80 200 62 190 Z" fill="#c8a07a" />
                  <path d="M 78 100 Q 96 108 100 120 Q 104 108 122 100" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="2" />
                  <rect x="93" y="130" width="14" height="10" rx="3" fill="rgba(0,0,0,0.06)" />
                  <rect x="93" y="145" width="14" height="10" rx="3" fill="rgba(0,0,0,0.06)" />
                  <rect x="93" y="160" width="14" height="10" rx="3" fill="rgba(0,0,0,0.06)" />
                  <path d="M 68 88 Q 48 110 36 155 Q 32 175 32 200" fill="none" stroke="#c8a07a" strokeWidth="18" strokeLinecap="round" />
                  <path d="M 132 88 Q 152 110 164 155 Q 168 175 168 200" fill="none" stroke="#c8a07a" strokeWidth="18" strokeLinecap="round" />
                  <ellipse cx="32" cy="212" rx="9" ry="12" fill="#c8a07a" />
                  <ellipse cx="168" cy="212" rx="9" ry="12" fill="#c8a07a" />
                  <path d="M 62 190 Q 58 235 55 290 L 55 340 Q 62 345 72 340 L 75 290 L 100 260 L 125 290 L 128 340 Q 138 345 145 340 L 145 290 Q 142 235 138 190 Z" fill="#4a5570" />
                  <path d="M 55 340 Q 53 380 52 420 L 56 450" fill="none" stroke="#c8a07a" strokeWidth="22" strokeLinecap="round" />
                  <path d="M 145 340 Q 147 380 148 420 L 144 450" fill="none" stroke="#c8a07a" strokeWidth="22" strokeLinecap="round" />
                  <ellipse cx="55" cy="458" rx="16" ry="9" fill="#c8a07a" />
                  <ellipse cx="144" cy="458" rx="16" ry="9" fill="#c8a07a" />
                  <rect x="62" y="186" width="76" height="10" rx="4" fill="#384060" />
                  <g opacity="0.75">
                    <line x1="100" y1="38" x2="100" y2="185" stroke="#27c96a" strokeWidth="1.5" />
                    <line x1="100" y1="95" x2="36" y2="200" stroke="#27c96a" strokeWidth="1.5" />
                    <line x1="100" y1="95" x2="164" y2="200" stroke="#27c96a" strokeWidth="1.5" />
                    <line x1="100" y1="185" x2="60" y2="340" stroke="#27c96a" strokeWidth="1.5" />
                    <line x1="100" y1="185" x2="140" y2="340" stroke="#27c96a" strokeWidth="1.5" />
                    <line x1="60" y1="340" x2="55" y2="455" stroke="#27c96a" strokeWidth="1.5" />
                    <line x1="140" y1="340" x2="145" y2="455" stroke="#27c96a" strokeWidth="1.5" />
                    {[[100,38],[100,68],[100,95],[100,140],[100,185],[36,200],[164,200],[60,340],[140,340],[55,455],[145,455]].map(([x,y],i) => (
                      <circle key={i} cx={x} cy={y} r="4" fill="none" stroke="#27c96a" strokeWidth="1.5" />
                    ))}
                  </g>
                </svg>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 80, lineHeight: 1, filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.8))' }}>{modelType.icon}</div>
                  {selAsset.id && selAsset.name !== '—' && (
                    <div style={{ marginTop: 16, fontSize: 72, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.7))' }}>{selAsset.emoji}</div>
                  )}
                  <div style={{ marginTop: 12, fontSize: 12, color: '#5a5878', fontWeight: 500 }}>{modelType.name} Workspace</div>
                </div>
              )}
            </div>

            {/* Axis gizmo */}
            <div style={{ position: 'absolute', top: 12, right: 12 }}>
              <svg width="52" height="52" viewBox="0 0 52 52">
                <line x1="26" y1="26" x2="26" y2="5" stroke="#50c060" strokeWidth="1.8" />
                <polygon points="26,2 23.5,7 28.5,7" fill="#50c060" />
                <text x="24" y="14" fill="#50c060" fontSize="7" fontWeight="700">Y</text>
                <line x1="26" y1="26" x2="48" y2="40" stroke="#e05050" strokeWidth="1.8" />
                <polygon points="50,42 44.5,38.5 46,44" fill="#e05050" />
                <text x="43" y="48" fill="#e05050" fontSize="7" fontWeight="700">X</text>
                <line x1="26" y1="26" x2="4" y2="40" stroke="#5090e0" strokeWidth="1.8" />
                <polygon points="2,42 7.5,38.5 6,44" fill="#5090e0" />
                <text x="0" y="48" fill="#5090e0" fontSize="7" fontWeight="700">Z</text>
              </svg>
            </div>

            {/* Overlay checkboxes */}
            <div style={{ position: 'absolute', top: 12, right: 72, background: 'rgba(12,10,20,0.88)', border: '1px solid #252336', borderRadius: 7, padding: '8px 12px', backdropFilter: 'blur(6px)' }}>
              {([['skeleton', 'Show Skeleton'], ['joints', 'Show Joints'], ['mesh', 'Show Mesh'], ['wireframe', 'Wireframe'], ['xray', 'X-Ray']] as [keyof typeof overlays, string][]).map(([k, label]) => (
                <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, cursor: 'pointer', fontSize: 10.5 }}>
                  <input type="checkbox" checked={overlays[k]} onChange={e => setOverlays(o => ({ ...o, [k]: e.target.checked }))} style={{ accentColor: '#e91e8c', width: 12, height: 12 }} />
                  <span style={{ color: '#c0bfd4' }}>{label}</span>
                </label>
              ))}
            </div>

            {/* Model type badge */}
            <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(12,10,20,0.88)', border: '1px solid #252336', borderRadius: 6, padding: '5px 10px', backdropFilter: 'blur(4px)' }}>
              <span style={{ fontSize: 14 }}>{modelType.icon}</span>
              <span style={{ fontSize: 10.5, color: '#c0bfd4', fontWeight: 600 }}>{modelType.name}</span>
              {modelTypeId === 'custom' && customTypeName && (
                <span style={{ fontSize: 10, color: '#8a8aaa' }}>— {customTypeName}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Inspector ── */}
      <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#0f0d18', borderLeft: '1px solid #1e1b2c', overflow: 'hidden' }}>

        {/* Inspector tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #1e1b2c', flexShrink: 0 }}>
          {['Model', 'Project Manager', 'Hierarchy'].map(t => (
            <button key={t} onClick={() => setInspTab(t)} style={{
              flex: 1, padding: '8px 4px', border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 500,
              color: inspTab === t ? '#e0dff0' : '#6a6888',
              borderBottom: `2px solid ${inspTab === t ? '#e91e8c' : 'transparent'}`,
              marginBottom: -1,
            }}>{t}</button>
          ))}
        </div>

        {/* Asset header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderBottom: '1px solid #1e1b2c', flexShrink: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: selAsset.id ? `radial-gradient(ellipse at 40% 35%, ${selAsset.g1}, ${selAsset.g2} 55%, #070810)` : '#141220', border: '1px solid #252336', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
            {selAsset.emoji}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#e0dff0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selAsset.name}</div>
            <div style={{ fontSize: 10, color: '#6a6888' }}>{selAsset.format} · {modelType.name}</div>
          </div>
          <button style={{ padding: '4px 10px', border: '1px solid #252336', borderRadius: 6, background: '#181626', color: '#c0bfd4', fontSize: 10.5, cursor: 'pointer' }}>Change</button>
        </div>

        {/* ── MODEL TAB ── */}
        {inspTab === 'Model' && (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <SectionHeader label="Transform" open={openSections.has('Transform')} onToggle={() => toggleSection('Transform')} />
            {openSections.has('Transform') && (
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #1e1b2c' }}>
                {[['Position', '0.000'], ['Rotation', '0.000'], ['Scale', '1.000']].map(([label, def]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                    <span style={{ fontSize: 10.5, color: '#6a6888', width: 54, flexShrink: 0 }}>{label}</span>
                    {['X', 'Y', 'Z'].map(ax => (
                      <div key={ax} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <span style={{ fontSize: 9.5, fontWeight: 700, color: ax === 'X' ? '#e05050' : ax === 'Y' ? '#50c060' : '#5090e0', width: 10 }}>{ax}</span>
                        <input defaultValue={def} style={{ flex: 1, background: '#181626', border: '1px solid #252336', borderRadius: 3, color: '#c0bfd4', padding: '2px 3px', fontSize: 9.5, width: 0 }} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <SectionHeader label="Model Info" open={openSections.has('Model Info')} onToggle={() => toggleSection('Model Info')} />
            {openSections.has('Model Info') && (
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #1e1b2c' }}>
                <InfoRow label="Vertices" value={selAsset.vertices} />
                <InfoRow label="Triangles" value={selAsset.triangles} />
                <InfoRow label="Has Rig" value={selAsset.hasRig ? 'Yes' : 'No'} />
                <InfoRow label="Has Skin" value={selAsset.hasSkin ? 'Yes' : 'No'} />
                <InfoRow label="Materials" value={String(selAsset.materials)} />
                <InfoRow label="Textures" value={String(selAsset.textures)} />
                <InfoRow label="File Size" value={selAsset.fileSize} />
                <InfoRow label="Path" value={selAsset.path} />
              </div>
            )}

            {/* Character-only: Skin Weights */}
            {isCharacter && (
              <>
                <SectionHeader label="Skin Weights" open={openSections.has('Skin Weights')} onToggle={() => toggleSection('Skin Weights')} />
                {openSections.has('Skin Weights') && (
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid #1e1b2c', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, cursor: 'pointer', fontSize: 10.5, color: '#c0bfd4' }}>
                      <input type="checkbox" defaultChecked style={{ accentColor: '#e91e8c', width: 13, height: 13 }} />
                      Auto Normalize
                    </label>
                    <button style={{ padding: '4px 10px', border: '1px solid #252336', borderRadius: 6, background: '#181626', color: '#c0bfd4', fontSize: 10.5, cursor: 'pointer' }}>Clean Weights</button>
                  </div>
                )}
              </>
            )}

            <SectionHeader label="3D Merge" open={openSections.has('3D Merge')} onToggle={() => toggleSection('3D Merge')} />
            {openSections.has('3D Merge') && (
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #1e1b2c' }}>
                <button style={{ width: '100%', padding: '7px', border: '1px solid #252336', borderRadius: 7, background: '#181626', color: '#c0bfd4', fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <span>{modelType.icon}</span> Add to {modelType.name}
                </button>
              </div>
            )}

            <SectionHeader label="Retopology" open={openSections.has('Retopology')} onToggle={() => toggleSection('Retopology')} />
            {openSections.has('Retopology') && (
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #1e1b2c' }}>
                <button style={{ width: '100%', padding: '7px', border: '1px solid #252336', borderRadius: 7, background: '#181626', color: '#c0bfd4', fontSize: 11, cursor: 'pointer' }}>Open Retopology</button>
              </div>
            )}

            <SectionHeader label="UV" open={openSections.has('UV')} onToggle={() => toggleSection('UV')} />
            {openSections.has('UV') && (
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #1e1b2c' }}>
                <button style={{ width: '100%', padding: '7px', border: '1px solid #252336', borderRadius: 7, background: '#181626', color: '#c0bfd4', fontSize: 11, cursor: 'pointer' }}>Open UV Editor</button>
              </div>
            )}
          </div>
        )}

        {/* ── PROJECT MANAGER TAB ── */}
        {inspTab === 'Project Manager' && <RightProjectManager modelTypeId={modelTypeId} isCharacter={isCharacter} openSections={openSections} toggleSection={toggleSection} />}

        {/* ── HIERARCHY TAB ── */}
        {inspTab === 'Hierarchy' && <HierarchyPanel />}
      </div>
    </div>
  )
}
