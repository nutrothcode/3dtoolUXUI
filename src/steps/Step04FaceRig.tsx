import { useState } from 'react'
import { Btn, Check, TabRow, PanelLabel } from '../components/shared'

const FACE_TOOLS = ['Add Face Bone', 'Edit Bone', 'Eye Setup', 'Jaw Setup', 'Lip Setup', 'Create Controllers', 'Add Blend Shape', 'Mirror Face (L ↔ R)']
const BLEND_SHAPES = [
  { name: 'Blink_L', color: '#4a90d9' }, { name: 'Blink_R', color: '#4a90d9' },
  { name: 'Smile_L', color: '#27c96a' }, { name: 'eye_r', color: '#e05050' },
  { name: 'eyelid_l', color: '#f0c040' }, { name: 'brow_l', color: '#e091e8' },
  { name: 'brow_r', color: '#e091e8' }, { name: 'cheek_r', color: '#f0a040' },
  { name: 'nose_tip', color: '#80c0d0' }, { name: 'upperlip', color: '#e91e8c' },
  { name: 'lowerlip', color: '#e91e8c' }, { name: 'mouth_corner_l', color: '#c0d080' },
]
const FACE_TESTS = ['Neutral', 'Smile', 'Blink', 'Angry', 'Sad', 'Surprised']

export default function Step04FaceRig() {
  const [faceTest, setFaceTest] = useState('Neutral')

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* LEFT */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderRight: '1px solid var(--bd)' }}>
        <PanelLabel>Face Tools</PanelLabel>
        <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 3, overflowY: 'auto' }}>
          {FACE_TOOLS.map(t => (
            <button key={t} style={{ padding: '5px 10px', border: '1px solid var(--bd)', borderRadius: 4, background: 'var(--p3)', color: 'var(--txt)', fontSize: 10.5, cursor: 'pointer', textAlign: 'left' }}>{t}</button>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--bd)', padding: 8, flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--t2)', marginBottom: 6, textTransform: 'uppercase' }}>Face Test</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {FACE_TESTS.map(t => (
              <button key={t} onClick={() => setFaceTest(t)} style={{
                padding: '3px 8px', border: `1px solid ${faceTest === t ? 'var(--pink)' : 'var(--bd)'}`,
                borderRadius: 4, background: faceTest === t ? 'var(--pink)' : 'var(--p4)',
                color: faceTest === t ? '#fff' : 'var(--txt)', fontSize: 10, cursor: 'pointer',
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER - Face close-up */}
      <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(180deg, #0e1220 0%, #090b12 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <svg width="280" height="320" viewBox="0 0 280 320">
            {/* Face outline */}
            <ellipse cx="140" cy="150" rx="100" ry="130" fill="#c8a882" opacity="0.7" />
            <ellipse cx="140" cy="60" rx="105" ry="70" fill="#2a1a08" />
            {/* Eyes */}
            <ellipse cx="105" cy="130" rx="18" ry="10" fill="white" />
            <ellipse cx="175" cy="130" rx="18" ry="10" fill="white" />
            <circle cx="110" cy="130" r="7" fill="#3a2010" />
            <circle cx="180" cy="130" r="7" fill="#3a2010" />
            {/* Nose */}
            <path d="M 140 145 Q 130 175 125 185 Q 135 192 155 185 Q 150 175 140 145" fill="#b89070" opacity="0.6" />
            {/* Mouth */}
            <path d={faceTest === 'Smile' ? 'M 115 215 Q 140 235 165 215' : faceTest === 'Angry' ? 'M 115 220 Q 140 210 165 220' : 'M 115 218 Q 140 224 165 218'} fill="none" stroke="#8a5040" strokeWidth="2.5" />
            {/* Face rig control points */}
            {[[105,130],[175,130],[140,100],[140,185],[115,218],[165,218],[105,95],[175,95]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="none" stroke="#e91e8c" strokeWidth="1.5" opacity="0.8" />
            ))}
            {/* Blend shape sliders overlay */}
          </svg>
          <div style={{ color: 'var(--t2)', fontSize: 11, marginTop: 8 }}>Face Rig — {faceTest}</div>
        </div>
        <div style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 10, color: 'var(--t2)' }}>
          <Check checked label="Auto Rotate" />
        </div>
      </div>

      {/* RIGHT - Blend Shapes + Face Hierarchy */}
      <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderLeft: '1px solid var(--bd)', overflow: 'hidden' }}>
        <TabRow tabs={['Blend Shapes', 'Face Hierarchy']} active="Blend Shapes" setActive={() => {}} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
          {BLEND_SHAPES.map(bs => (
            <div key={bs.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px', borderBottom: '1px solid var(--bd)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: bs.color, flexShrink: 0 }} />
              <span style={{ fontSize: 10.5, color: 'var(--txt)', flex: 1 }}>{bs.name}</span>
              <div style={{ width: 60, height: 4, background: 'var(--p3)', borderRadius: 2, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '0%', background: bs.color, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 10, color: 'var(--t3)', width: 24, textAlign: 'right' }}>0</span>
            </div>
          ))}
        </div>
        <div style={{ padding: 8, borderTop: '1px solid var(--bd)', flexShrink: 0 }}>
          <Btn full>+ Add Blend Shape</Btn>
        </div>
      </div>
    </div>
  )
}
