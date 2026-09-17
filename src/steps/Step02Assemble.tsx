import { useState } from 'react'
import { PanelSection, XYZRow, Btn, Check, TabRow, PanelLabel } from '../components/shared'

const CHAR_PARTS = [
  { name: 'Body_Base', color: '#e91e8c', verts: '52,341', tris: '104,682' },
  { name: 'Head_01', color: '#4a90d9', verts: '18,450', tris: '36,900' },
  { name: 'Hand_L', color: '#27c96a', verts: '6,245', tris: '12,480' },
  { name: 'Hand_R', color: '#27c96a', verts: '6,245', tris: '12,480' },
  { name: 'Foot_L', color: '#f0c040', verts: '4,120', tris: '8,240' },
  { name: 'Hair_01', color: '#a040c0', verts: '12,800', tris: '25,600' },
  { name: 'Underwear', color: '#6080a0', verts: '3,200', tris: '6,400' },
]

export default function Step02Assemble() {
  const [viewTab, setViewTab] = useState('Viewport')
  const [selected, setSelected] = useState('Body_Base')

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* LEFT - Part Library */}
      <div style={{ width: 270, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderRight: '1px solid var(--bd)' }}>
        <TabRow tabs={['Part Library', 'My Assets', 'Project']} active="Part Library" setActive={() => {}} />
        <div style={{ display: 'flex', gap: 2, padding: '6px 8px 4px', flexShrink: 0 }}>
          {['All', 'Body', 'Head', 'Hand', 'Foot', 'Hair', 'Clothing'].map(t => (
            <button key={t} style={{ padding: '2px 6px', border: '1px solid var(--bd)', borderRadius: 4, background: 'var(--p3)', color: 'var(--t2)', fontSize: 9.5, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, padding: '4px 8px', alignContent: 'start' }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{ borderRadius: 6, border: '1px solid var(--bd)', background: 'var(--p3)', overflow: 'hidden' }}>
              <div style={{ height: 64, background: `radial-gradient(ellipse, #${['2a3a4a','3a2a2a','2a3a3a','30303c'][i%4]}ee, #0a0c14)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                {['🧍','🗣','✋','🦶','💇','👕'][i % 6]}
              </div>
              <div style={{ padding: '2px 4px', fontSize: 9, color: 'var(--t2)', textAlign: 'center' }}>Part {i + 1}</div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--bd)', padding: 8, flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <Btn full>Import</Btn>
            <Btn full>Replace</Btn>
            <Btn full red>Remove</Btn>
          </div>
        </div>
      </div>

      {/* CENTER */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--p2)', borderBottom: '1px solid var(--bd)', height: 34, flexShrink: 0 }}>
          <TabRow tabs={['Viewport', '2D Preview', 'Render Preview']} active={viewTab} setActive={setViewTab} />
        </div>
        <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(180deg, #0e1220 0%, #090b12 70%)' }}>
          {/* Grid floor */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', backgroundImage: 'linear-gradient(var(--bd) 1px, transparent 1px), linear-gradient(90deg, var(--bd) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.35, transform: 'perspective(400px) rotateX(60deg)', transformOrigin: 'bottom center' }} />
          {/* Assembled character */}
          <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="200" height="420" viewBox="0 0 200 420">
              {/* Full body assembled */}
              <ellipse cx="100" cy="20" rx="22" ry="26" fill="#c8a882" />
              <path d="M 65 55 Q 100 42 135 55 L 140 160 Q 115 175 100 178 Q 85 175 60 160 Z" fill="#d4a882" opacity="0.8" />
              <path d="M 65 160 Q 58 175 32 180 L 18 195 L 10 230 Q 16 234 28 224 L 42 260 L 48 270" fill="none" stroke="#d4a882" strokeWidth="16" strokeLinecap="round" opacity="0.8" />
              <path d="M 135 160 Q 142 175 168 180 L 182 195 L 190 230" fill="none" stroke="#d4a882" strokeWidth="16" strokeLinecap="round" opacity="0.8" />
              <path d="M 68 178 Q 62 250 58 340 L 60 400" fill="none" stroke="#4a6a9a" strokeWidth="22" strokeLinecap="round" opacity="0.8" />
              <path d="M 132 178 Q 138 250 142 340 L 140 400" fill="none" stroke="#4a6a9a" strokeWidth="22" strokeLinecap="round" opacity="0.8" />
              {/* Hair */}
              <ellipse cx="100" cy="10" rx="24" ry="18" fill="#2a1a08" />
              {/* Snap indicator */}
              <circle cx="100" cy="46" r="6" fill="none" stroke="#e91e8c" strokeWidth="2" strokeDasharray="3,2" />
              <circle cx="65" cy="160" r="6" fill="none" stroke="#4a90d9" strokeWidth="2" strokeDasharray="3,2" />
            </svg>
          </div>
          {/* Gizmo */}
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <svg width="55" height="55" viewBox="0 0 55 55">
              <line x1="27" y1="27" x2="27" y2="5" stroke="#50c060" strokeWidth="2" /><text x="25" y="13" fill="#50c060" fontSize="8" fontWeight="700">Y</text>
              <line x1="27" y1="27" x2="50" y2="42" stroke="#e05050" strokeWidth="2" /><text x="46" y="48" fill="#e05050" fontSize="8" fontWeight="700">X</text>
              <line x1="27" y1="27" x2="4" y2="42" stroke="#5090e0" strokeWidth="2" /><text x="1" y="48" fill="#5090e0" fontSize="8" fontWeight="700">Z</text>
            </svg>
          </div>
        </div>
        {/* Bottom controls */}
        <div style={{ height: 50, flexShrink: 0, background: 'var(--p2)', borderTop: '1px solid var(--bd)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 12 }}>
          <Check checked label="Auto Fit to Body" />
          <Check checked label="Snap to Joint" />
          <Check label="Mirror Left → Right" />
          <div style={{ flex: 1 }} />
          <span style={{ color: 'var(--t2)', fontSize: 10.5 }}>Auto Rotate</span>
          <Check checked label="" />
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderLeft: '1px solid var(--bd)', overflow: 'hidden' }}>
        <PanelLabel>Character Parts</PanelLabel>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {CHAR_PARTS.map(p => (
            <div key={p.name} onClick={() => setSelected(p.name)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px',
              background: selected === p.name ? 'var(--sel)' : 'transparent',
              borderBottom: '1px solid var(--bd)', cursor: 'pointer',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
              <span style={{ fontSize: 10.5, color: 'var(--txt)' }}>{p.name}</span>
              <div style={{ flex: 1 }} />
              <span style={{ color: 'var(--t3)', fontSize: 9 }}>👁</span>
            </div>
          ))}
          <div style={{ padding: 8 }}>
            <Btn full pink>+ Add Part</Btn>
          </div>
        </div>
        <PanelSection title="Transform">
          <XYZRow label="Position" values={['0.000', '0.000', '0.000']} />
          <XYZRow label="Rotation" values={['0.000', '0.000', '0.000']} />
          <XYZRow label="Scale" values={['1.000', '1.000', '1.000']} />
        </PanelSection>
        <div style={{ padding: 8, borderTop: '1px solid var(--bd)', display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
          <Btn full>Auto Fit</Btn>
          <Btn full>Snap to Joints</Btn>
          <Btn full red>Remove Part</Btn>
        </div>
      </div>
    </div>
  )
}
