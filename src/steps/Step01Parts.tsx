import { useState } from 'react'
import HierarchyPanel from '../components/HierarchyPanel'

/* ── data ── */
type Part = {
  id: string; name: string; label: string; type: string
  emoji: string; g1: string; g2: string
  triangles: string; vertices: string; format: string
  hasRig: boolean; hasSkin: boolean; unit: string; path: string
  materials: number; textures: number; fileSize: string
}

const PARTS: Part[] = [
  { id: 'base_body', name: 'Base Body', label: 'Base Body', type: 'body', emoji: '🧍', g1: '#c8a08060', g2: '#604030a0', triangles: '98,432', vertices: '98,432', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Body/BaseBody.fbx', materials: 4, textures: 4, fileSize: '12.4 MB' },
  { id: 'head', name: 'Head', label: 'Head', type: 'head', emoji: '🗣', g1: '#d0a08070', g2: '#804838a0', triangles: '52,340', vertices: '52,340', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Head/Head.fbx', materials: 4, textures: 4, fileSize: '8.2 MB' },
  { id: 'hair', name: 'Hair', label: 'Hair', type: 'head', emoji: '💈', g1: '#20100890', g2: '#100808a0', triangles: '18,400', vertices: '18,400', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Head/Hair.fbx', materials: 2, textures: 2, fileSize: '3.1 MB' },
  { id: 'eye', name: 'Eye', label: 'Eye', type: 'head', emoji: '👁', g1: '#3070c080', g2: '#1040a0a0', triangles: '8,200', vertices: '8,200', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Head/Eye.fbx', materials: 2, textures: 2, fileSize: '1.4 MB' },
  { id: 'teeth', name: 'Teeth', label: 'Teeth', type: 'head', emoji: '🦷', g1: '#e8e0d080', g2: '#b0a890a0', triangles: '8,040', vertices: '8,040', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Head/Teeth.fbx', materials: 1, textures: 1, fileSize: '1.2 MB' },
  { id: 'hand_l', name: 'Hand_L', label: 'Hand_L', type: 'hand', emoji: '✋', g1: '#c89070a0', g2: '#704030a0', triangles: '12,480', vertices: '6,245', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Body/Hand_L.fbx', materials: 2, textures: 2, fileSize: '2.8 MB' },
  { id: 'foot_l', name: 'Foot_L', label: 'Foot_L', type: 'foot', emoji: '🦶', g1: '#c09070a0', g2: '#6a4030a0', triangles: '9,600', vertices: '4,800', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Body/Foot_L.fbx', materials: 2, textures: 2, fileSize: '2.1 MB' },
  { id: 'clothing', name: 'Clothing', label: 'Clothing', type: 'clothing', emoji: '👕', g1: '#3040608a', g2: '#1830408a', triangles: '16,200', vertices: '8,100', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Clothing/Shirt.fbx', materials: 2, textures: 2, fileSize: '3.8 MB' },
  { id: 'pants', name: 'Pants', label: 'Pants', type: 'clothing', emoji: '👖', g1: '#283048a0', g2: '#141828a0', triangles: '14,400', vertices: '7,200', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Clothing/Pants.fbx', materials: 2, textures: 2, fileSize: '3.2 MB' },
  { id: 'shoes', name: 'Shoes', label: 'Shoes', type: 'clothing', emoji: '👟', g1: '#383838a0', g2: '#181818a0', triangles: '10,800', vertices: '5,400', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Clothing/Shoes.fbx', materials: 2, textures: 2, fileSize: '2.6 MB' },
  { id: 'hat', name: 'Hat', label: 'Hat', type: 'clothing', emoji: '🎩', g1: '#70501870', g2: '#40300880', triangles: '6,200', vertices: '3,100', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Clothing/Hat.fbx', materials: 1, textures: 1, fileSize: '1.5 MB' },
  { id: 'accessories', name: 'Accessories', label: 'Accessories', type: 'clothing', emoji: '🕶', g1: '#30303060', g2: '#181818a0', triangles: '4,800', vertices: '2,400', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Clothing/Glasses.fbx', materials: 1, textures: 1, fileSize: '1.0 MB' },
]

const CAT_TABS = ['All', 'Body', 'Head', 'Hand', 'Foot', 'Clothing']

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

function ActionBtn({ children, pink, danger, full, small }: { children: React.ReactNode; pink?: boolean; danger?: boolean; full?: boolean; small?: boolean }) {
  return (
    <button style={{
      width: full ? '100%' : undefined,
      padding: small ? '4px 10px' : '5px 12px',
      border: danger ? '1px solid rgba(224,64,64,0.4)' : pink ? 'none' : '1px solid #252336',
      borderRadius: 6,
      background: pink ? '#e91e8c' : danger ? 'rgba(224,64,64,0.1)' : '#181626',
      color: pink ? '#fff' : danger ? '#e04040' : '#a0a0c0',
      fontSize: 10.5, fontWeight: pink ? 700 : 500, cursor: 'pointer',
    }}>{children}</button>
  )
}

/* ── Part thumbnail ── */
function PartThumb({ part, selected, onClick }: { part: Part; selected: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} style={{
      borderRadius: 8, border: `2px solid ${selected ? '#e91e8c' : '#1e1b2c'}`,
      background: selected ? 'rgba(233,30,140,0.08)' : '#141220',
      cursor: 'pointer', overflow: 'hidden', transition: 'border-color 0.1s',
    }}>
      <div style={{
        height: 72, background: `radial-gradient(ellipse at 40% 35%, ${part.g1}, ${part.g2} 55%, #070810)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
      }}>{part.emoji}</div>
      <div style={{ padding: '3px 6px 5px', fontSize: 9.5, color: selected ? '#e91e8c' : '#8a8aaa', textAlign: 'center', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{part.label}</div>
    </div>
  )
}

export default function Step01Parts() {
  const [libTab, setLibTab] = useState('Part Library')
  const [catTab, setCatTab] = useState('All')
  const [selected, setSelected] = useState('base_body')
  const [viewTab, setViewTab] = useState('Viewport')
  const [inspTab, setInspTab] = useState('Model')
  const [search, setSearch] = useState('')
  const [overlays, setOverlays] = useState({ skeleton: true, joints: true, mesh: true, wireframe: false, xray: false })
  const [openSections, setOpenSections] = useState(new Set(['Transform', 'Model Info', 'Skin Weights', '3D Merge Parts', 'Retopology', 'UV', 'Scene Files', 'Project Assets', 'Export Settings']))
  const toggleSection = (s: string) => setOpenSections(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n })

  const selPart = PARTS.find(p => p.id === selected) || PARTS[0]

  const filtered = PARTS.filter(p => {
    if (catTab !== 'All' && p.type !== catTab.toLowerCase()) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: '#0b0912', fontSize: 11 }}>

      {/* ── LEFT: Asset Library ── */}
      <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#0f0d18', borderRight: '1px solid #1e1b2c', overflow: 'hidden' }}>

        {/* Panel title */}
        <div style={{ padding: '10px 14px 8px', borderBottom: '1px solid #1e1b2c', flexShrink: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#e0dff0', marginBottom: 8 }}>Asset Library</div>
          {/* Top tabs */}
          <div style={{ display: 'flex', gap: 0 }}>
            {['Part Library', 'My Assets', 'Project'].map(t => (
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

        {/* Search */}
        <div style={{ padding: '8px 10px 4px', flexShrink: 0 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: '#3e3c58', pointerEvents: 'none' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search parts..."
              style={{ width: '100%', background: '#181626', border: '1px solid #252336', borderRadius: 6, color: '#c0bfd4', padding: '5px 8px 5px 26px', fontSize: 10.5 }} />
          </div>
        </div>

        {/* Category chips */}
        <div style={{ display: 'flex', gap: 4, padding: '4px 10px 6px', flexShrink: 0, flexWrap: 'wrap' }}>
          {CAT_TABS.map(t => (
            <button key={t} onClick={() => setCatTab(t)} style={{
              padding: '3px 10px', border: `1px solid ${catTab === t ? '#e91e8c' : '#252336'}`,
              borderRadius: 20, background: catTab === t ? '#e91e8c' : '#181626',
              color: catTab === t ? '#fff' : '#8a8aaa', fontSize: 10, fontWeight: catTab === t ? 700 : 400, cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>

        {/* Parts grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 10px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, alignContent: 'start' }}>
          {filtered.map(part => (
            <PartThumb key={part.id} part={part} selected={selected === part.id} onClick={() => setSelected(part.id)} />
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#3e3c58', fontSize: 11, padding: '24px 0' }}>No parts found</div>
          )}
        </div>

        {/* Asset Details */}
        <div style={{ borderTop: '1px solid #1e1b2c', flexShrink: 0 }}>
          <div style={{ padding: '6px 12px 4px', fontSize: 12, fontWeight: 700, color: '#c0bfd4' }}>Asset Details</div>
          <div style={{ display: 'flex', gap: 10, padding: '0 10px 8px' }}>
            <div style={{ width: 72, height: 72, flexShrink: 0, borderRadius: 8, background: `radial-gradient(ellipse at 40% 35%, ${selPart.g1}, ${selPart.g2} 55%, #070810)`, border: '1px solid #252336', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{selPart.emoji}</div>
            <div style={{ flex: 1 }}>
              <InfoRow label="Name" value={selPart.name} />
              <InfoRow label="Type" value={selPart.type.charAt(0).toUpperCase() + selPart.type.slice(1)} />
              <InfoRow label="Format" value={selPart.format} />
              <InfoRow label="Triangles" value={selPart.triangles} />
              <InfoRow label="Has Rig" value={selPart.hasRig ? 'Yes' : 'No'} />
              <InfoRow label="Has Skin" value={selPart.hasSkin ? 'Yes' : 'No'} />
              <InfoRow label="Unit" value={selPart.unit} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, padding: '0 10px 10px' }}>
            <ActionBtn pink>Import</ActionBtn>
            <ActionBtn>Replace</ActionBtn>
            <ActionBtn danger>Remove</ActionBtn>
          </div>
        </div>
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
          {/* Toolbar icons */}
          {['↖', '✛', '↺', '⊠', '⊙', '⊞', '⊟'].map((ic, i) => (
            <button key={i} style={{ width: 26, height: 26, border: '1px solid #1e1b2c', borderRadius: 4, background: '#181626', color: '#6a6888', fontSize: 11, cursor: 'pointer', margin: '0 1px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ic}</button>
          ))}
          <select style={{ margin: '0 8px', background: '#181626', border: '1px solid #252336', color: '#c0bfd4', borderRadius: 5, padding: '2px 8px', fontSize: 10.5, cursor: 'pointer' }}>
            <option>Perspective</option><option>Top</option><option>Front</option><option>Side</option>
          </select>
          {['⬡', '☉', '⊡', '⛶'].map((ic, i) => (
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

            {/* Male body character SVG */}
            <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)' }}>
              <svg width="200" height="480" viewBox="0 0 200 480" style={{ filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.8))' }}>
                {/* Hair */}
                <ellipse cx="100" cy="28" rx="28" ry="32" fill="#1c1008" />
                {/* Head */}
                <ellipse cx="100" cy="38" rx="26" ry="30" fill="#c8a07a" />
                {/* Face */}
                <ellipse cx="90" cy="36" rx="5" ry="3.5" fill="#0a0608" opacity="0.75" />
                <ellipse cx="110" cy="36" rx="5" ry="3.5" fill="#0a0608" opacity="0.75" />
                <circle cx="90" cy="36" r="3" fill="#2a1810" />
                <circle cx="110" cy="36" r="3" fill="#2a1810" />
                <circle cx="91.5" cy="35" r="1.2" fill="#fff" opacity="0.9" />
                <circle cx="111.5" cy="35" r="1.2" fill="#fff" opacity="0.9" />
                <path d="M 93 52 Q 100 57 107 52" fill="none" stroke="#a07060" strokeWidth="1.5" strokeLinecap="round" />
                {/* Neck */}
                <rect x="92" y="65" width="16" height="20" rx="6" fill="#c0987060" />
                {/* Torso - muscular */}
                <path d="M 68 85 Q 100 75 132 85 L 138 190 Q 120 200 100 202 Q 80 200 62 190 Z" fill="#c8a07a" />
                {/* Chest definition */}
                <path d="M 78 100 Q 96 108 100 120 Q 104 108 122 100" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="2" />
                {/* Abs */}
                <rect x="93" y="130" width="14" height="10" rx="3" fill="rgba(0,0,0,0.06)" />
                <rect x="93" y="145" width="14" height="10" rx="3" fill="rgba(0,0,0,0.06)" />
                <rect x="93" y="160" width="14" height="10" rx="3" fill="rgba(0,0,0,0.06)" />
                {/* Left arm */}
                <path d="M 68 88 Q 48 110 36 155 Q 32 175 32 200" fill="none" stroke="#c8a07a" strokeWidth="18" strokeLinecap="round" />
                {/* Right arm */}
                <path d="M 132 88 Q 152 110 164 155 Q 168 175 168 200" fill="none" stroke="#c8a07a" strokeWidth="18" strokeLinecap="round" />
                {/* Left hand */}
                <ellipse cx="32" cy="212" rx="9" ry="12" fill="#c8a07a" />
                {/* Right hand */}
                <ellipse cx="168" cy="212" rx="9" ry="12" fill="#c8a07a" />
                {/* Shorts / underwear */}
                <path d="M 62 190 Q 58 235 55 290 L 55 340 Q 62 345 72 340 L 75 290 L 100 260 L 125 290 L 128 340 Q 138 345 145 340 L 145 290 Q 142 235 138 190 Z" fill="#4a5570" />
                {/* Left leg lower */}
                <path d="M 55 340 Q 53 380 52 420 L 56 450" fill="none" stroke="#c8a07a" strokeWidth="22" strokeLinecap="round" />
                {/* Right leg lower */}
                <path d="M 145 340 Q 147 380 148 420 L 144 450" fill="none" stroke="#c8a07a" strokeWidth="22" strokeLinecap="round" />
                {/* Feet */}
                <ellipse cx="55" cy="458" rx="16" ry="9" fill="#c8a07a" />
                <ellipse cx="144" cy="458" rx="16" ry="9" fill="#c8a07a" />
                {/* Waistband */}
                <rect x="62" y="186" width="76" height="10" rx="4" fill="#384060" />

                {/* Skeleton overlay (when enabled) */}
                <g opacity="0.75">
                  <line x1="100" y1="38" x2="100" y2="185" stroke="#27c96a" strokeWidth="1.5" strokeDasharray="none" />
                  <line x1="100" y1="95" x2="36" y2="200" stroke="#27c96a" strokeWidth="1.5" />
                  <line x1="100" y1="95" x2="164" y2="200" stroke="#27c96a" strokeWidth="1.5" />
                  <line x1="100" y1="185" x2="60" y2="340" stroke="#27c96a" strokeWidth="1.5" />
                  <line x1="100" y1="185" x2="140" y2="340" stroke="#27c96a" strokeWidth="1.5" />
                  <line x1="60" y1="340" x2="55" y2="455" stroke="#27c96a" strokeWidth="1.5" />
                  <line x1="140" y1="340" x2="145" y2="455" stroke="#27c96a" strokeWidth="1.5" />
                  {[[100,38],[100,68],[100,95],[100,140],[100,185],[36,200],[164,200],[60,340],[140,340],[55,455],[145,455],[100,115],[100,160]].map(([x,y],i) => (
                    <circle key={i} cx={x} cy={y} r="4" fill="none" stroke="#27c96a" strokeWidth="1.5" />
                  ))}
                </g>
              </svg>
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

        {/* Asset header — shared across all tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderBottom: '1px solid #1e1b2c', flexShrink: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: `radial-gradient(ellipse at 40% 35%, ${selPart.g1}, ${selPart.g2} 55%, #070810)`, border: '1px solid #252336', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{selPart.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#e0dff0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selPart.name}</div>
            <div style={{ fontSize: 10, color: '#6a6888' }}>FBX Model</div>
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
                <InfoRow label="Vertices" value={selPart.vertices} />
                <InfoRow label="Triangles" value={selPart.triangles} />
                <InfoRow label="Skinned Mesh" value={selPart.hasSkin ? 'Yes' : 'No'} />
                <InfoRow label="Rigged" value={selPart.hasRig ? 'Yes' : 'No'} />
                <InfoRow label="Materials" value={String(selPart.materials)} />
                <InfoRow label="Textures" value={String(selPart.textures)} />
                <InfoRow label="File Size" value={selPart.fileSize} />
                <InfoRow label="Path" value={selPart.path} />
              </div>
            )}

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

            <SectionHeader label="3D Merge Parts" open={openSections.has('3D Merge Parts')} onToggle={() => toggleSection('3D Merge Parts')} />
            {openSections.has('3D Merge Parts') && (
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #1e1b2c' }}>
                <button style={{ width: '100%', padding: '7px', border: '1px solid #252336', borderRadius: 7, background: '#181626', color: '#c0bfd4', fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <span>👤</span> Add to Character
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
        {inspTab === 'Project Manager' && (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* Project header */}
            <div style={{ padding: '10px 12px', borderBottom: '1px solid #1e1b2c' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#c0bfd4' }}>MyProject</span>
                <button style={{ padding: '3px 8px', border: '1px solid #252336', borderRadius: 5, background: '#181626', color: '#c0bfd4', fontSize: 9.5, cursor: 'pointer' }}>+ New</button>
              </div>
              <InfoRow label="Created" value="2024-11-02" />
              <InfoRow label="Modified" value="2024-11-10" />
              <InfoRow label="Total Assets" value="24" />
              <InfoRow label="Scene Files" value="3" />
            </div>

            {/* Scene files */}
            <SectionHeader label="Scene Files" open={openSections.has('Scene Files')} onToggle={() => toggleSection('Scene Files')} />
            {openSections.has('Scene Files') && (
              <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1b2c' }}>
                {[
                  { name: 'Main_Character.scn', size: '4.2 MB', modified: '11/10' },
                  { name: 'NPC_Female.scn', size: '3.8 MB', modified: '11/08' },
                  { name: 'Environment_01.scn', size: '12.1 MB', modified: '11/05' },
                ].map(f => (
                  <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}>
                    <span style={{ fontSize: 12 }}>📄</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10.5, color: '#c0bfd4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                      <div style={{ fontSize: 9.5, color: '#4a4868' }}>{f.size} · {f.modified}</div>
                    </div>
                  </div>
                ))}
                <button style={{ width: '100%', padding: '5px', marginTop: 6, border: '1px dashed #252336', borderRadius: 6, background: 'none', color: '#6a6888', fontSize: 10, cursor: 'pointer' }}>+ Add Scene File</button>
              </div>
            )}

            {/* Assets in project */}
            <SectionHeader label="Project Assets" open={openSections.has('Project Assets')} onToggle={() => toggleSection('Project Assets')} />
            {openSections.has('Project Assets') && (
              <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e1b2c' }}>
                {[
                  { name: 'Base Body', type: 'Body', size: '12.4 MB', color: '#c8a07a' },
                  { name: 'Head_Female_01', type: 'Head', size: '8.2 MB', color: '#d0a080' },
                  { name: 'Hair_01', type: 'Head', size: '3.1 MB', color: '#201008' },
                  { name: 'Cloth_Shirt_01', type: 'Clothing', size: '3.8 MB', color: '#304060' },
                  { name: 'Cloth_Pants_01', type: 'Clothing', size: '3.2 MB', color: '#283048' },
                ].map(a => (
                  <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}>
                    <div style={{ width: 24, height: 24, borderRadius: 4, background: `radial-gradient(circle at 40% 35%, ${a.color}aa, #07081060)`, border: '1px solid #252336', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10.5, color: '#c0bfd4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
                      <div style={{ fontSize: 9.5, color: '#4a4868' }}>{a.type} · {a.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Export settings */}
            <SectionHeader label="Export Settings" open={openSections.has('Export Settings')} onToggle={() => toggleSection('Export Settings')} />
            {openSections.has('Export Settings') && (
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #1e1b2c' }}>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 10, color: '#6a6888', marginBottom: 3 }}>Format</div>
                  <select style={{ width: '100%', background: '#181626', border: '1px solid #252336', borderRadius: 5, color: '#c0bfd4', padding: '4px 8px', fontSize: 10.5, cursor: 'pointer' }}>
                    <option>FBX (Unity)</option>
                    <option>FBX (Unreal)</option>
                    <option>GLB / glTF</option>
                    <option>OBJ</option>
                    <option>USD</option>
                  </select>
                </div>
                {[['Include Textures', true], ['Embed Materials', false], ['Export Rig', true], ['Bake Animations', false]].map(([label, checked]) => (
                  <label key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, cursor: 'pointer', fontSize: 10.5, color: '#c0bfd4' }}>
                    <input type="checkbox" defaultChecked={checked as boolean} style={{ accentColor: '#e91e8c', width: 12, height: 12 }} />
                    {label as string}
                  </label>
                ))}
                <button style={{ width: '100%', padding: '6px', marginTop: 6, border: 'none', borderRadius: 6, background: '#e91e8c', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Export Project</button>
              </div>
            )}
          </div>
        )}

        {/* ── HIERARCHY TAB ── */}
        {inspTab === 'Hierarchy' && <HierarchyPanel />}
      </div>
    </div>
  )
}
