import { useState } from 'react'

const RECENT_PROJECTS = [
  { name: 'KhmerFemale_01', type: 'Character', ago: '3 hours ago', status: 'In Progress', grad: 'linear-gradient(135deg,#3a1a2a,#1a0c18)' },
  { name: 'Drink_Latte_01', type: 'Props', ago: '1 day ago', status: 'Completed', grad: 'linear-gradient(135deg,#3a2a10,#1a1408)' },
  { name: 'Angkor_Temple', type: 'Environment', ago: '3 days ago', status: 'In Progress', grad: 'linear-gradient(135deg,#1a2a3a,#0c1420)' },
  { name: 'RobotGuard_B', type: 'Character', ago: '5 days ago', status: 'In Progress', grad: 'linear-gradient(135deg,#1a1e3a,#0c1020)' },
  { name: 'Farm_House_01', type: 'Building', ago: '1 week ago', status: 'Completed', grad: 'linear-gradient(135deg,#2a1e10,#160f08)' },
]

const ASSETS_GALLERY = [
  { name: 'Base_Male_01', type: 'Character', grad: 'linear-gradient(135deg,#2a1e16,#100a08)', emoji: '🧑' },
  { name: 'Base_Female_01', type: 'Character', grad: 'linear-gradient(135deg,#2a1820,#100812)', emoji: '👩' },
  { name: 'Cup_Iced_Standard', type: 'Props', grad: 'linear-gradient(135deg,#282a30,#10121a)', emoji: '🥤' },
  { name: 'Khmer_House_01', type: 'Building', grad: 'linear-gradient(135deg,#201a10,#0e0c08)', emoji: '🏠' },
  { name: 'Palm_Tree_01', type: 'Nature', grad: 'linear-gradient(135deg,#102a16,#081208)', emoji: '🌴' },
  { name: 'Rock_01', type: 'Environment', grad: 'linear-gradient(135deg,#202020,#0c0c0c)', emoji: '🪨' },
  { name: 'Market_Stall_01', type: 'Props', grad: 'linear-gradient(135deg,#2a1a10,#100a08)', emoji: '🏪' },
  { name: 'Motorbike_01', type: 'Vehicle', grad: 'linear-gradient(135deg,#2a1010,#100808)', emoji: '🏍' },
  { name: 'Chicken_01', type: 'Animal', grad: 'linear-gradient(135deg,#2a2010,#120e08)', emoji: '🐔' },
]

const TRENDING = [
  { name: 'Khmer Temple', cat: 'Environment', badge: 'Free', grad: 'linear-gradient(135deg,#1a2a3a,#0a1420)', emoji: '🛕', big: true },
  { name: 'Banyan Tree', cat: 'Nature', badge: 'Free', grad: 'linear-gradient(135deg,#102a14,#081208)', emoji: '🌳' },
  { name: 'Street Food Cart', cat: 'Props', badge: 'Pro', grad: 'linear-gradient(135deg,#2a1a10,#100a06)', emoji: '🛒' },
  { name: 'Khmer House', cat: 'Building', badge: 'Free', grad: 'linear-gradient(135deg,#201a10,#0e0c06)', emoji: '🏘' },
]

const TEMPLATES = [
  { name: 'Base Human Male', tris: '52K tris', badge: 'Free', emoji: '🧑', color: '#4a90d9' },
  { name: 'Base Human Female', tris: '50K tris', badge: 'Free', emoji: '👩', color: '#e060a0' },
  { name: 'Fantasy Character', tris: '80K tris', badge: 'Pro', emoji: '🧝', color: '#8060c0' },
  { name: 'Sci-Fi Soldier', tris: '65K tris', badge: 'Pro', emoji: '🤖', color: '#40a0c0' },
  { name: 'Low-Poly Stylized', tris: '12K tris', badge: 'Free', emoji: '🎮', color: '#60c060' },
  { name: 'Anime Character', tris: '70K tris', badge: 'Pro', emoji: '✨', color: '#e09040' },
]

const ACTIVITY = [
  { label: 'Exported KhmerMale_01', detail: 'FBX (Unity)', time: '2h ago', color: '#27c96a', icon: '📤' },
  { label: 'Baked textures for Drink_Latte_01', detail: '5h ago', time: '', color: '#e91e8c', icon: '🎨' },
  { label: 'Generated UV for Farm_House_01', detail: '1d ago', time: '', color: '#4a90d9', icon: '⬡' },
  { label: 'Imported 12 new assets', detail: '2d ago', time: '', color: '#f0c040', icon: '⬇' },
]

const PIPELINE_STEPS = [
  { n: 1, label: 'Parts', sub: 'Import/Model', color: '#e91e8c' },
  { n: 2, label: 'Assemble', sub: 'Merge', color: '#cc2080' },
  { n: 3, label: 'Body Rig', sub: 'Skeleton', color: '#20b8a0' },
  { n: 4, label: 'Face Rig', sub: 'Facial Setup', color: '#9040d0' },
  { n: 5, label: 'Skin', sub: 'Weights', color: '#e06020' },
  { n: 6, label: 'Clothing', sub: 'Dress/Accessories', color: '#60a040' },
  { n: 7, label: 'Retopology', sub: 'Clean Topology', color: '#4090d0' },
  { n: 8, label: 'UV', sub: 'Unwrap', color: '#d0a020' },
  { n: 9, label: 'Texture', sub: 'Bake & Paint', color: '#d04080' },
  { n: 10, label: 'Animate', sub: 'Motion', color: '#2080c0' },
  { n: 11, label: 'Export', sub: 'Game Ready', color: '#8040c0' },
]

const GALLERY_FILTERS = ['Featured', 'Characters', 'Props', 'Environment', 'Clothing', 'Animals', 'Vehicles', 'Favorites']

function Badge({ text, green }: { text: string; green?: boolean }) {
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
      background: green ? 'rgba(39,201,106,0.15)' : 'rgba(233,30,140,0.15)',
      color: green ? '#27c96a' : '#e91e8c',
      border: `1px solid ${green ? 'rgba(39,201,106,0.3)' : 'rgba(233,30,140,0.3)'}`,
    }}>{text}</span>
  )
}

function StatusTag({ s }: { s: string }) {
  const done = s === 'Completed'
  return (
    <span style={{
      fontSize: 9.5, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
      background: done ? 'rgba(39,201,106,0.15)' : 'rgba(74,144,217,0.15)',
      color: done ? '#27c96a' : '#4a90d9',
      border: `1px solid ${done ? 'rgba(39,201,106,0.3)' : 'rgba(74,144,217,0.3)'}`,
    }}>{s}</span>
  )
}

export default function HomePage({ onStartPipeline }: { onStartPipeline?: (step?: number) => void }) {
  const [galleryFilter, setGalleryFilter] = useState('Featured')
  const [gallerySearch, setGallerySearch] = useState('')

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

      {/* ════════ MAIN SCROLLABLE CONTENT ════════ */}
      <div style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>

        {/* ── Hero Banner ── */}
        <div style={{
          height: 240, position: 'relative', overflow: 'hidden', flexShrink: 0,
          background: 'linear-gradient(135deg, #0c0816 0%, #14082a 40%, #0a1020 100%)',
        }}>
          {/* BG glow blobs */}
          <div style={{ position: 'absolute', top: -40, left: '35%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,30,180,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, right: '30%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,140,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 20, right: '8%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,144,217,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Character silhouette (right side) */}
          <div style={{ position: 'absolute', right: 280, top: 0, bottom: 0, width: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="200" height="240" viewBox="0 0 200 240" style={{ filter: 'drop-shadow(0 0 40px rgba(233,30,140,0.25))' }}>
              <ellipse cx="100" cy="24" rx="28" ry="32" fill="#c8987a" />
              <ellipse cx="100" cy="8" rx="30" ry="22" fill="#1a0c08" />
              <path d="M 68 56 Q 100 44 132 56 L 138 155 Q 114 168 100 170 Q 86 168 62 155 Z" fill="#1a1a22" opacity="0.95" />
              <path d="M 68 155 Q 60 170 36 175 L 22 190 L 16 225" fill="none" stroke="#c8987a" strokeWidth="18" strokeLinecap="round" opacity="0.95" />
              <path d="M 132 155 Q 140 170 164 175 L 178 190 L 184 225" fill="none" stroke="#c8987a" strokeWidth="18" strokeLinecap="round" opacity="0.95" />
              <path d="M 72 168 Q 66 230 62 235" fill="none" stroke="#2a2838" strokeWidth="24" strokeLinecap="round" opacity="0.95" />
              <path d="M 128 168 Q 134 230 138 235" fill="none" stroke="#2a2838" strokeWidth="24" strokeLinecap="round" opacity="0.95" />
              <line x1="100" y1="56" x2="100" y2="166" stroke="#e91e8c" strokeWidth="0.5" opacity="0.2" />
              {/* Bokeh dots */}
              {[[30,40],[160,80],[40,160],[170,140],[80,10],[130,200]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r={2+i%3} fill="#e91e8c" opacity={0.15 + (i%3)*0.08} />
              ))}
            </svg>
          </div>

          {/* Text content */}
          <div style={{ position: 'absolute', left: 32, top: 36 }}>
            <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.5px' }}>
              Create Amazing<br />
              3D Assets for <span style={{ color: '#e91e8c' }}>Games</span>
            </h1>
            <p style={{ margin: '10px 0 20px', fontSize: 12, color: '#7a7a9c', lineHeight: 1.6, maxWidth: 360 }}>
              From idea to game-ready. Models, materials, rigging, animation,<br />and more — all in one place.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => onStartPipeline?.(1)} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '9px 20px',
                background: '#e91e8c', border: 'none', borderRadius: 8,
                color: '#fff', fontWeight: 700, fontSize: 12.5, cursor: 'pointer',
              }}>+ New Project</button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8, color: '#ccc', fontWeight: 500, fontSize: 12.5, cursor: 'pointer',
              }}>▶ Watch Tutorial</button>
            </div>
          </div>

          {/* Italic tagline */}
          <div style={{ position: 'absolute', right: 30, bottom: 28, fontStyle: 'italic', fontSize: 13, color: 'rgba(255,255,255,0.18)', fontWeight: 300, lineHeight: 1.4, textAlign: 'right' }}>
            Turn Ideas<br />into Reality
          </div>

          {/* Stats cards — far right */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 140, borderLeft: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
            {[
              { icon: '📁', color: '#e91e8c', val: '12', label: 'Projects' },
              { icon: '🔴', color: '#e05050', val: '847', label: 'Assets' },
              { icon: '⬆', color: '#27c96a', val: '38', label: 'Exports' },
              { icon: '⏱', color: '#4a90d9', val: '120+', label: 'Hours Saved' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: `${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 9.5, color: '#6a6a7c', marginTop: 1 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, borderBottom: '1px solid #1e1b2c' }}>
          {[
            { label: 'Import Asset', sub: 'FBX, OBJ, GLTF, DAE', color: '#4a90d9', icon: '⬆', bg: '#0a1828' },
            { label: 'Browse Library', sub: '2,400+ ready assets', color: '#9040d0', icon: '⊞', bg: '#140a22' },
            { label: 'Material Library', sub: 'PBR materials & textures', color: '#e08030', icon: '◈', bg: '#1e1008' },
            { label: 'Character Pipeline', sub: '11-step workflow', color: '#e91e8c', icon: '🧍', bg: '#1a0814' },
            { label: 'Open Tutorial', sub: 'Learn step by step', color: '#27c96a', icon: '▶', bg: '#081a10' },
          ].map((a, i) => (
            <button key={i} onClick={() => a.label === 'Character Pipeline' && onStartPipeline?.(1)} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
              border: 'none', borderRight: i < 4 ? '1px solid #1e1b2c' : 'none',
              background: 'transparent', cursor: 'pointer', textAlign: 'left',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = a.bg}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${a.color}22`, border: `1px solid ${a.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: a.color, flexShrink: 0 }}>{a.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, color: '#dddaea' }}>{a.label}</div>
                <div style={{ fontSize: 10, color: '#5a5a70', marginTop: 2 }}>{a.sub}</div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ padding: '0 20px 20px' }}>

          {/* ── Recent Projects ── */}
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontWeight: 700, fontSize: 14.5, color: '#dddaea' }}>Recent Projects</span>
              <div style={{ flex: 1 }} />
              <button style={{ fontSize: 11.5, color: '#e91e8c', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>View All →</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
              {RECENT_PROJECTS.map(p => (
                <div key={p.name} style={{ borderRadius: 10, overflow: 'hidden', background: '#1a1726', border: '1px solid #2a2535', cursor: 'pointer', transition: 'border-color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#e91e8c'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2535'}
                >
                  <div style={{ height: 110, background: p.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <span style={{ fontSize: 40, filter: 'saturate(0.5) brightness(1.5)' }}>
                      {p.type === 'Character' ? '🧍‍♀️' : p.type === 'Props' ? '☕' : p.type === 'Environment' ? '🛕' : p.type === 'Building' ? '🏠' : '🤖'}
                    </span>
                    <button style={{ position: 'absolute', top: 6, right: 6, width: 22, height: 22, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, background: 'rgba(0,0,0,0.4)', color: '#9090a8', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⋮</button>
                  </div>
                  <div style={{ padding: '8px 10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#dddaea' }}>{p.name}</span>
                      <span style={{ fontSize: 9, color: '#4a4a60' }}>{p.ago}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 5 }}>
                      <span style={{ fontSize: 9, padding: '2px 6px', background: 'rgba(255,255,255,0.07)', borderRadius: 3, color: '#8080a0', border: '1px solid #2a2535' }}>{p.type}</span>
                      <StatusTag s={p.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 11-Step Pipeline ── */}
          <div style={{ background: '#1a1726', border: '1px solid #2a2535', borderRadius: 12, padding: '14px 18px', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 14, marginRight: 8 }}>🚀</span>
              <span style={{ fontWeight: 700, fontSize: 13.5, color: '#dddaea' }}>11-Step Asset Creation Pipeline</span>
              <div style={{ flex: 1 }} />
              <button onClick={() => onStartPipeline?.(1)} style={{ padding: '7px 18px', background: '#e91e8c', border: 'none', borderRadius: 7, color: '#fff', fontWeight: 700, fontSize: 11.5, cursor: 'pointer' }}>
                Start Pipeline →
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto' }}>
              <button style={{ width: 22, height: 22, border: '1px solid #2a2535', borderRadius: '50%', background: '#12101e', color: '#6a6a80', fontSize: 10, cursor: 'pointer', flexShrink: 0 }}>‹</button>
              {PIPELINE_STEPS.map((s, i) => (
                <div key={s.n} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <button onClick={() => onStartPipeline?.(s.n)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '4px 6px', border: 'none', background: 'none', cursor: 'pointer' }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%', background: s.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 800, color: '#fff',
                      boxShadow: `0 0 10px ${s.color}60`,
                    }}>{s.n}</div>
                    <div style={{ textAlign: 'center', lineHeight: 1.2 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#c0bfd0', whiteSpace: 'nowrap' }}>{s.label}</div>
                      <div style={{ fontSize: 8.5, color: '#4a4a60', whiteSpace: 'nowrap' }}>{s.sub}</div>
                    </div>
                  </button>
                  {i < PIPELINE_STEPS.length - 1 && (
                    <div style={{ width: 16, height: 1, background: '#3a3550', flexShrink: 0, margin: '0 2px', marginBottom: 20 }} />
                  )}
                </div>
              ))}
              <button style={{ width: 22, height: 22, border: '1px solid #2a2535', borderRadius: '50%', background: '#12101e', color: '#6a6a80', fontSize: 10, cursor: 'pointer', flexShrink: 0, marginLeft: 4 }}>›</button>
            </div>
          </div>

          {/* ── Asset Gallery ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              {/* Filter tabs */}
              <div style={{ display: 'flex', gap: 2, flex: 1 }}>
                {GALLERY_FILTERS.map(f => (
                  <button key={f} onClick={() => setGalleryFilter(f)} style={{
                    padding: '5px 12px', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 500,
                    background: galleryFilter === f ? '#e91e8c' : 'transparent',
                    color: galleryFilter === f ? '#fff' : '#6a6a80',
                  }}>{f}</button>
                ))}
              </div>
              {/* Controls */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <span style={{ position: 'absolute', left: 7, top: '50%', transform: 'translateY(-50%)', color: '#4a4a60', fontSize: 11 }}>🔍</span>
                <input value={gallerySearch} onChange={e => setGallerySearch(e.target.value)} placeholder="Search assets..." style={{ background: '#1a1726', border: '1px solid #2a2535', borderRadius: 6, color: '#b0afc0', padding: '5px 8px 5px 24px', fontSize: 10.5, width: 130 }} />
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: '1px solid #2a2535', borderRadius: 6, background: '#1a1726', color: '#8080a0', fontSize: 10.5, cursor: 'pointer' }}>⊞ Grid</button>
              <select style={{ background: '#1a1726', border: '1px solid #2a2535', borderRadius: 6, color: '#8080a0', padding: '5px 8px', fontSize: 10.5, cursor: 'pointer' }}>
                <option>Sort: Newest</option><option>Sort: Popular</option><option>Sort: A-Z</option>
              </select>
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: '1px solid #2a2535', borderRadius: 6, background: '#1a1726', color: '#8080a0', fontSize: 10.5, cursor: 'pointer' }}>▼ Filter</button>
            </div>

            {/* Gallery grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 10 }}>
              {ASSETS_GALLERY.filter(a => !gallerySearch || a.name.toLowerCase().includes(gallerySearch.toLowerCase())).map(a => (
                <div key={a.name} style={{ cursor: 'pointer', position: 'relative' }}>
                  <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #2a2535', background: a.grad, transition: 'border-color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#e91e8c'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2535'}
                  >
                    <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34 }}>{a.emoji}</div>
                    <button style={{ position: 'absolute', top: 5, right: 5, width: 18, height: 18, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, color: '#4a4a60', fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>★</button>
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <div style={{ fontSize: 9.5, fontWeight: 600, color: '#c0bfd0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
                    <div style={{ fontSize: 8.5, color: '#4a4a60' }}>{a.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════ RIGHT SIDEBAR ════════ */}
      <div style={{ width: 240, flexShrink: 0, background: '#0f0c1a', borderLeft: '1px solid #1e1b2c', overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Trending Assets */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#dddaea' }}>Trending Assets</span>
            <div style={{ flex: 1 }} />
            <button style={{ fontSize: 10.5, color: '#e91e8c', background: 'none', border: 'none', cursor: 'pointer' }}>View All →</button>
          </div>
          {/* Large featured */}
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #2a2535', marginBottom: 8, cursor: 'pointer' }}>
            <div style={{ height: 130, background: TRENDING[0].grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52 }}>{TRENDING[0].emoji}</div>
            <div style={{ padding: '8px 10px', background: '#1a1726', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ flex: 1, fontSize: 11.5, fontWeight: 600, color: '#dddaea' }}>{TRENDING[0].name}</span>
              <span style={{ fontSize: 9, padding: '1px 5px', background: '#1e1b2c', border: '1px solid #2a2535', borderRadius: 3, color: '#7070a0' }}>{TRENDING[0].cat}</span>
              <Badge text={TRENDING[0].badge} green={TRENDING[0].badge === 'Free'} />
            </div>
          </div>
          {/* 3 small */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {TRENDING.slice(1).map(t => (
              <div key={t.name} style={{ cursor: 'pointer' }}>
                <div style={{ borderRadius: 7, overflow: 'hidden', border: '1px solid #2a2535', marginBottom: 3 }}>
                  <div style={{ height: 60, background: t.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{t.emoji}</div>
                </div>
                <div style={{ fontSize: 9, fontWeight: 600, color: '#b0afc0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</div>
                <div style={{ display: 'flex', gap: 3, marginTop: 2 }}>
                  <span style={{ fontSize: 8, color: '#4a4a60' }}>{t.cat}</span>
                  <Badge text={t.badge} green={t.badge === 'Free'} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Templates */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#dddaea' }}>Templates</span>
            <div style={{ flex: 1 }} />
            <button style={{ fontSize: 10.5, color: '#e91e8c', background: 'none', border: 'none', cursor: 'pointer' }}>View All →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {TEMPLATES.map(t => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: '#1a1726', borderRadius: 7, border: '1px solid #2a2535', cursor: 'pointer', transition: 'border-color 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#e91e8c'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2535'}
              >
                <div style={{ width: 26, height: 26, borderRadius: 6, background: `${t.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{t.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#c8c7d8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</div>
                  <div style={{ fontSize: 9, color: '#4a4a60' }}>{t.tris}</div>
                </div>
                <Badge text={t.badge} green={t.badge === 'Free'} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#dddaea' }}>Recent Activity</span>
            <div style={{ flex: 1 }} />
            <button style={{ fontSize: 10.5, color: '#e91e8c', background: 'none', border: 'none', cursor: 'pointer' }}>View All →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '7px 6px', borderBottom: i < ACTIVITY.length - 1 ? '1px solid #1e1b2c' : 'none' }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: `${a.color}18`, border: `1px solid ${a.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0, marginTop: 1 }}>{a.icon}</div>
                <div>
                  <div style={{ fontSize: 10.5, color: '#b0afc0', lineHeight: 1.4 }}>{a.label}</div>
                  <div style={{ fontSize: 9.5, color: '#4a4a60', marginTop: 2 }}>{a.detail || a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
