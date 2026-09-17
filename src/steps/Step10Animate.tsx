import { useState } from 'react'
import { Check, PanelLabel } from '../components/shared'

const ANIMS = ['Idle', 'Walk', 'Run', 'Crouch', 'Attack', 'Jump', 'Sit', 'Talk', 'Emotions']
const FACE_ANIMS = ['Smile', 'Blink', 'Talk', 'Surprised']

export default function Step10Animate() {
  const [activeAnim, setActiveAnim] = useState('Run')
  const [playing, setPlaying] = useState(true)
  const [facialAnim, setFacialAnim] = useState('Smile')
  const [progress, setProgress] = useState(35)

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* LEFT - Animation Library */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderRight: '1px solid var(--bd)' }}>
        <PanelLabel>Animation Library</PanelLabel>
        <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
          {ANIMS.map(a => (
            <button key={a} onClick={() => setActiveAnim(a)} style={{
              padding: '5px 10px', border: `1px solid ${activeAnim === a ? 'var(--pink)' : 'var(--bd)'}`,
              borderRadius: 4, background: activeAnim === a ? 'var(--pink-lo)' : 'var(--p3)',
              color: activeAnim === a ? 'var(--pink)' : 'var(--txt)', fontSize: 10.5, cursor: 'pointer',
              textAlign: 'left', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span>{activeAnim === a ? '▶' : '▷'}</span>
              {a}
            </button>
          ))}
        </div>
        {/* Face Animation */}
        <div style={{ borderTop: '1px solid var(--bd)', padding: 8, flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--t2)', marginBottom: 6, textTransform: 'uppercase' }}>Face Animation</div>
          <select defaultValue={facialAnim} onChange={e => setFacialAnim(e.target.value)} style={{ width: '100%', background: 'var(--p3)', border: '1px solid var(--bd)', color: 'var(--txt)', borderRadius: 4, padding: '4px 6px', fontSize: 10.5, marginBottom: 6 }}>
            {FACE_ANIMS.map(f => <option key={f}>{f}</option>)}
          </select>
          <button style={{ width: '100%', padding: '4px', border: '1px solid var(--bd)', borderRadius: 4, background: 'var(--p4)', color: 'var(--txt)', fontSize: 10.5, cursor: 'pointer' }}>Auto Rotate</button>
        </div>
        {/* Transport */}
        <div style={{ borderTop: '1px solid var(--bd)', padding: 8, flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 6 }}>
            {['⏮', '▶', '⏸', '⏭'].map((ic, i) => (
              <button key={i} onClick={() => i === 1 && setPlaying(p => !p)} style={{ width: 28, height: 28, border: '1px solid var(--bd)', borderRadius: 4, background: 'var(--p4)', color: 'var(--txt)', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {i === 1 && playing ? '⏸' : ic}
              </button>
            ))}
          </div>
          <div style={{ height: 4, background: 'var(--p3)', borderRadius: 2, position: 'relative', marginBottom: 4 }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${progress}%`, background: 'var(--pink)', borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--t3)' }}>
            <span>0:00</span><span>1:00</span>
          </div>
        </div>
      </div>

      {/* CENTER - Running character */}
      <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(180deg, #0e1220 0%, #090b12 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', backgroundImage: 'linear-gradient(var(--bd) 1px, transparent 1px), linear-gradient(90deg, var(--bd) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3, transform: 'perspective(400px) rotateX(60deg)', transformOrigin: 'bottom center' }} />
        {/* Animated character - running pose */}
        <svg width="220" height="400" viewBox="0 0 220 400" style={{ animation: playing ? 'runBob 0.5s ease-in-out infinite alternate' : 'none' }}>
          <style>{`@keyframes runBob { from { transform: translateY(0px) rotate(-1deg); } to { transform: translateY(-8px) rotate(1deg); } }`}</style>
          <ellipse cx="110" cy="22" rx="22" ry="26" fill="#c8a882" />
          <ellipse cx="110" cy="8" rx="24" ry="18" fill="#2a1a08" />
          {/* Torso leaning forward */}
          <path d="M 80 52 Q 110 40 140 52 L 145 155 Q 120 168 110 170 Q 100 168 75 155 Z" fill="#4a4a60" opacity="0.9" transform="rotate(-8,110,100)" />
          {/* Arms swinging */}
          <path d="M 80 80 Q 45 110 25 160" fill="none" stroke="#c8a882" strokeWidth="14" strokeLinecap="round" opacity="0.9" transform="rotate(-15,80,80)" />
          <path d="M 140 80 Q 175 100 185 140" fill="none" stroke="#c8a882" strokeWidth="14" strokeLinecap="round" opacity="0.9" transform="rotate(10,140,80)" />
          {/* Legs - running position */}
          <path d="M 95 165 Q 70 240 55 310 L 50 370" fill="none" stroke="#2a3050" strokeWidth="22" strokeLinecap="round" opacity="0.9" transform="rotate(-20,95,165)" />
          <path d="M 125 165 Q 150 220 165 280 L 168 340" fill="none" stroke="#2a3050" strokeWidth="22" strokeLinecap="round" opacity="0.9" transform="rotate(15,125,165)" />
          {/* Motion lines */}
          {[-20,-12,-4].map((offset, i) => (
            <line key={i} x1={offset + 30} y1={280 + i * 20} x2={offset} y2={280 + i * 20} stroke="#4a90d9" strokeWidth="1" opacity={0.3 + i * 0.15} />
          ))}
        </svg>
        {/* Animation info overlay */}
        <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(18,20,30,0.8)', border: '1px solid var(--bd)', borderRadius: 6, padding: '6px 10px', backdropFilter: 'blur(4px)' }}>
          <div style={{ fontSize: 10.5, color: 'var(--pink)', fontWeight: 600 }}>{activeAnim}</div>
          <div style={{ fontSize: 9.5, color: 'var(--t2)', marginTop: 2 }}>{playing ? '▶ Playing' : '⏸ Paused'} · 1.0x</div>
        </div>
      </div>

      {/* RIGHT - settings */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderLeft: '1px solid var(--bd)' }}>
        <PanelLabel>Playback Settings</PanelLabel>
        <div style={{ flex: 1, padding: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 10.5, color: 'var(--t2)' }}>Speed</span>
            <select style={{ background: 'var(--p3)', border: '1px solid var(--bd)', color: 'var(--txt)', borderRadius: 4, padding: '2px 6px', fontSize: 10.5 }}>
              <option>1.0x</option><option>0.5x</option><option>2.0x</option><option>0.25x</option>
            </select>
          </div>
          <Check checked label="Loop" />
          <Check label="Add Keyframe" />
          <div style={{ borderTop: '1px solid var(--bd)', paddingTop: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--t2)', marginBottom: 6, textTransform: 'uppercase' }}>Blend</div>
            <div style={{ height: 4, background: 'var(--p3)', borderRadius: 2, marginBottom: 4 }}>
              <div style={{ height: '100%', width: '60%', background: 'var(--pink)', borderRadius: 2 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--t3)' }}><span>From</span><span>To</span></div>
          </div>
        </div>
        <div style={{ padding: 8, borderTop: '1px solid var(--bd)', flexShrink: 0 }}>
          <button style={{ width: '100%', padding: '6px', background: 'var(--pink)', border: 'none', borderRadius: 4, color: '#fff', fontWeight: 600, fontSize: 10.5, cursor: 'pointer' }}>Export Character</button>
        </div>
      </div>
    </div>
  )
}
