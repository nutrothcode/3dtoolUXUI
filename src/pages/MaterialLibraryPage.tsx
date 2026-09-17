import { useState } from 'react'
import { Icons } from '../components/Icon'

const MAT_CATS = [
  { id: 'all', label: 'All Materials', count: 233 },
  { id: 'fav', label: 'Favorites', count: 8 },
  { id: 'glass', label: 'Glass', count: 8 },
  { id: 'plastic', label: 'Plastic', count: 7 },
  { id: 'metal', label: 'Metal', count: 12 },
  { id: 'wood', label: 'Wood', count: 10 },
  { id: 'stone', label: 'Stone', count: 8 },
  { id: 'ceramic', label: 'Ceramic', count: 7 },
  { id: 'fabric', label: 'Fabric', count: 12 },
  { id: 'leather', label: 'Leather', count: 8 },
  { id: 'nature', label: 'Nature', count: 18 },
  { id: 'organic', label: 'Organic', count: 14 },
  { id: 'food', label: 'Food', count: 20 },
  { id: 'liquid', label: 'Liquid', count: 10 },
  { id: 'skin', label: 'Skin', count: 12 },
  { id: 'special', label: 'Special', count: 12 },
]

const MATERIALS = [
  { id: 'm01', name: 'MAT_Aluminum', type: 'Metal', cat: 'metal', c1: '#c8d0d8', c2: '#606880', shine: true, rough: 0.2, metal: 1.0, fav: false },
  { id: 'm02', name: 'MAT_Gold', type: 'Metal', cat: 'metal', c1: '#d4a830', c2: '#806020', shine: true, rough: 0.15, metal: 1.0, fav: true },
  { id: 'm03', name: 'MAT_Iron', type: 'Metal', cat: 'metal', c1: '#808090', c2: '#404048', shine: false, rough: 0.5, metal: 0.9, fav: false },
  { id: 'm04', name: 'MAT_Glass_Clear', type: 'Glass', cat: 'glass', c1: '#a0c8e8', c2: '#4080a0', shine: true, rough: 0.0, metal: 0.0, fav: false },
  { id: 'm05', name: 'MAT_Glass_Tinted', type: 'Glass', cat: 'glass', c1: '#408060', c2: '#204030', shine: true, rough: 0.05, metal: 0.0, fav: false },
  { id: 'm06', name: 'MAT_Oak_Wood', type: 'Wood', cat: 'wood', c1: '#a06030', c2: '#603818', shine: false, rough: 0.7, metal: 0.0, fav: true },
  { id: 'm07', name: 'MAT_Dark_Wood', type: 'Wood', cat: 'wood', c1: '#402810', c2: '#201408', shine: false, rough: 0.6, metal: 0.0, fav: false },
  { id: 'm08', name: 'MAT_Marble', type: 'Stone', cat: 'stone', c1: '#e0dcd4', c2: '#a0a0a0', shine: true, rough: 0.25, metal: 0.0, fav: false },
  { id: 'm09', name: 'MAT_Concrete', type: 'Stone', cat: 'stone', c1: '#848484', c2: '#484848', shine: false, rough: 0.9, metal: 0.0, fav: false },
  { id: 'm10', name: 'MAT_Brick', type: 'Stone', cat: 'stone', c1: '#904030', c2: '#502018', shine: false, rough: 0.85, metal: 0.0, fav: false },
  { id: 'm11', name: 'MAT_Skin_Base', type: 'Skin', cat: 'skin', c1: '#d49870', c2: '#a06840', shine: false, rough: 0.6, metal: 0.0, fav: true },
  { id: 'm12', name: 'MAT_Skin_Dark', type: 'Skin', cat: 'skin', c1: '#804030', c2: '#501828', shine: false, rough: 0.55, metal: 0.0, fav: false },
  { id: 'm13', name: 'MAT_Denim', type: 'Fabric', cat: 'fabric', c1: '#3050a0', c2: '#203070', shine: false, rough: 0.95, metal: 0.0, fav: false },
  { id: 'm14', name: 'MAT_Leather_Brown', type: 'Leather', cat: 'leather', c1: '#704020', c2: '#401808', shine: false, rough: 0.45, metal: 0.0, fav: false },
  { id: 'm15', name: 'MAT_Plastic_Red', type: 'Plastic', cat: 'plastic', c1: '#c02020', c2: '#801010', shine: true, rough: 0.3, metal: 0.0, fav: false },
  { id: 'm16', name: 'MAT_Plastic_White', type: 'Plastic', cat: 'plastic', c1: '#dcdce0', c2: '#a0a0a8', shine: true, rough: 0.35, metal: 0.0, fav: false },
  { id: 'm17', name: 'MAT_Water', type: 'Liquid', cat: 'liquid', c1: '#3070c0', c2: '#103060', shine: true, rough: 0.0, metal: 0.0, fav: false },
  { id: 'm18', name: 'MAT_Grass', type: 'Nature', cat: 'nature', c1: '#408020', c2: '#205010', shine: false, rough: 0.9, metal: 0.0, fav: false },
]

function Sphere({ c1, c2, shine, size = 64 }: { c1: string; c2: string; shine: boolean; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: `radial-gradient(circle at 35% 35%, ${c1}, ${c2} 70%, #0a0810)`,
      boxShadow: shine
        ? `inset -${size * 0.08}px -${size * 0.08}px ${size * 0.2}px rgba(0,0,0,0.6), inset ${size * 0.05}px ${size * 0.05}px ${size * 0.15}px rgba(255,255,255,0.2)`
        : `inset -${size * 0.08}px -${size * 0.08}px ${size * 0.2}px rgba(0,0,0,0.7)`,
      border: '1px solid var(--border)',
    }} />
  )
}

function Bar({ val, color }: { val: number; color: string }) {
  return (
    <div style={{ height: 3, background: 'var(--bg-panel-3)', borderRadius: 2, flex: 1 }}>
      <div style={{ height: '100%', width: `${val * 100}%`, background: color, borderRadius: 2 }} />
    </div>
  )
}

export default function MaterialLibraryPage() {
  const [cat, setCat] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('m11')
  const [favs, setFavs] = useState(new Set(['m02', 'm06', 'm11']))
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const toggleFav = (id: string) => setFavs(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  const filtered = MATERIALS.filter(m => {
    if (cat === 'fav' && !favs.has(m.id)) return false
    if (cat !== 'all' && cat !== 'fav' && m.cat !== cat) return false
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const sel = MATERIALS.find(m => m.id === selected) || MATERIALS[10]

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: 'var(--bg-app)' }}>

      {/* ── LEFT: Categories ── */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--bg-panel)', borderRight: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ padding: '10px 12px 6px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Materials</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 6px' }}>
          {MAT_CATS.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} style={{
              width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '5px 8px', border: 'none', cursor: 'pointer', borderRadius: 5, marginBottom: 1,
              background: cat === c.id ? 'var(--accent)' : 'transparent',
              transition: 'background 0.1s',
            }}
              onMouseEnter={e => { if (cat !== c.id) e.currentTarget.style.background = 'var(--bg-hover)' }}
              onMouseLeave={e => { if (cat !== c.id) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: 11, color: cat === c.id ? '#fff' : 'var(--text-secondary)' }}>{c.label}</span>
              <span style={{ fontSize: 10, color: cat === c.id ? 'rgba(255,255,255,0.65)' : 'var(--text-muted)' }}>{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── CENTER: Browser ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Toolbar */}
        <div style={{
          height: 'var(--toolbar-h)', display: 'flex', alignItems: 'center', gap: 6,
          padding: '0 10px', background: 'var(--bg-panel-2)', borderBottom: '1px solid var(--border)', flexShrink: 0,
        }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
            <Icons.Search size={12} color="var(--text-dim)" style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search materials..."
              style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', color: 'var(--text-primary)', padding: '4px 8px 4px 26px', fontSize: 11 }} />
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 2 }}>
            {(['grid', 'list'] as const).map(v => {
              const Ic = v === 'grid' ? Icons.Grid : Icons.List
              return (
                <button key={v} onClick={() => setViewMode(v)} style={{
                  width: 28, height: 28, border: `1px solid ${viewMode === v ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 'var(--r-md)', background: viewMode === v ? 'var(--accent-lo)' : 'var(--bg-input)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: viewMode === v ? 'var(--accent)' : 'var(--text-muted)',
                }}><Ic size={13} color="currentColor" /></button>
              )
            })}
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '0 10px', height: 28, border: '1px solid var(--border)', borderRadius: 'var(--r-md)', background: 'var(--bg-input)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 11 }}>
            <Icons.Upload size={12} color="currentColor" /> Import
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '0 10px', height: 28, border: '1px solid var(--border)', borderRadius: 'var(--r-md)', background: 'var(--bg-input)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 11 }}>
            <Icons.Plus size={12} color="currentColor" /> New
          </button>
        </div>

        {/* Grid / List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 10 }}>
          {viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8 }}>
              {filtered.map(mat => (
                <div key={mat.id} onClick={() => setSelected(mat.id)} style={{
                  borderRadius: 'var(--r-lg)', border: `1.5px solid ${selected === mat.id ? 'var(--accent)' : 'var(--border)'}`,
                  background: selected === mat.id ? 'var(--accent-lo)' : 'var(--bg-panel-2)',
                  padding: 8, cursor: 'pointer', position: 'relative',
                  transition: 'border-color 0.1s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                    <Sphere c1={mat.c1} c2={mat.c2} shine={mat.shine} size={60} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mat.name.replace('MAT_', '')}</div>
                  <div style={{ fontSize: 9, color: 'var(--accent)', marginTop: 1 }}>{mat.type}</div>
                  <button onClick={e => { e.stopPropagation(); toggleFav(mat.id) }} style={{
                    position: 'absolute', top: 6, right: 6, background: 'none', border: 'none', cursor: 'pointer',
                    padding: 0, lineHeight: 1,
                  }}>
                    <Icons.Star size={12} color={favs.has(mat.id) ? '#f0c040' : 'var(--text-dim)'} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {filtered.map(mat => (
                <div key={mat.id} onClick={() => setSelected(mat.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px',
                  borderRadius: 'var(--r-md)', border: `1px solid ${selected === mat.id ? 'var(--accent)' : 'transparent'}`,
                  background: selected === mat.id ? 'var(--accent-lo)' : 'var(--bg-panel-2)',
                  cursor: 'pointer',
                }}>
                  <Sphere c1={mat.c1} c2={mat.c2} shine={mat.shine} size={32} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-primary)' }}>{mat.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--accent)' }}>{mat.type}</div>
                  </div>
                  <span style={{ fontSize: 9.5, color: 'var(--text-muted)' }}>R {mat.rough.toFixed(1)}</span>
                  <span style={{ fontSize: 9.5, color: 'var(--text-muted)' }}>M {mat.metal.toFixed(1)}</span>
                  <button onClick={e => { e.stopPropagation(); toggleFav(mat.id) }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <Icons.Star size={12} color={favs.has(mat.id) ? '#f0c040' : 'var(--text-dim)'} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT: Inspector ── */}
      <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--bg-panel)', borderLeft: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: 12, color: 'var(--text-primary)', flexShrink: 0 }}>Inspector</div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          {/* Preview */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <Sphere c1={sel.c1} c2={sel.c2} shine={sel.shine} size={100} />
          </div>

          <div style={{ fontWeight: 700, fontSize: 12.5, color: 'var(--text-primary)', marginBottom: 2 }}>{sel.name}</div>
          <div style={{ fontSize: 10.5, color: 'var(--accent)', marginBottom: 12 }}>{sel.type}</div>

          {/* Properties */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            {[
              { label: 'Roughness', val: sel.rough, color: '#808090' },
              { label: 'Metallic', val: sel.metal, color: '#c0c8d0' },
              { label: 'Opacity', val: 1.0, color: '#80c0e0' },
              { label: 'Emission', val: 0.0, color: '#e0c060' },
            ].map(p => (
              <div key={p.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 10.5, color: 'var(--text-secondary)' }}>{p.label}</span>
                  <span style={{ fontSize: 10.5, color: 'var(--text-primary)', fontWeight: 500 }}>{p.val.toFixed(2)}</span>
                </div>
                <Bar val={p.val} color={p.color} />
              </div>
            ))}
          </div>

          {/* Texture slots */}
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Texture Slots</div>
          {['Base Color', 'Normal', 'Roughness', 'Metallic', 'AO', 'Opacity', 'Emission'].map(slot => (
            <div key={slot} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid var(--border-2)', fontSize: 10.5 }}>
              <span style={{ color: 'var(--text-secondary)' }}>{slot}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>— None</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ padding: 10, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}>
          <button style={{ padding: '7px', border: 'none', borderRadius: 'var(--r-md)', background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: 11.5, cursor: 'pointer' }}>Apply Material</button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
            {['Save', 'Duplicate', 'Rename', 'Delete'].map((a, i) => (
              <button key={a} style={{
                padding: '5px', border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
                background: i === 3 ? 'rgba(224,64,64,0.1)' : 'var(--bg-input)',
                color: i === 3 ? 'var(--danger)' : 'var(--text-secondary)',
                fontSize: 10.5, cursor: 'pointer',
              }}>{a}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
