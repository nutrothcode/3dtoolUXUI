import { useState } from 'react'
import { Btn, Check, PanelLabel } from '../components/shared'

const BAKE_MAPS = ['Base Color', 'Normal', 'Glossiness', 'Metallic', 'AO', 'Opacity', 'Subsurface']
const TEXTURE_SIZES = ['4K (4096)', '2K (2048)', '1K (1024)', '8K (8192)']

const MAT_CHANNELS: { label: string; bg: string }[] = [
  { label: 'Base Color', bg: 'linear-gradient(135deg, #c8a882, #a07850)' },
  { label: 'Normal', bg: 'linear-gradient(135deg, #6080ff, #8060c0)' },
  { label: 'Roughness', bg: 'linear-gradient(135deg, #404040, #808080)' },
  { label: 'AO', bg: 'linear-gradient(135deg, #101010, #404040)' },
]

export default function Step09Texture() {
  const [selectedMaps, setSelectedMaps] = useState<string[]>(['Base Color', 'Normal', 'AO'])
  const [texSize, setTexSize] = useState('4K (4096)')
  const [baking, setBaking] = useState(false)

  const toggleMap = (m: string) => setSelectedMaps(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* LEFT */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderRight: '1px solid var(--bd)' }}>
        <PanelLabel>Texture Tools</PanelLabel>
        <div style={{ flex: 1, padding: 8, overflow: 'hidden' }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--t2)', marginBottom: 6, textTransform: 'uppercase' }}>Bake Maps</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 10 }}>
            {BAKE_MAPS.map(m => (
              <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 10.5 }}>
                <input type="checkbox" checked={selectedMaps.includes(m)} onChange={() => toggleMap(m)} style={{ accentColor: 'var(--pink)', width: 12, height: 12 }} />
                <span style={{ color: 'var(--txt)' }}>{m}</span>
              </label>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--bd)', paddingTop: 8 }}>
            <div style={{ fontSize: 10, color: 'var(--t2)', marginBottom: 4 }}>Texture Size</div>
            {TEXTURE_SIZES.map(s => (
              <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, cursor: 'pointer', fontSize: 10.5 }}>
                <input type="radio" name="texsize" checked={texSize === s} onChange={() => setTexSize(s)} style={{ accentColor: 'var(--pink)' }} />
                <span style={{ color: 'var(--txt)' }}>{s}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{ padding: 8, borderTop: '1px solid var(--bd)', flexShrink: 0 }}>
          <Btn full pink onClick={() => { setBaking(true); setTimeout(() => setBaking(false), 2000) }}>
            {baking ? 'Baking...' : 'Bake'}
          </Btn>
        </div>
      </div>

      {/* CENTER - character head/face preview */}
      <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(180deg, #0e1220, #090b12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {baking && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--p3)', zIndex: 10 }}>
            <div style={{ height: '100%', background: 'var(--pink)', borderRadius: 2, animation: 'bakeProgress 2s linear forwards' }} className="bake-bar" />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          {/* Head close-up */}
          <svg width="240" height="280" viewBox="0 0 240 280">
            <ellipse cx="120" cy="130" rx="95" ry="115" fill="#c8a882" />
            <ellipse cx="120" cy="50" rx="100" ry="65" fill="#2a1a08" />
            <ellipse cx="90" cy="115" rx="16" ry="10" fill="#fff" /><ellipse cx="150" cy="115" rx="16" ry="10" fill="#fff" />
            <circle cx="95" cy="115" r="6" fill="#3a2010" /><circle cx="155" cy="115" r="6" fill="#3a2010" />
            <path d="M 120 130 Q 108 158 104 170 Q 114 178 136 170 Q 132 158 120 130" fill="#b89070" opacity="0.6" />
            <path d="M 96 200 Q 120 212 144 200" fill="none" stroke="#8a5040" strokeWidth="2.5" />
            <ellipse cx="90" cy="100" rx="18" ry="6" fill="none" stroke="#8a6040" strokeWidth="1" opacity="0.5" />
            <ellipse cx="150" cy="100" rx="18" ry="6" fill="none" stroke="#8a6040" strokeWidth="1" opacity="0.5" />
          </svg>
          {/* Texture preview strips */}
          <div style={{ display: 'flex', gap: 8 }}>
            {MAT_CHANNELS.slice(0, 3).map(ch => (
              <div key={ch.label} style={{ textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: 4, background: ch.bg, border: '1px solid var(--bd)', marginBottom: 3 }} />
                <div style={{ fontSize: 9, color: 'var(--t2)' }}>{ch.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT - Material Preview */}
      <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderLeft: '1px solid var(--bd)', overflow: 'hidden' }}>
        <PanelLabel>Material Preview</PanelLabel>
        {/* Sphere + mat name */}
        <div style={{ padding: 10, borderBottom: '1px solid var(--bd)', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #e0c090, #a07040, #503020)', flexShrink: 0, border: '1px solid var(--bd)' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 11, color: 'var(--txt)' }}>Skin_MAT</div>
              <div style={{ fontSize: 10, color: 'var(--t2)', marginTop: 2 }}>PBR Material</div>
            </div>
          </div>
          {[{ label: 'Base Color', val: '1.0' }, { label: 'Roughness', val: '0.5' }, { label: 'Metallic', val: '0.0' }].map(p => (
            <div key={p.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 10.5 }}>
              <span style={{ color: 'var(--t2)' }}>{p.label}</span>
              <span style={{ color: 'var(--txt)' }}>{p.val}</span>
            </div>
          ))}
        </div>
        {/* Texture maps */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
          {MAT_CHANNELS.map(ch => (
            <div key={ch.label} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, padding: '6px 0', borderBottom: '1px solid var(--bd)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 4, background: ch.bg, flexShrink: 0, border: '1px solid var(--bd)' }} />
              <div>
                <div style={{ fontSize: 10.5, color: 'var(--txt)', fontWeight: 500 }}>{ch.label}</div>
                <div style={{ fontSize: 9, color: 'var(--t3)' }}>4K — PNG</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 8, borderTop: '1px solid var(--bd)', flexShrink: 0 }}>
          <Btn full pink>Apply to Model</Btn>
        </div>
      </div>
    </div>
  )
}
