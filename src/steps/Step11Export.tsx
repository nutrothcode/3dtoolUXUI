import { useState } from 'react'
import { Btn, Check, PanelLabel } from '../components/shared'

export default function Step11Export() {
  const [format, setFormat] = useState('FBX (Unity)')
  const [speed, setSpeed] = useState('1.0x')
  const [exporting, setExporting] = useState(false)
  const [done, setDone] = useState(false)

  const handleExport = () => {
    setExporting(true)
    setTimeout(() => { setExporting(false); setDone(true) }, 2000)
  }

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* LEFT - Export Options */}
      <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderRight: '1px solid var(--bd)' }}>
        <PanelLabel>Export Options</PanelLabel>
        <div style={{ flex: 1, padding: 10, overflow: 'hidden' }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10.5, color: 'var(--t2)', marginBottom: 4 }}>Format</div>
            <select defaultValue={format} onChange={e => setFormat(e.target.value)} style={{ width: '100%', background: 'var(--p3)', border: '1px solid var(--bd)', color: 'var(--txt)', borderRadius: 4, padding: '4px 6px', fontSize: 10.5 }}>
              <option>FBX (Unity)</option>
              <option>FBX (Unreal)</option>
              <option>GLB / GLTF</option>
              <option>OBJ + MTL</option>
            </select>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10.5, color: 'var(--t2)', marginBottom: 4 }}>Speed</div>
            <select defaultValue={speed} onChange={e => setSpeed(e.target.value)} style={{ width: '100%', background: 'var(--p3)', border: '1px solid var(--bd)', color: 'var(--txt)', borderRadius: 4, padding: '4px 6px', fontSize: 10.5 }}>
              <option>1.0x</option><option>0.5x</option><option>2.0x</option>
            </select>
          </div>
          <div style={{ marginBottom: 6 }}>
            <Check label="Loop" />
            <Check label="Add Keyframe" />
          </div>
          <div style={{ borderTop: '1px solid var(--bd)', paddingTop: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--t2)', marginBottom: 6, textTransform: 'uppercase' }}>Include</div>
            <Check checked label="Include Mesh" />
            <Check checked label="Include Skeleton" />
            <Check checked label="Include Rig" />
            <Check checked label="Include Blend Shapes" />
            <Check label="Include Metanubs" />
            <Check checked label="Include Animations" />
          </div>
        </div>
        <div style={{ padding: 8, borderTop: '1px solid var(--bd)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 9.5, color: 'var(--t3)', textAlign: 'center' }}>Apply Transform</div>
          <div style={{ fontSize: 9.5, color: 'var(--t3)', textAlign: 'center' }}>Meter (1.0)</div>
        </div>
      </div>

      {/* CENTER */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #0e1220, #090b12)', overflow: 'hidden' }}>
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', backgroundImage: 'linear-gradient(var(--bd) 1px, transparent 1px), linear-gradient(90deg, var(--bd) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3, transform: 'perspective(400px) rotateX(60deg)', transformOrigin: 'bottom center' }} />
          {/* Final clothed character */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <svg width="180" height="380" viewBox="0 0 180 380">
              <ellipse cx="90" cy="20" rx="22" ry="26" fill="#c8a882" />
              <ellipse cx="90" cy="6" rx="24" ry="18" fill="#2a1a08" />
              <path d="M 58 52 Q 90 40 122 52 L 128 155 Q 106 168 90 170 Q 74 168 52 155 Z" fill="#3a3a4a" opacity="0.95" />
              <path d="M 58 155 Q 50 168 26 173 L 12 188 L 6 220" fill="none" stroke="#3a3a4a" strokeWidth="16" strokeLinecap="round" opacity="0.95" />
              <path d="M 122 155 Q 130 168 154 173 L 168 188 L 174 220" fill="none" stroke="#3a3a4a" strokeWidth="16" strokeLinecap="round" opacity="0.95" />
              <path d="M 62 168 Q 56 245 52 325 L 54 370" fill="none" stroke="#2a3050" strokeWidth="22" strokeLinecap="round" opacity="0.95" />
              <path d="M 118 168 Q 124 245 128 325 L 126 370" fill="none" stroke="#2a3050" strokeWidth="22" strokeLinecap="round" opacity="0.95" />
              <ellipse cx="54" cy="373" rx="14" ry="7" fill="#1a1a1a" />
              <ellipse cx="126" cy="373" rx="14" ry="7" fill="#1a1a1a" />
              {/* Hands */}
              <circle cx="6" cy="227" r="9" fill="#c8a882" opacity="0.9" />
              <circle cx="174" cy="227" r="9" fill="#c8a882" opacity="0.9" />
              {done && <circle cx="90" cy="185" r="120" fill="none" stroke="#27c96a" strokeWidth="1" strokeDasharray="6,4" opacity="0.4" />}
            </svg>
            {done && (
              <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(39,201,106,0.15)', border: '1px solid var(--grn)', borderRadius: 8, padding: '6px 12px', whiteSpace: 'nowrap', fontSize: 11, color: 'var(--grn)', fontWeight: 600 }}>
                ✓ Export Complete
              </div>
            )}
          </div>
        </div>
        {/* Bottom action bar */}
        <div style={{ height: 60, flexShrink: 0, background: 'var(--p2)', borderTop: '1px solid var(--bd)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10 }}>
          {exporting && (
            <div style={{ flex: 1, height: 4, background: 'var(--p3)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: '60%', background: 'var(--pink)', borderRadius: 2, transition: 'width 2s' }} />
            </div>
          )}
          <div style={{ flex: 1 }} />
          <Btn>Open Output Folder</Btn>
          <Btn pink onClick={handleExport} style={{ minWidth: 140 }}>
            {exporting ? 'Exporting...' : 'Export Character'}
          </Btn>
        </div>
      </div>

      {/* RIGHT - Export Summary */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderLeft: '1px solid var(--bd)' }}>
        <PanelLabel>Export Summary</PanelLabel>
        <div style={{ flex: 1, padding: 10 }}>
          {[
            { label: 'Meshes', val: '8' },
            { label: 'Materials', val: '6' },
            { label: 'Textures', val: '24' },
            { label: 'Animations', val: '12' },
            { label: 'Blend Shapes', val: '52' },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--bd)', fontSize: 11 }}>
              <span style={{ color: 'var(--t2)' }}>{r.label}</span>
              <span style={{ color: 'var(--txt)', fontWeight: 700 }}>{r.val}</span>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--t2)', marginBottom: 6 }}>Output Size</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>~142 MB</div>
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 10, color: 'var(--t2)', marginBottom: 6 }}>Format</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--pink)' }}>{format}</div>
          </div>
        </div>
        <div style={{ padding: 8, borderTop: '1px solid var(--bd)', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Btn full pink onClick={handleExport}>{exporting ? 'Exporting...' : 'Export Character'}</Btn>
            <Btn full>Open Output Folder</Btn>
          </div>
        </div>
      </div>
    </div>
  )
}
