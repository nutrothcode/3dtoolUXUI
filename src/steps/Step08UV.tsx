import { useState } from 'react'
import { Btn, Check, PanelLabel, TabRow } from '../components/shared'

const UV_TOOLS = ['Auto Unwrap', 'Mark Seam', 'Clear Seam', 'Pack Islands', 'Test Density', 'Check Overlap', 'Check Stretch']
const UV_PRESETS = ['2K (2048)', '4K (4096)', '1K (1024)', '8K (8192)']

export default function Step08UV() {
  const [uvTab, setUvTab] = useState('UV View')
  const [preset, setPreset] = useState('2K (2048)')
  const [activeTool, setActiveTool] = useState('Auto Unwrap')

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* LEFT */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderRight: '1px solid var(--bd)' }}>
        <PanelLabel>UV Tools</PanelLabel>
        <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {UV_TOOLS.map(t => (
            <button key={t} onClick={() => setActiveTool(t)} style={{
              padding: '5px 10px', border: `1px solid ${activeTool === t ? 'var(--pink)' : 'var(--bd)'}`,
              borderRadius: 4, background: activeTool === t ? 'var(--pink-lo)' : 'var(--p3)',
              color: activeTool === t ? 'var(--pink)' : 'var(--txt)', fontSize: 10.5, cursor: 'pointer', textAlign: 'left',
            }}>{t}</button>
          ))}
          <div style={{ borderTop: '1px solid var(--bd)', marginTop: 4, paddingTop: 8 }}>
            <div style={{ fontSize: 10, color: 'var(--t2)', marginBottom: 4 }}>UV Presets</div>
            {UV_PRESETS.map(p => (
              <label key={p} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, cursor: 'pointer', fontSize: 10.5 }}>
                <input type="radio" name="uvpreset" checked={preset === p} onChange={() => setPreset(p)} style={{ accentColor: 'var(--pink)' }} />
                <span style={{ color: 'var(--txt)' }}>{p}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{ padding: 8, borderTop: '1px solid var(--bd)', flexShrink: 0 }}>
          <Btn full pink>Pack UV</Btn>
        </div>
      </div>

      {/* CENTER - UV View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--p2)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--bd)', height: 34, flexShrink: 0, padding: '0 8px' }}>
          <TabRow tabs={['3D View', 'UV View']} active={uvTab} setActive={setUvTab} />
        </div>
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0c12' }}>
          {/* UV grid background */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(50,50,70,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(50,50,70,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          {/* UV islands */}
          <svg width="420" height="420" viewBox="0 0 420 420" style={{ position: 'relative' }}>
            {/* UV checker-like patterns */}
            <rect x="0" y="0" width="420" height="420" fill="none" stroke="#2a2d3e" strokeWidth="2" />
            {/* Head UV island */}
            <g fill="rgba(74,144,217,0.2)" stroke="#4a90d9" strokeWidth="1">
              <ellipse cx="80" cy="80" rx="65" ry="65" />
              <ellipse cx="80" cy="80" rx="45" ry="50" fill="none" stroke="#4a90d9" strokeWidth="0.5" />
              <ellipse cx="80" cy="80" rx="25" ry="30" fill="none" stroke="#4a90d9" strokeWidth="0.5" />
            </g>
            {/* Body UV island */}
            <g fill="rgba(233,30,140,0.15)" stroke="#e91e8c" strokeWidth="1">
              <rect x="160" y="20" width="100" height="140" rx="4" />
              <line x1="210" y1="20" x2="210" y2="160" stroke="#e91e8c" strokeWidth="0.5" strokeDasharray="4,4" />
              <line x1="160" y1="80" x2="260" y2="80" stroke="#e91e8c" strokeWidth="0.5" strokeDasharray="4,4" />
            </g>
            {/* Hand UV islands */}
            <g fill="rgba(39,201,106,0.15)" stroke="#27c96a" strokeWidth="1">
              <rect x="290" y="30" width="60" height="80" rx="3" />
              <rect x="360" y="30" width="55" height="80" rx="3" />
            </g>
            {/* Leg UV islands */}
            <g fill="rgba(240,192,64,0.15)" stroke="#f0c040" strokeWidth="1">
              <rect x="20" y="175" width="50" height="200" rx="3" />
              <rect x="80" y="175" width="50" height="200" rx="3" />
            </g>
            {/* Foot UV */}
            <g fill="rgba(128,96,192,0.15)" stroke="#8060c0" strokeWidth="1">
              <rect x="145" y="185" width="70" height="45" rx="3" />
              <rect x="145" y="240" width="70" height="45" rx="3" />
            </g>
            {/* Arm UV */}
            <g fill="rgba(74,144,217,0.1)" stroke="#4a90d9" strokeWidth="0.8">
              <rect x="230" y="190" width="40" height="120" rx="3" />
              <rect x="280" y="190" width="40" height="120" rx="3" />
            </g>
            {/* Labels */}
            <text x="80" y="83" textAnchor="middle" fill="#4a90d9" fontSize="9" fontWeight="600">Head UV</text>
            <text x="210" y="92" textAnchor="middle" fill="#e91e8c" fontSize="9" fontWeight="600">Body UV</text>
            <text x="45" y="280" textAnchor="middle" fill="#f0c040" fontSize="8">Leg L</text>
            <text x="105" y="280" textAnchor="middle" fill="#f0c040" fontSize="8">Leg R</text>
          </svg>
        </div>
      </div>

      {/* RIGHT - UV Settings */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderLeft: '1px solid var(--bd)' }}>
        <PanelLabel>UV Settings</PanelLabel>
        <div style={{ padding: 10, flex: 1, overflow: 'hidden' }}>
          {[{ label: 'Island Margin', val: '0.02' }, { label: 'Texel Density', val: '512' }].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 10.5, color: 'var(--t2)' }}>{s.label}</span>
              <input defaultValue={s.val} style={{ width: 55, background: 'var(--p3)', border: '1px solid var(--bd)', borderRadius: 3, color: 'var(--txt)', padding: '2px 4px', fontSize: 10.5, textAlign: 'right' }} />
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--bd)', paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Check checked label="Show Checker" />
            <Check checked label="Show Rig" />
            <Check label="Show Islands" />
            <Check label="Show Stretch" />
          </div>
        </div>
        <div style={{ padding: 8, borderTop: '1px solid var(--bd)', flexShrink: 0 }}>
          <Btn full pink>Pack UV</Btn>
        </div>
      </div>
    </div>
  )
}
