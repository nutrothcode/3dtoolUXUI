import { useState } from 'react'
import { Btn, Check, PanelLabel } from '../components/shared'

export default function Step07Retopology() {
  const [polycount, setPolycount] = useState('Medium (30K)')
  const [generated, setGenerated] = useState(false)

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* LEFT */}
      <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderRight: '1px solid var(--bd)' }}>
        <PanelLabel>Retopology Tools</PanelLabel>
        <div style={{ flex: 1, padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Check checked label="Auto Retopology" />
          <div style={{ borderTop: '1px solid var(--bd)', paddingTop: 8 }}>
            <div style={{ fontSize: 10, color: 'var(--t2)', marginBottom: 6, fontWeight: 600 }}>TARGET POLYCOUNT</div>
            {['Low (10K)', 'Medium (30K)', 'High (60K)', 'Custom'].map(opt => (
              <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, cursor: 'pointer', fontSize: 10.5 }}>
                <input type="radio" name="poly" checked={polycount === opt} onChange={() => setPolycount(opt)} style={{ accentColor: 'var(--pink)' }} />
                <span style={{ color: 'var(--txt)' }}>{opt}</span>
              </label>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--bd)', paddingTop: 8 }}>
            <Check label="Unit" />
            <Check checked label="Preserve Face" />
            <Check checked label="Preserve Fingers" />
            <Check checked label="Preserve Joints" />
          </div>
          <div style={{ flex: 1 }} />
          <Btn full pink onClick={() => setGenerated(true)}>Generate</Btn>
        </div>
        <div style={{ borderTop: '1px solid var(--bd)', padding: 10, flexShrink: 0, fontSize: 10.5, color: 'var(--t2)' }}>
          <div>Before: <span style={{ color: 'var(--txt)' }}>245,321 tris</span></div>
          <div>After: <span style={{ color: generated ? 'var(--grn)' : 'var(--t2)' }}>{generated ? '24,612 tris' : '—'}</span></div>
        </div>
      </div>

      {/* CENTER - Before/After comparison */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #0e1220 0%, #090b12 100%)', overflow: 'hidden' }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--bd)', fontSize: 10.5, color: 'var(--t2)', background: 'var(--p2)', flexShrink: 0, display: 'flex', gap: 8 }}>
          <Check checked label="Wireframe" />
          <Check label="Shaded" />
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, padding: 16 }}>
          {/* Before */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--t2)', marginBottom: 8 }}>Before</div>
            <svg width="160" height="280" viewBox="0 0 160 280">
              {/* Dense wireframe mesh */}
              <g stroke="#4a90d9" strokeWidth="0.3" fill="none" opacity="0.6">
                {[...Array(30)].map((_, i) => (
                  <line key={`h${i}`} x1="20" y1={10 + i * 8.5} x2="140" y2={10 + i * 8.5} />
                ))}
                {[...Array(20)].map((_, i) => (
                  <line key={`v${i}`} x1={20 + i * 6.3} y1="10" x2={20 + i * 6.3} y2="270" />
                ))}
              </g>
              <ellipse cx="80" cy="40" rx="40" ry="40" fill="none" stroke="#4a90d9" strokeWidth="0.5" opacity="0.8" />
              <path d="M 35 80 Q 80 68 125 80 L 128 180 Q 108 192 80 194 Q 52 192 32 180 Z" fill="none" stroke="#4a90d9" strokeWidth="0.5" opacity="0.7" />
            </svg>
            <div style={{ fontSize: 10, color: 'var(--t3)' }}>245,321 tris</div>
          </div>
          {/* Arrow */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 24, color: 'var(--pink)' }}>→</span>
            <span style={{ fontSize: 9, color: 'var(--t2)' }}>Auto Retopo</span>
          </div>
          {/* After */}
          <div style={{ textAlign: 'center', opacity: generated ? 1 : 0.4 }}>
            <div style={{ fontSize: 11, color: 'var(--t2)', marginBottom: 8 }}>After</div>
            <svg width="160" height="280" viewBox="0 0 160 280">
              {/* Clean quad mesh */}
              <g stroke="#27c96a" strokeWidth="0.8" fill="none" opacity="0.8">
                {[...Array(12)].map((_, i) => (
                  <line key={`h${i}`} x1="20" y1={15 + i * 22} x2="140" y2={15 + i * 22} />
                ))}
                {[...Array(8)].map((_, i) => (
                  <line key={`v${i}`} x1={20 + i * 17.1} y1="15" x2={20 + i * 17.1} y2="265" />
                ))}
              </g>
              <ellipse cx="80" cy="40" rx="40" ry="40" fill="none" stroke="#27c96a" strokeWidth="1" opacity="0.9" />
              <path d="M 35 80 Q 80 68 125 80 L 128 180 Q 108 192 80 194 Q 52 192 32 180 Z" fill="none" stroke="#27c96a" strokeWidth="1" opacity="0.8" />
            </svg>
            <div style={{ fontSize: 10, color: generated ? 'var(--grn)' : 'var(--t3)' }}>24,612 tris</div>
          </div>
        </div>
      </div>

      {/* RIGHT - Mesh Info */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderLeft: '1px solid var(--bd)' }}>
        <PanelLabel>Mesh Info</PanelLabel>
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Vertices', val: generated ? '24,812' : '—' },
            { label: 'Triangles', val: generated ? '49,624' : '—' },
            { label: 'Quads', val: generated ? '49,120' : '—' },
            { label: 'Ngons', val: generated ? '0' : '—' },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--bd)', fontSize: 11 }}>
              <span style={{ color: 'var(--t2)' }}>{r.label}</span>
              <span style={{ color: generated ? 'var(--txt)' : 'var(--t3)', fontWeight: 600 }}>{r.val}</span>
            </div>
          ))}
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 10, color: 'var(--t2)', marginBottom: 6 }}>Mesh Quality</div>
            <div style={{ height: 6, background: 'var(--p3)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: generated ? '92%' : '0%', background: 'var(--grn)', borderRadius: 3, transition: 'width 0.8s' }} />
            </div>
            <div style={{ fontSize: 10, color: generated ? 'var(--grn)' : 'var(--t3)', marginTop: 4, textAlign: 'right' }}>{generated ? '92% — Excellent' : '—'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
