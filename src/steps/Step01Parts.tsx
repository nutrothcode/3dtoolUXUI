import { useState } from 'react'
import { PanelSection, XYZRow, InfoRow, Btn, Check, TabRow, PanelLabel } from '../components/shared'

const PARTS = [
  { id: 'body_base', name: 'Body_Base', type: 'body', color: '#2a3a4a' },
  { id: 'head_01', name: 'Head_01', type: 'head', color: '#3a2a2a' },
  { id: 'head_02', name: 'Head_02', type: 'head', color: '#3a2a30' },
  { id: 'hand_l', name: 'Hand_L', type: 'hand', color: '#2a3a3a', selected: true },
  { id: 'hand_r', name: 'Hand_R', type: 'hand', color: '#2a3a35' },
  { id: 'foot_l', name: 'Foot_L', type: 'foot', color: '#303040' },
  { id: 'foot_r', name: 'Foot_R', type: 'foot', color: '#30303c' },
  { id: 'hair_01', name: 'Hair_01', type: 'head', color: '#1a1510' },
  { id: 'hair_02', name: 'Hair_02', type: 'head', color: '#18120e' },
  { id: 'shirt_01', name: 'Foirt_01', type: 'clothing', color: '#28282c' },
  { id: 'pants_01', name: 'Pants_01', type: 'clothing', color: '#1a2030' },
  { id: 'shoes_01', name: 'Shoes_01', type: 'clothing', color: '#141414' },
]

const TREE = [
  { id: 'char', label: 'Character', depth: 0, open: true },
  { id: 'body', label: 'Body', depth: 1, open: true },
  { id: 'root', label: 'root', depth: 2 },
  { id: 'pelvis', label: 'pelvis', depth: 3 },
  { id: 'spine01', label: 'spine_01', depth: 4 },
  { id: 'spine02', label: 'spine_02', depth: 5 },
  { id: 'chest', label: 'chest', depth: 6 },
  { id: 'neck', label: 'neck', depth: 7 },
  { id: 'head', label: 'head', depth: 8 },
  { id: 'leftarm', label: 'Left Arm', depth: 1, open: true },
  { id: 'clavl', label: 'clavicle_l', depth: 2 },
  { id: 'upperl', label: 'upperarm_l', depth: 3 },
  { id: 'lowerl', label: 'lowerarm_l', depth: 4 },
  { id: 'wristl', label: 'wrist_l', depth: 5 },
  { id: 'handl', label: 'hand_l', depth: 6, selected: true },
  { id: 'thumb01l', label: 'thumb_01_l', depth: 7 },
  { id: 'thumb02l', label: 'thumb_02_l', depth: 8 },
  { id: 'thumb03l', label: 'thumb_03_l', depth: 9 },
  { id: 'idx01l', label: 'index_01_l', depth: 7 },
  { id: 'idx02l', label: 'index_02_l', depth: 8 },
  { id: 'idx03l', label: 'index_03_l', depth: 9 },
  { id: 'mid01l', label: 'middle_01_l', depth: 7 },
]

const ANIMS = ['Idle', 'Walk', 'Run', 'Jump', 'Attack', 'Custom']

export default function Step01Parts() {
  const [libTab, setLibTab] = useState('All')
  const [viewTab, setViewTab] = useState('Viewport')
  const [hierTab, setHierTab] = useState('Hierarchy')
  const [selected, setSelected] = useState('hand_l')
  const [activeAnim, setActiveAnim] = useState('Idle')
  const [playing, setPlaying] = useState(false)
  const [overlays, setOverlays] = useState({ skeleton: true, joints: true, mesh: false, wireframe: false, xray: false })

  const selectedPart = PARTS.find(p => p.id === selected) || PARTS[3]
  const libFilter = libTab === 'All' ? PARTS : PARTS.filter(p => p.type === libTab.toLowerCase())

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

      {/* ───────── LEFT PANEL ───────── */}
      <div style={{ width: 270, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderRight: '1px solid var(--bd)', overflow: 'hidden' }}>
        {/* Library / My Assets / Project tabs */}
        <TabRow tabs={['Part Library', 'My Assets', 'Project']} active="Part Library" setActive={() => {}} />

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 2, padding: '6px 8px 4px', flexShrink: 0 }}>
          {['All', 'Body', 'Head', 'Hand', 'Foot', 'Clothing'].map(t => (
            <button key={t} onClick={() => setLibTab(t)} style={{
              padding: '3px 7px', border: `1px solid ${libTab === t ? 'var(--pink)' : 'var(--bd)'}`,
              borderRadius: 4, background: libTab === t ? 'var(--pink-lo)' : 'var(--p3)',
              color: libTab === t ? 'var(--pink)' : 'var(--t2)', fontSize: 10, fontWeight: 500, cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>

        {/* Part grid */}
        <div style={{
          flex: 1, overflowY: 'auto', display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, padding: '4px 8px',
          alignContent: 'start',
        }}>
          {libFilter.map(part => (
            <div key={part.id} onClick={() => setSelected(part.id)} style={{
              borderRadius: 6, border: `2px solid ${selected === part.id ? 'var(--blu)' : 'var(--bd)'}`,
              background: selected === part.id ? 'rgba(74,144,217,0.1)' : 'var(--p3)',
              cursor: 'pointer', overflow: 'hidden',
            }}>
              <div style={{
                height: 72, background: `radial-gradient(ellipse at 50% 30%, ${part.color}ee, #0a0c14)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>
                {part.type === 'body' ? '🧍' : part.type === 'head' ? '🗣' : part.type === 'hand' ? '✋' : part.type === 'foot' ? '🦶' : '👕'}
              </div>
              <div style={{ padding: '3px 4px', fontSize: 9, color: 'var(--t2)', textAlign: 'center', fontWeight: 500 }}>{part.name}</div>
            </div>
          ))}
        </div>

        {/* Asset Details */}
        <div style={{ borderTop: '1px solid var(--bd)', flexShrink: 0 }}>
          <PanelLabel>Asset Details</PanelLabel>
          <div style={{ display: 'flex', padding: 8, gap: 8 }}>
            {/* Mini preview */}
            <div style={{
              width: 72, height: 72, flexShrink: 0, borderRadius: 6,
              background: `radial-gradient(ellipse at 50% 30%, ${selectedPart.color}ee, #0a0c14)`,
              border: '1px solid var(--bd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
            }}>✋</div>
            <div style={{ flex: 1 }}>
              <InfoRow label="Name" value="Hand_L" />
              <InfoRow label="Type" value="Hand (Left)" />
              <InfoRow label="Format" value="fbx" />
              <InfoRow label="Triangles" value="12,480" />
              <InfoRow label="Has Rig" value="Yes" />
              <InfoRow label="Has Skin" value="Yes" />
              <InfoRow label="Unit" value="Meter (1.0)" />
              <InfoRow label="Attach To" value="wrist_l" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4, padding: '4px 8px 8px' }}>
            <Btn small>Import</Btn>
            <Btn small>Replace</Btn>
            <Btn small>Mirror</Btn>
            <Btn small red full>Remove</Btn>
          </div>
        </div>
      </div>

      {/* ───────── CENTER ───────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Viewport top bar */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--p2)', borderBottom: '1px solid var(--bd)', flexShrink: 0, gap: 0, height: 34 }}>
          <TabRow tabs={['Viewport', '2D Preview', 'Render Preview']} active={viewTab} setActive={setViewTab} />
          <div style={{ flex: 1 }} />
          {/* toolbar icons */}
          <div style={{ display: 'flex', gap: 2, padding: '0 8px' }}>
            {['⊕', '↔', '⟳', '⊞', '▦', '⊡', '⊟', '⬡', '☉', '⊙'].map((ic, i) => (
              <button key={i} style={{
                width: 24, height: 24, border: '1px solid var(--bd)', borderRadius: 3,
                background: 'var(--p3)', color: 'var(--t2)', fontSize: 11, cursor: 'pointer',
              }}>{ic}</button>
            ))}
          </div>
          {/* Perspective dropdown */}
          <select style={{ background: 'var(--p3)', border: '1px solid var(--bd)', color: 'var(--txt)', borderRadius: 4, padding: '2px 6px', fontSize: 10.5, marginRight: 8 }}>
            <option>Perspective</option>
            <option>Top</option>
            <option>Front</option>
            <option>Side</option>
          </select>
        </div>

        {/* Viewport main area */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex' }}>
          {/* Left tool strip */}
          <div style={{
            width: 36, flexShrink: 0, background: 'var(--p1)',
            borderRight: '1px solid var(--bd)', display: 'flex',
            flexDirection: 'column', alignItems: 'center', padding: '6px 0', gap: 2,
          }}>
            {[
              { icon: '⬆', label: 'Select' },
              { icon: '✛', label: 'Move' },
              { icon: '↺', label: 'Rotate' },
              { icon: '⊠', label: 'Scale' },
              { icon: '○', label: 'Joint' },
              { icon: '⋮', label: 'Bone' },
              { icon: '◎', label: 'Skin' },
              { icon: '⌕', label: 'Measure' },
              { icon: '⊟', label: 'Fit' },
              { icon: '⊞', label: 'Mirror' },
            ].map((tool, i) => (
              <button key={i} title={tool.label} style={{
                width: 28, height: 28, border: `1px solid ${i === 0 ? 'var(--pink)' : 'transparent'}`,
                borderRadius: 4, background: i === 0 ? 'var(--pink-lo)' : 'none',
                color: i === 0 ? 'var(--pink)' : 'var(--t2)', fontSize: 12, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{tool.icon}</button>
            ))}
          </div>

          {/* 3D Viewport */}
          <div style={{
            flex: 1, position: 'relative',
            background: 'linear-gradient(180deg, #0e1220 0%, #090b12 60%, #0c0f18 100%)',
            overflow: 'hidden',
          }}>
            {/* Grid floor */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
              backgroundImage: 'linear-gradient(var(--bd) 1px, transparent 1px), linear-gradient(90deg, var(--bd) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              opacity: 0.4,
              transform: 'perspective(400px) rotateX(60deg)',
              transformOrigin: 'bottom center',
            }} />

            {/* Character silhouette */}
            <div style={{
              position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              {/* Body using CSS shapes */}
              <svg width="160" height="380" viewBox="0 0 160 380" style={{ filter: 'drop-shadow(0 0 20px rgba(74,144,217,0.3))' }}>
                {/* Skeleton overlay lines */}
                <line x1="80" y1="20" x2="80" y2="200" stroke="#27c96a" strokeWidth="1.5" opacity="0.7" />
                <line x1="80" y1="60" x2="25" y2="140" stroke="#27c96a" strokeWidth="1.5" opacity="0.7" />
                <line x1="80" y1="60" x2="135" y2="140" stroke="#27c96a" strokeWidth="1.5" opacity="0.7" />
                <line x1="80" y1="200" x2="50" y2="330" stroke="#27c96a" strokeWidth="1.5" opacity="0.7" />
                <line x1="80" y1="200" x2="110" y2="330" stroke="#27c96a" strokeWidth="1.5" opacity="0.7" />
                {/* Joint dots */}
                {[
                  [80,20],[80,60],[80,120],[80,200],[25,140],[135,140],[50,330],[110,330],
                  [80,85],[40,160],[120,160],[55,250],[105,250]
                ].map(([x,y],i) => (
                  <circle key={i} cx={x} cy={y} r={i < 2 ? 5 : 4}
                    fill={i === 5 ? '#4a90d9' : 'none'}
                    stroke={i === 5 ? '#4a90d9' : '#27c96a'}
                    strokeWidth="1.5" opacity="0.8" />
                ))}
                {/* Character body mesh (skin-toned polygon) */}
                <ellipse cx="80" cy="14" rx="12" ry="14" fill="#c8a882" opacity="0.85" />
                <path d="M 55 45 Q 80 35 105 45 L 110 130 Q 95 145 80 148 Q 65 145 50 130 Z" fill="#d4a882" opacity="0.5" />
                <path d="M 55 130 Q 52 140 30 145 L 20 155 L 15 175 Q 20 178 30 170 L 45 200 L 50 210" fill="none" stroke="#d4a882" strokeWidth="12" strokeLinecap="round" opacity="0.6" />
                <path d="M 105 130 Q 108 140 130 145 L 140 155 L 145 175" fill="none" stroke="#d4a882" strokeWidth="12" strokeLinecap="round" opacity="0.6" />
                <path d="M 55 200 Q 50 250 48 300 L 50 340" fill="none" stroke="#4a6a9a" strokeWidth="20" strokeLinecap="round" opacity="0.7" />
                <path d="M 105 200 Q 110 250 112 300 L 110 340" fill="none" stroke="#4a6a9a" strokeWidth="20" strokeLinecap="round" opacity="0.7" />
                {/* Hand highlight (selected) */}
                <circle cx="15" cy="175" r="8" fill="rgba(74,144,217,0.3)" stroke="#4a90d9" strokeWidth="1.5" />
                <circle cx="22" cy="182" r="3" fill="#4a90d9" opacity="0.8" />
              </svg>
            </div>

            {/* Axis gizmo top-right */}
            <div style={{
              position: 'absolute', top: 12, right: 12,
              width: 60, height: 60,
            }}>
              <svg width="60" height="60" viewBox="0 0 60 60">
                <line x1="30" y1="30" x2="30" y2="5" stroke="#50c060" strokeWidth="2" />
                <text x="28" y="14" fill="#50c060" fontSize="8" fontWeight="700">Y</text>
                <line x1="30" y1="30" x2="55" y2="45" stroke="#e05050" strokeWidth="2" />
                <text x="50" y="52" fill="#e05050" fontSize="8" fontWeight="700">X</text>
                <line x1="30" y1="30" x2="5" y2="45" stroke="#5090e0" strokeWidth="2" />
                <text x="2" y="52" fill="#5090e0" fontSize="8" fontWeight="700">Z</text>
                {[['#50c060',30,5],['#e05050',55,45],['#5090e0',5,45]].map(([c,x,y],i) => (
                  <circle key={i} cx={x as number} cy={y as number} r="4" fill={c as string} />
                ))}
              </svg>
            </div>

            {/* Overlay checkboxes */}
            <div style={{
              position: 'absolute', top: 12, right: 80,
              background: 'rgba(18,20,30,0.85)', border: '1px solid var(--bd)',
              borderRadius: 6, padding: '6px 10px', backdropFilter: 'blur(4px)',
            }}>
              {(Object.entries(overlays) as [string, boolean][]).map(([k, v]) => {
                const labels: Record<string, string> = { skeleton: 'Show Skeleton', joints: 'Show Joints', mesh: 'Show Mesh', wireframe: 'Wireframe', xray: 'X-Ray' }
                return (
                  <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, cursor: 'pointer', fontSize: 10.5 }}>
                    <input type="checkbox" checked={v} onChange={e => setOverlays(o => ({ ...o, [k]: e.target.checked }))}
                      style={{ accentColor: 'var(--pink)', width: 12, height: 12 }} />
                    <span style={{ color: 'var(--txt)' }}>{labels[k]}</span>
                  </label>
                )
              })}
            </div>

            {/* Transform gizmo arrows (bottom-center of character) */}
            <div style={{
              position: 'absolute', top: '54%', left: '56%',
            }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <line x1="40" y1="40" x2="40" y2="5" stroke="#50c060" strokeWidth="1.5" />
                <polygon points="40,2 37,8 43,8" fill="#50c060" />
                <line x1="40" y1="40" x2="75" y2="40" stroke="#e05050" strokeWidth="1.5" />
                <polygon points="78,40 72,37 72,43" fill="#e05050" />
                <line x1="40" y1="40" x2="15" y2="65" stroke="#5090e0" strokeWidth="1.5" />
                <polygon points="12,68 18,66 16,60" fill="#5090e0" />
              </svg>
            </div>
          </div>
        </div>

        {/* Animation Preview strip */}
        <div style={{
          height: 126, flexShrink: 0, background: 'var(--p2)',
          borderTop: '1px solid var(--bd)', display: 'flex', flexDirection: 'column',
        }}>
          <PanelLabel>
            <span>Animation Preview</span>
          </PanelLabel>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '6px 10px', gap: 6 }}>
            {/* Anim state buttons */}
            <div style={{ display: 'flex', gap: 4 }}>
              {ANIMS.map(a => (
                <button key={a} onClick={() => setActiveAnim(a)} style={{
                  padding: '3px 12px', borderRadius: 4, border: `1px solid ${activeAnim === a ? 'var(--pink)' : 'var(--bd)'}`,
                  background: activeAnim === a ? 'var(--pink)' : 'var(--p4)',
                  color: activeAnim === a ? '#fff' : 'var(--txt)', fontSize: 10.5, fontWeight: 500, cursor: 'pointer',
                }}>{a}</button>
              ))}
              <div style={{ flex: 1 }} />
              <span style={{ color: 'var(--t2)', fontSize: 10.5, alignSelf: 'center' }}>Keyframes</span>
              <button style={{ padding: '3px 10px', border: '1px solid var(--bd)', borderRadius: 4, background: 'var(--p4)', color: 'var(--txt)', fontSize: 10.5, cursor: 'pointer' }}>Add Key</button>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10.5, color: 'var(--txt)' }}>
                <input type="checkbox" style={{ accentColor: 'var(--pink)' }} />
                Loop
              </label>
            </div>
            {/* Transport + timeline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Transport */}
              {['⏮', '▶', '⏸', '⏭'].map((ic, i) => (
                <button key={i} onClick={() => i === 1 && setPlaying(p => !p)} style={{
                  width: 26, height: 26, border: '1px solid var(--bd)', borderRadius: 4,
                  background: 'var(--p4)', color: 'var(--txt)', fontSize: 12, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{i === 1 && playing ? '⏸' : ic}</button>
              ))}
              {/* Timeline */}
              <div style={{ flex: 1, position: 'relative', height: 6, background: 'var(--p3)', borderRadius: 3 }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '35%', background: 'var(--pink)', borderRadius: 3 }} />
                <div style={{ position: 'absolute', left: '35%', top: -3, width: 12, height: 12, background: 'var(--pink)', borderRadius: '50%', transform: 'translateX(-50%)' }} />
              </div>
              <span style={{ color: 'var(--t2)', fontSize: 10.5, whiteSpace: 'nowrap' }}>0:00 / 1:00</span>
              <span style={{ color: 'var(--t2)', fontSize: 10 }}>Speed</span>
              <select style={{ background: 'var(--p3)', border: '1px solid var(--bd)', color: 'var(--txt)', borderRadius: 4, padding: '2px 4px', fontSize: 10.5 }}>
                <option>1.0x</option><option>0.5x</option><option>2.0x</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ───────── RIGHT PANEL ───────── */}
      <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderLeft: '1px solid var(--bd)', overflow: 'hidden' }}>
        {/* Hierarchy / Inspector / Material tabs */}
        <TabRow tabs={['Hierarchy', 'Inspector', 'Material']} active={hierTab} setActive={setHierTab} />

        {/* Search */}
        <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--bd)', flexShrink: 0 }}>
          <input placeholder="🔍 Search..." style={{
            width: '100%', background: 'var(--p3)', border: '1px solid var(--bd)',
            borderRadius: 4, color: 'var(--txt)', padding: '4px 8px', fontSize: 10.5,
          }} />
        </div>

        {/* Hierarchy tree */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
          {TREE.map(node => (
            <div key={node.id} onClick={() => {}} style={{
              display: 'flex', alignItems: 'center',
              padding: '2px 8px 2px',
              paddingLeft: 8 + node.depth * 10,
              background: node.selected ? 'var(--sel)' : 'transparent',
              cursor: 'pointer', fontSize: 10.5,
              color: node.selected ? '#fff' : 'var(--txt)',
            }}>
              {node.open !== undefined ? (
                <span style={{ marginRight: 4, color: 'var(--t3)', fontSize: 9 }}>{node.open ? '▼' : '▶'}</span>
              ) : (
                <span style={{ marginRight: 4, width: 9, display: 'inline-block' }} />
              )}
              <span style={{ marginRight: 4, color: node.selected ? '#4a90d9' : 'var(--pink)', fontSize: 9 }}>◆</span>
              <span>{node.label}</span>
              <div style={{ flex: 1 }} />
              <span style={{ color: 'var(--t3)', fontSize: 10 }}>👁</span>
            </div>
          ))}
        </div>

        {/* Transform */}
        <PanelSection title="Transform">
          <XYZRow label="Position" values={['0.000', '0.000', '0.000']} />
          <XYZRow label="Rotation" values={['0.000', '0.000', '0.000']} />
          <XYZRow label="Scale" values={['1.000', '1.000', '1.000']} />
        </PanelSection>

        {/* Part Info */}
        <PanelSection title="Part Info">
          <InfoRow label="Name" value="Hand_L" />
          <InfoRow label="Type" value="Hand (Left)" />
          <InfoRow label="Vertices" value="6,245" />
          <InfoRow label="Triangles" value="12,480" />
          <InfoRow label="Rigged" value="Yes" />
          <InfoRow label="Skinned" value="Yes" />
          <InfoRow label="Attach To" value="wrist_l" />
          <Btn full style={{ marginTop: 4 }}>Edit Part Rig</Btn>
        </PanelSection>

        {/* Skin Weights */}
        <PanelSection title="Skin Weights">
          <Check checked label="Auto Normalize" />
          <Btn full>Clean Weights</Btn>
        </PanelSection>

        {/* Mirror Tool */}
        <PanelSection title="Mirror Tool">
          <div style={{ marginBottom: 4, fontSize: 10.5, color: 'var(--t2)' }}>Axis</div>
          <select style={{ width: '100%', background: 'var(--p3)', border: '1px solid var(--bd)', color: 'var(--txt)', borderRadius: 4, padding: '3px 6px', marginBottom: 6, fontSize: 10.5 }}>
            <option>X (Left ↔ Right)</option>
            <option>Y (Up ↔ Down)</option>
            <option>Z (Front ↔ Back)</option>
          </select>
          <Btn full>Mirror to Right</Btn>
        </PanelSection>

        {/* Actions */}
        <PanelSection title="Actions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Btn full>Detach</Btn>
            <Btn full>Reset Transform</Btn>
            <Btn full red>Remove Part</Btn>
          </div>
        </PanelSection>

        {/* Export Character */}
        <div style={{ borderTop: '1px solid var(--bd)', padding: 8, flexShrink: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 10.5, color: 'var(--t2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Export Character</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ color: 'var(--t2)', fontSize: 10.5 }}>Format</span>
            <select style={{ flex: 1, background: 'var(--p3)', border: '1px solid var(--bd)', color: 'var(--txt)', borderRadius: 4, padding: '2px 4px', fontSize: 10.5 }}>
              <option>FBX (Unity)</option>
              <option>FBX (Unreal)</option>
              <option>GLB</option>
              <option>OBJ</option>
            </select>
          </div>
          <Check checked label="Include Textures" />
          <Check label="Embed Materials" />
          <Btn full pink style={{ marginTop: 6 }}>Export Character</Btn>
        </div>
      </div>
    </div>
  )
}
