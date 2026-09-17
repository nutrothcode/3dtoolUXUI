import { useState } from 'react'

const RECENT_PROJECTS = [
  { name: 'KhmerFemale_01', type: 'Character', ago: '3 hours ago', status: 'In Progress', grad: 'linear-gradient(135deg,#3a1a2a,#1a0c18)', emoji: '👩' },
  { name: 'Drink_Latte_01', type: 'Props', ago: '1 day ago', status: 'Completed', grad: 'linear-gradient(135deg,#3a2a10,#1a1408)', emoji: '🥤' },
  { name: 'Angkor_Temple', type: 'Environment', ago: '3 days ago', status: 'In Progress', grad: 'linear-gradient(135deg,#1a2a3a,#0c1420)', emoji: '🛕' },
  { name: 'RobotGuard_B', type: 'Character', ago: '5 days ago', status: 'In Progress', grad: 'linear-gradient(135deg,#1a1e3a,#0c1020)', emoji: '🤖' },
  { name: 'Farm_House_01', type: 'Building', ago: '1 week ago', status: 'Completed', grad: 'linear-gradient(135deg,#2a1e10,#160f08)', emoji: '🏚' },
]

const ASSETS_GALLERY = [
  { name: 'Base_Male_01', type: 'Character', grad: 'linear-gradient(135deg,#2a1e16,#100a08)', emoji: '🧑' },
  { name: 'Base_Female_01', type: 'Character', grad: 'linear-gradient(135deg,#2a1820,#100812)', emoji: '👩' },
  { name: 'Cup_Iced_Standard', type: 'Props', grad: 'linear-gradient(135deg,#202430,#10121a)', emoji: '🥤' },
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
  { label: 'Baked textures for Drink_Latte_01', detail: '', time: '5h ago', color: '#e91e8c', icon: '🎨' },
  { label: 'Generated UV for Farm_House_01', detail: '', time: '1d ago', color: '#4a90d9', icon: '⬡' },
  { label: 'Imported 12 new assets', detail: '', time: '2d ago', color: '#f0c040', icon: '⬇' },
]


const GALLERY_FILTERS = ['Featured', 'Characters', 'Props', 'Environment', 'Clothing', 'Animals', 'Vehicles', 'Favorites']

const STATS = [
  { icon: '📁', val: '12',   label: 'Projects',    color: '#e91e8c' },
  { icon: '⬡',  val: '847',  label: 'Assets',      color: '#4a90d9' },
  { icon: '📤', val: '38',   label: 'Exports',     color: '#27c96a' },
  { icon: '⏱',  val: '120+', label: 'Hours Saved', color: '#f0c040' },
]

function Badge({ text }: { text: string }) {
  const free = text === 'Free'
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
      background: free ? 'rgba(39,201,106,0.18)' : 'rgba(233,30,140,0.18)',
      color: free ? '#27c96a' : '#e91e8c',
      border: `1px solid ${free ? 'rgba(39,201,106,0.35)' : 'rgba(233,30,140,0.35)'}`,
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

  const filteredGallery = gallerySearch
    ? ASSETS_GALLERY.filter(a => a.name.toLowerCase().includes(gallerySearch.toLowerCase()))
    : ASSETS_GALLERY

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: '#0d0a14' }}>

      {/* ═══════════ MAIN SCROLL ═══════════ */}
      <div style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>

        {/* ── Hero Banner ── */}
        <div style={{
          height: 248, position: 'relative', overflow: 'hidden', flexShrink: 0,
          background: 'linear-gradient(135deg, #0c0816 0%, #16082e 45%, #0a1020 100%)',
        }}>
          {/* Ambient glows */}
          <div style={{ position: 'absolute', top: -60, left: '30%', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,30,200,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -80, right: '26%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,140,0.16) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 10, right: '6%', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,144,217,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

          {/* Character silhouette */}
          <div style={{ position: 'absolute', right: 300, top: 0, bottom: 0, width: 280, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <svg width="220" height="248" viewBox="0 0 220 248" style={{ filter: 'drop-shadow(0 0 48px rgba(233,30,140,0.22))' }}>
              {/* Bokeh */}
              {[[30,40,3],[165,70,2],[45,170,2.5],[172,155,2],[85,8,2],[135,210,1.5],[20,120,1.5],[185,100,2]].map(([x,y,r],i) => (
                <circle key={i} cx={x} cy={y} r={r} fill={['#e91e8c','#4a90d9','#a060d0','#f0c040'][i%4]} opacity={0.35 + (i%3)*0.12} />
              ))}
              {/* Head */}
              <ellipse cx="110" cy="24" rx="28" ry="32" fill="#c8987a" />
              <ellipse cx="110" cy="8" rx="30" ry="22" fill="#1a0c08" />
              <path d="M 76 6 Q 80 -4 110 -2 Q 140 -4 144 6 Q 138 -4 110 -2 Q 82 -4 76 6 Z" fill="#1a0c08" />
              {/* Face details */}
              <ellipse cx="98" cy="22" rx="7" ry="4.5" fill="#1a0c06" opacity="0.65" />
              <ellipse cx="122" cy="22" rx="7" ry="4.5" fill="#1a0c06" opacity="0.65" />
              <circle cx="98" cy="22" r="3.5" fill="#3a2010" />
              <circle cx="122" cy="22" r="3.5" fill="#3a2010" />
              <circle cx="99.5" cy="21" r="1.2" fill="#ffffff" opacity="0.8" />
              <circle cx="123.5" cy="21" r="1.2" fill="#ffffff" opacity="0.8" />
              <path d="M 102 38 Q 110 44 118 38" fill="none" stroke="#c07060" strokeWidth="1.5" strokeLinecap="round" />
              <ellipse cx="96" cy="35" rx="3" ry="1.8" fill="#e08090" opacity="0.45" />
              <ellipse cx="124" cy="35" rx="3" ry="1.8" fill="#e08090" opacity="0.45" />
              {/* Hair strands */}
              <path d="M 80 18 Q 76 45 78 62" fill="none" stroke="#1a0c08" strokeWidth="14" strokeLinecap="round" />
              <path d="M 140 18 Q 145 45 148 75 Q 155 120 156 170" fill="none" stroke="#1a0c08" strokeWidth="15" strokeLinecap="round" />
              {/* Neck */}
              <rect x="101" y="54" width="18" height="24" rx="7" fill="#c8987a" opacity="0.85" />
              {/* Body */}
              <path d="M 78 56 Q 110 44 142 56 L 148 158 Q 120 172 110 174 Q 100 172 72 158 Z" fill="#181820" opacity="0.97" />
              {/* Straps */}
              <line x1="96" y1="56" x2="92" y2="44" stroke="#252530" strokeWidth="3.5" />
              <line x1="124" y1="56" x2="128" y2="44" stroke="#252530" strokeWidth="3.5" />
              {/* Arms */}
              <path d="M 78 56 Q 56 78 40 140 Q 36 168 38 210" fill="none" stroke="#c8987a" strokeWidth="19" strokeLinecap="round" opacity="0.95" />
              <path d="M 142 56 Q 164 78 180 140 Q 184 168 182 210" fill="none" stroke="#c8987a" strokeWidth="19" strokeLinecap="round" opacity="0.95" />
              {/* Hands */}
              <ellipse cx="38" cy="218" rx="10" ry="14" fill="#c8987a" opacity="0.9" />
              <ellipse cx="182" cy="218" rx="10" ry="14" fill="#c8987a" opacity="0.9" />
              {/* Pants */}
              <path d="M 72 158 Q 66 225 62 248" fill="none" stroke="#222838" strokeWidth="28" strokeLinecap="round" opacity="0.97" />
              <path d="M 148 158 Q 154 225 158 248" fill="none" stroke="#222838" strokeWidth="28" strokeLinecap="round" opacity="0.97" />
              {/* Waistband */}
              <rect x="72" y="154" width="76" height="13" rx="5" fill="#1e2030" />
              {/* Pink accent glow on character */}
              <ellipse cx="110" cy="110" rx="55" ry="80" fill="none" stroke="#e91e8c" strokeWidth="0.5" opacity="0.08" />
            </svg>
          </div>

          {/* Text content */}
          <div style={{ position: 'absolute', left: 28, top: 36 }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: '#fff', lineHeight: 1.18, letterSpacing: '-0.5px' }}>
              Create Amazing<br />
              <span style={{ color: '#fff' }}>3D Assets for </span>
              <span style={{ color: '#e91e8c' }}>Games</span>
            </div>
            <div style={{ fontSize: 12, color: '#8a88a0', marginTop: 10, maxWidth: 340, lineHeight: 1.5 }}>
              From idea to game-ready. Models, materials, rigging, animation,<br />and more — all in one place.
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <button onClick={() => onStartPipeline?.(1)} style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px',
                background: '#e91e8c', border: 'none', borderRadius: 8,
                color: '#fff', fontWeight: 700, fontSize: 12.5, cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(233,30,140,0.35)',
              }}>+ New Project</button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 8, color: '#d0cfe0', fontWeight: 600, fontSize: 12.5, cursor: 'pointer',
              }}>▶ Watch Tutorial</button>
            </div>
          </div>

          {/* Stat pills — right side */}
          <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {STATS.map(s => (
              <div key={s.label} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, padding: '8px 14px', minWidth: 130,
                backdropFilter: 'blur(8px)',
              }}>
                <span style={{ fontSize: 18, filter: `drop-shadow(0 0 6px ${s.color}88)` }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: '#7a7890', marginTop: 1 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Italic tagline */}
          <div style={{ position: 'absolute', right: 172, bottom: 24, fontSize: 14, color: 'rgba(255,255,255,0.18)', fontStyle: 'italic', letterSpacing: '0.02em', fontWeight: 600 }}>Turn Ideas<br />into Reality</div>
        </div>

        {/* ── Quick Actions ── */}
        <div style={{ display: 'flex', gap: 10, padding: '14px 20px', borderBottom: '1px solid #1e1b2c', flexShrink: 0 }}>
          {[
            { icon: '⬇', label: 'Import Asset', sub: 'FBX, OBJ, GLTF, DAE', color: '#4a90d9', bg: 'rgba(74,144,217,0.1)' },
            { icon: '⬡', label: 'Browse Library', sub: '2,400+ ready assets', color: '#9040d0', bg: 'rgba(144,64,208,0.1)' },
            { icon: '◈', label: 'Material Library', sub: 'PBR materials & textures', color: '#e06020', bg: 'rgba(224,96,32,0.1)' },
            { icon: '🧍', label: 'Character Pipeline', sub: '11-step workflow', color: '#e91e8c', bg: 'rgba(233,30,140,0.1)' },
            { icon: '▶', label: 'Open Tutorial', sub: 'Learn step by step', color: '#27c96a', bg: 'rgba(39,201,106,0.1)' },
          ].map(a => (
            <button key={a.label} style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', background: a.bg,
              border: `1px solid ${a.color}30`, borderRadius: 10, cursor: 'pointer',
              transition: 'border-color 0.15s, transform 0.1s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = a.color; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${a.color}30`; e.currentTarget.style.transform = 'none' }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 8, background: `${a.color}22`, border: `1px solid ${a.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{a.icon}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: 11.5, color: '#e0dff0', whiteSpace: 'nowrap' }}>{a.label}</div>
                <div style={{ fontSize: 10, color: '#5a5870', marginTop: 1, whiteSpace: 'nowrap' }}>{a.sub}</div>
              </div>
            </button>
          ))}
        </div>

        {/* ── Recent Projects ── */}
        <div style={{ padding: '16px 20px 0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: '#e0dff0' }}>Recent Projects</span>
            <div style={{ flex: 1 }} />
            <button style={{ fontSize: 11, color: '#e91e8c', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>View All →</button>
          </div>
          <div style={{ display: 'flex', gap: 12, paddingBottom: 4 }}>
            {RECENT_PROJECTS.map(p => (
              <div key={p.name} style={{
                flex: 1, borderRadius: 10, border: '1px solid #1e1b2c', overflow: 'hidden',
                background: '#0f0c1a', cursor: 'pointer', transition: 'border-color 0.15s, transform 0.1s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#e91e8c60'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1b2c'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ height: 90, background: p.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, position: 'relative' }}>
                  {p.emoji}
                  <button style={{ position: 'absolute', top: 6, right: 6, width: 20, height: 20, border: 'none', background: 'rgba(0,0,0,0.4)', borderRadius: 4, color: '#888', fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⋯</button>
                </div>
                <div style={{ padding: '8px 10px' }}>
                  <div style={{ fontWeight: 600, fontSize: 11.5, color: '#ddd', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ fontSize: 9.5, color: '#4a4860', marginBottom: 6 }}>{p.ago}</div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', color: '#7a789a', border: '1px solid #2a2740' }}>{p.type}</span>
                    <StatusTag s={p.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Featured Assets Gallery ── */}
        <div style={{ padding: '16px 20px 20px', flexShrink: 0 }}>
          {/* Filter row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 4, flex: 1, flexWrap: 'wrap' }}>
              {GALLERY_FILTERS.map(f => (
                <button key={f} onClick={() => setGalleryFilter(f)} style={{
                  padding: '5px 13px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  background: galleryFilter === f ? '#e91e8c' : '#1a1728',
                  color: galleryFilter === f ? '#fff' : '#7a7890',
                  fontWeight: galleryFilter === f ? 700 : 400, fontSize: 11,
                  transition: 'all 0.12s',
                }}>{f}</button>
              ))}
            </div>
            {/* Search + controls */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <span style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: '#3a3850' }}>🔍</span>
              <input
                value={gallerySearch} onChange={e => setGallerySearch(e.target.value)}
                placeholder="Search assets..."
                style={{ background: '#1a1728', border: '1px solid #2a2535', borderRadius: 7, color: '#c0bfd0', padding: '5px 10px 5px 26px', fontSize: 11, width: 150 }}
              />
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              {[
                { ic: '⊞ Grid', active: true },
                { ic: 'Sort: Newest', active: false },
                { ic: '⊟ Filter', active: false },
              ].map(b => (
                <button key={b.ic} style={{
                  padding: '5px 10px', border: `1px solid ${b.active ? '#e91e8c60' : '#2a2535'}`,
                  borderRadius: 7, background: b.active ? 'rgba(233,30,140,0.1)' : '#1a1728',
                  color: b.active ? '#e91e8c' : '#7a7890', fontSize: 10.5, cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap',
                }}>{b.ic}</button>
              ))}
            </div>
          </div>

          {/* Asset grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
            {filteredGallery.map(a => (
              <div key={a.name} style={{
                borderRadius: 8, border: '1px solid #1e1b2c', background: '#0f0c1a',
                overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.15s, transform 0.1s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#e91e8c60'; e.currentTarget.style.transform = 'scale(1.02)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1b2c'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ height: 90, background: a.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, position: 'relative' }}>
                  {a.emoji}
                  <button style={{ position: 'absolute', top: 4, right: 4, background: 'none', border: 'none', cursor: 'pointer', color: '#3a3850', fontSize: 13, lineHeight: 1 }}>☆</button>
                </div>
                <div style={{ padding: '6px 8px' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#c0bfd0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
                  <div style={{ fontSize: 9, color: '#4a4860', marginTop: 1 }}>{a.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ RIGHT SIDEBAR ═══════════ */}
      <div style={{ width: 266, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#0f0c1a', borderLeft: '1px solid #1e1b2c', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto' }}>

          {/* Trending Assets */}
          <div style={{ padding: '14px 14px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#e0dff0' }}>Trending Assets</span>
              <div style={{ flex: 1 }} />
              <button style={{ fontSize: 10.5, color: '#e91e8c', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }}>View All →</button>
            </div>

            {/* Featured large card */}
            {TRENDING.filter(t => t.big).map(t => (
              <div key={t.name} style={{ borderRadius: 8, border: '1px solid #1e1b2c', overflow: 'hidden', marginBottom: 8, cursor: 'pointer', transition: 'border-color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#e91e8c60'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1b2c'}
              >
                <div style={{ height: 120, background: t.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, position: 'relative' }}>
                  {t.emoji}
                  <div style={{ position: 'absolute', bottom: 6, left: 8, right: 8, display: 'flex', gap: 5 }}>
                    <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.1)', color: '#aaa', border: '1px solid rgba(255,255,255,0.15)' }}>{t.cat}</span>
                    <Badge text={t.badge} />
                  </div>
                </div>
                <div style={{ padding: '8px 10px' }}>
                  <div style={{ fontWeight: 600, fontSize: 12, color: '#ddd' }}>{t.name}</div>
                </div>
              </div>
            ))}

            {/* Small trending row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 16 }}>
              {TRENDING.filter(t => !t.big).map(t => (
                <div key={t.name} style={{ borderRadius: 7, border: '1px solid #1e1b2c', overflow: 'hidden', cursor: 'pointer' }}>
                  <div style={{ height: 56, background: t.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{t.emoji}</div>
                  <div style={{ padding: '4px 6px' }}>
                    <div style={{ fontSize: 9, fontWeight: 600, color: '#c0bfd0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</div>
                    <div style={{ display: 'flex', gap: 3, marginTop: 2, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 8, color: '#4a4860' }}>{t.cat}</span>
                      <Badge text={t.badge} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#1e1b2c', margin: '0 14px' }} />

          {/* Templates */}
          <div style={{ padding: '14px 14px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#e0dff0' }}>Templates</span>
              <div style={{ flex: 1 }} />
              <button style={{ fontSize: 10.5, color: '#e91e8c', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }}>View All →</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {TEMPLATES.map(t => (
                <div key={t.name} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
                  background: '#0d0a14', border: '1px solid #1e1b2c', borderRadius: 8, cursor: 'pointer',
                  transition: 'border-color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#e91e8c50'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1b2c'}
                >
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: `${t.color}22`, border: `1px solid ${t.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{t.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#d0cfe0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</div>
                    <div style={{ fontSize: 9.5, color: '#4a4860', marginTop: 1 }}>{t.tris}</div>
                  </div>
                  <Badge text={t.badge} />
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#1e1b2c', margin: '14px 14px 0' }} />

          {/* Recent Activity */}
          <div style={{ padding: '14px 14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#e0dff0' }}>Recent Activity</span>
              <div style={{ flex: 1 }} />
              <button style={{ fontSize: 10.5, color: '#e91e8c', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>View All →</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {ACTIVITY.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: `${a.color}18`, border: `1px solid ${a.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>{a.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10.5, color: '#b0afc8', fontWeight: 500, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.label}</div>
                    {a.detail && <div style={{ fontSize: 9.5, color: '#4a4860', marginTop: 1 }}>{a.detail}</div>}
                  </div>
                  <span style={{ fontSize: 9, color: '#3a3850', flexShrink: 0, marginTop: 1 }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
