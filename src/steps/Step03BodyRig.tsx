import { useState } from 'react'
import { Btn, Check, TabRow, PanelLabel } from '../components/shared'

const SKEL_TOOLS = ['Add Bone', 'Edit Bone', 'Delete Bone', 'Minor Rig', 'Auto Fit Skeleton', 'IK Setup', 'Rename', 'Symmetry', 'Reset Pose']
const TREE_NODES = [
  { label: 'root', d: 0 }, { label: 'pelvis', d: 1 }, { label: 'spine_01', d: 2 },
  { label: 'spine_02', d: 3 }, { label: 'spine_03', d: 4 }, { label: 'chest', d: 5 },
  { label: 'neck', d: 6 }, { label: 'head', d: 7 },
  { label: 'clavicle_l', d: 3 }, { label: 'upperarm_l', d: 4 }, { label: 'lowerarm_l', d: 5 }, { label: 'hand_l', d: 6 },
  { label: 'clavicle_r', d: 3 }, { label: 'upperarm_r', d: 4 }, { label: 'lowerarm_r', d: 5 }, { label: 'hand_r', d: 6 },
  { label: 'thigh_l', d: 2 }, { label: 'calf_l', d: 3 }, { label: 'foot_l', d: 4 },
  { label: 'thigh_r', d: 2 }, { label: 'calf_r', d: 3 }, { label: 'foot_r', d: 4 },
]

export default function Step03BodyRig() {
  const [pose, setPose] = useState('T-Pose')

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* LEFT - Skeleton Tools */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderRight: '1px solid var(--bd)' }}>
        <PanelLabel>Skeleton Tools</PanelLabel>
        <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {SKEL_TOOLS.map(t => (
            <button key={t} style={{ padding: '5px 10px', border: '1px solid var(--bd)', borderRadius: 4, background: 'var(--p3)', color: 'var(--txt)', fontSize: 10.5, cursor: 'pointer', textAlign: 'left' }}>{t}</button>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--bd)', padding: 8, flexShrink: 0 }}>
          <div style={{ fontSize: 10, color: 'var(--t2)', marginBottom: 6, fontWeight: 600 }}>POSE TEST</div>
          {['T-Pose', 'A-Pose'].map(p => (
            <button key={p} onClick={() => setPose(p)} style={{
              width: '100%', marginBottom: 4, padding: '5px 10px', borderRadius: 4,
              border: `1px solid ${pose === p ? 'var(--pink)' : 'var(--bd)'}`,
              background: pose === p ? 'var(--pink-lo)' : 'var(--p4)',
              color: pose === p ? 'var(--pink)' : 'var(--txt)', fontSize: 10.5, cursor: 'pointer',
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* CENTER - Viewport */}
      <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(180deg, #0e1220 0%, #090b12 70%)' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', backgroundImage: 'linear-gradient(var(--bd) 1px, transparent 1px), linear-gradient(90deg, var(--bd) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3, transform: 'perspective(400px) rotateX(60deg)', transformOrigin: 'bottom center' }} />
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)' }}>
          <svg width="200" height="420" viewBox="0 0 200 420">
            {/* Skeleton visualization - colorful bone rig */}
            <g opacity="0.9">
              {/* Spine */}
              <line x1="100" y1="30" x2="100" y2="200" stroke="#e91e8c" strokeWidth="3" />
              {/* Shoulders */}
              <line x1="100" y1="70" x2="30" y2="100" stroke="#e05050" strokeWidth="2.5" />
              <line x1="100" y1="70" x2="170" y2="100" stroke="#e05050" strokeWidth="2.5" />
              {/* Arms */}
              <line x1="30" y1="100" x2="10" y2="180" stroke="#f0a040" strokeWidth="2.5" />
              <line x1="170" y1="100" x2="190" y2="180" stroke="#f0a040" strokeWidth="2.5" />
              {/* Forearms */}
              <line x1="10" y1="180" x2="5" y2="250" stroke="#f0c040" strokeWidth="2" />
              <line x1="190" y1="180" x2="195" y2="250" stroke="#f0c040" strokeWidth="2" />
              {/* Hips */}
              <line x1="100" y1="200" x2="65" y2="215" stroke="#50c060" strokeWidth="2.5" />
              <line x1="100" y1="200" x2="135" y2="215" stroke="#50c060" strokeWidth="2.5" />
              {/* Thighs */}
              <line x1="65" y1="215" x2="58" y2="320" stroke="#4a90d9" strokeWidth="2.5" />
              <line x1="135" y1="215" x2="142" y2="320" stroke="#4a90d9" strokeWidth="2.5" />
              {/* Calves */}
              <line x1="58" y1="320" x2="55" y2="400" stroke="#8060c0" strokeWidth="2" />
              <line x1="142" y1="320" x2="145" y2="400" stroke="#8060c0" strokeWidth="2" />
              {/* Joints */}
              {[[100,30],[100,70],[100,120],[100,200],[30,100],[170,100],[10,180],[190,180],[5,250],[195,250],[65,215],[135,215],[58,320],[142,320],[55,400],[145,400]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="5" fill="none" stroke={['#e91e8c','#e05050','#f0a040','#50c060','#4a90d9','#8060c0'][i%6]} strokeWidth="1.5" />
              ))}
            </g>
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
        <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 10, color: 'var(--t2)' }}>Auto Rotate</span>
          <input type="checkbox" style={{ accentColor: 'var(--pink)' }} />
        </div>
      </div>

      {/* RIGHT - Hierarchy */}
      <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderLeft: '1px solid var(--bd)', overflow: 'hidden' }}>
        <TabRow tabs={['Hierarchy', 'Bone Properties']} active="Hierarchy" setActive={() => {}} />
        <div style={{ padding: '6px 8px', borderBottom: '1px solid var(--bd)' }}>
          <input placeholder="🔍 Search..." style={{ width: '100%', background: 'var(--p3)', border: '1px solid var(--bd)', borderRadius: 4, color: 'var(--txt)', padding: '4px 8px', fontSize: 10.5 }} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
          {TREE_NODES.map((n, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '2px 8px 2px', paddingLeft: 8 + n.d * 10, fontSize: 10.5, color: 'var(--txt)', cursor: 'pointer' }}>
              <span style={{ marginRight: 4, color: 'var(--pink)', fontSize: 9 }}>◆</span>
              {n.label}
              <div style={{ flex: 1 }} /><span style={{ color: 'var(--t3)', fontSize: 10 }}>👁</span>
            </div>
          ))}
        </div>
        <div style={{ padding: 8, borderTop: '1px solid var(--bd)', flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--t2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Pose Test</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['T-Pose', 'A-Pose'].map(p => (
              <Btn key={p} style={{ flex: 1 }}>{p}</Btn>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
