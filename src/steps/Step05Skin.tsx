import { useState } from 'react'
import { Btn, Check, TabRow, PanelLabel } from '../components/shared'

const SKIN_TOOLS = ['Weight Paint', 'Smooth Weights', 'Normalize', 'Clean Weights', 'Prune', 'Mirror Weights', 'Transfer Weights', 'Auto Skin', 'Lock Selected']
const DEFORM_TESTS = ['Shoulder', 'Elbow', 'Wrist', 'Finger', 'Hip', 'Knee', 'Foot', 'Face']

const FACE_HIER = [
  { label: 'head', d: 0 }, { label: 'jaw', d: 1 }, { label: 'eye_l', d: 1 },
  { label: 'eye_r', d: 1 }, { label: 'eyelid_l', d: 2 }, { label: 'brow_l', d: 2 },
  { label: 'brow_r', d: 2 }, { label: 'cheek_r', d: 2 }, { label: 'nose', d: 2 },
  { label: 'upperlip', d: 2 }, { label: 'lowerlip', d: 2 }, { label: 'mouth_corner_l', d: 2 },
]

export default function Step05Skin() {
  const [activeTool, setActiveTool] = useState('Weight Paint')

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* LEFT */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderRight: '1px solid var(--bd)' }}>
        <PanelLabel>Skin Tools</PanelLabel>
        <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {SKIN_TOOLS.map(t => (
            <button key={t} onClick={() => setActiveTool(t)} style={{
              padding: '5px 10px', border: `1px solid ${activeTool === t ? 'var(--pink)' : 'var(--bd)'}`,
              borderRadius: 4, background: activeTool === t ? 'var(--pink-lo)' : 'var(--p3)',
              color: activeTool === t ? 'var(--pink)' : 'var(--txt)', fontSize: 10.5, cursor: 'pointer', textAlign: 'left',
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* CENTER - Weight visualization */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #0e1220 0%, #090b12 100%)' }}>
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Character with weight map colors */}
          <svg width="220" height="420" viewBox="0 0 220 420">
            {/* Body with heat map coloring */}
            <defs>
              <radialGradient id="headGrad" cx="50%" cy="40%"><stop offset="0%" stopColor="#ff0000"/><stop offset="100%" stopColor="#ff6000"/></radialGradient>
              <radialGradient id="torsoGrad" cx="50%" cy="50%"><stop offset="0%" stopColor="#00cc00"/><stop offset="100%" stopColor="#00ff80"/></radialGradient>
              <radialGradient id="armGrad" cx="50%" cy="50%"><stop offset="0%" stopColor="#0060ff"/><stop offset="100%" stopColor="#00ccff"/></radialGradient>
              <radialGradient id="legGrad" cx="50%" cy="50%"><stop offset="0%" stopColor="#8000ff"/><stop offset="100%" stopColor="#cc00ff"/></radialGradient>
            </defs>
            <ellipse cx="110" cy="22" rx="22" ry="26" fill="url(#headGrad)" opacity="0.85" />
            <path d="M 75 58 Q 110 45 145 58 L 150 165 Q 125 178 110 180 Q 95 178 70 165 Z" fill="url(#torsoGrad)" opacity="0.75" />
            <path d="M 75 165 Q 68 180 42 185 L 28 200 L 20 240 Q 26 244 38 234 L 52 265" fill="none" stroke="url(#armGrad)" strokeWidth="16" strokeLinecap="round" opacity="0.8" />
            <path d="M 145 165 Q 152 180 178 185 L 192 200 L 200 240" fill="none" stroke="url(#armGrad)" strokeWidth="16" strokeLinecap="round" opacity="0.8" />
            <path d="M 82 180 Q 76 260 72 350 L 74 410" fill="none" stroke="url(#legGrad)" strokeWidth="24" strokeLinecap="round" opacity="0.8" />
            <path d="M 138 180 Q 144 260 148 350 L 146 410" fill="none" stroke="url(#legGrad)" strokeWidth="24" strokeLinecap="round" opacity="0.8" />
          </svg>
          {/* Weight legend */}
          <div style={{ position: 'absolute', right: 12, top: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{ width: 14, height: 120, background: 'linear-gradient(to bottom, #ff0000, #ffaa00, #00ff00, #0000ff)', borderRadius: 3 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 4 }}>
              {['1.0', '0.75', '0.5', '0.25', '0.0'].map(v => (
                <div key={v} style={{ fontSize: 9, color: 'var(--t2)', lineHeight: '24px' }}>{v}</div>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom deformation test */}
        <div style={{ height: 50, flexShrink: 0, background: 'var(--p2)', borderTop: '1px solid var(--bd)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6 }}>
          <span style={{ fontSize: 10.5, color: 'var(--t2)', marginRight: 4 }}>Deformation Test</span>
          {DEFORM_TESTS.map(t => (
            <button key={t} style={{ padding: '3px 8px', border: '1px solid var(--bd)', borderRadius: 4, background: 'var(--p4)', color: 'var(--txt)', fontSize: 10, cursor: 'pointer' }}>{t}</button>
          ))}
          <div style={{ flex: 1 }} />
          <Btn>Pack Role</Btn>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderLeft: '1px solid var(--bd)', overflow: 'hidden' }}>
        <TabRow tabs={['Face Hierarchy']} active="Face Hierarchy" setActive={() => {}} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
          {FACE_HIER.map((n, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '2px 8px', paddingLeft: 8 + n.d * 12, fontSize: 10.5, color: 'var(--txt)', cursor: 'pointer' }}>
              <span style={{ marginRight: 4, color: 'var(--pink)', fontSize: 9 }}>◆</span>
              {n.label}
              <div style={{ flex: 1 }} /><span style={{ color: 'var(--t3)', fontSize: 10 }}>👁</span>
            </div>
          ))}
        </div>
        {/* Weight settings */}
        <div style={{ borderTop: '1px solid var(--bd)', padding: 10, flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--t2)', marginBottom: 8, textTransform: 'uppercase' }}>Weight Settings</div>
          {[{ label: 'Brush Size', val: '50' }, { label: 'Brush Strength', val: '1.0' }].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 10.5, color: 'var(--t2)' }}>{s.label}</span>
              <input defaultValue={s.val} style={{ width: 50, background: 'var(--p3)', border: '1px solid var(--bd)', borderRadius: 3, color: 'var(--txt)', padding: '2px 4px', fontSize: 10.5, textAlign: 'right' }} />
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 10.5, color: 'var(--t2)' }}>Falloff</span>
            <select style={{ background: 'var(--p3)', border: '1px solid var(--bd)', color: 'var(--txt)', borderRadius: 4, padding: '2px 4px', fontSize: 10.5 }}>
              <option>Smooth</option><option>Linear</option><option>Constant</option>
            </select>
          </div>
          <Check checked label="Auto Normalize" />
          <Check checked label="Show Mesh" />
          <Check label="Show Bones" />
          <Check label="Show Weights" />
        </div>
      </div>
    </div>
  )
}
