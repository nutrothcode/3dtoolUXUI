import { useState } from 'react'

/* ─── data ─── */
const CATEGORIES = [
  { label: 'All Assets', count: 1238, id: 'all' },
  { label: 'Characters', count: 328, id: 'chars', children: [
    { label: 'Human', count: 120, id: 'human' },
    { label: 'Head', count: 68, id: 'head' },
    { label: 'Hair', count: 54, id: 'hair' },
    { label: 'Eyes', count: 36, id: 'eyes' },
    { label: 'Mouth', count: 32, id: 'mouth' },
    { label: 'Teeth', count: 28, id: 'teeth' },
    { label: 'Body', count: 40, id: 'body' },
    { label: 'Hand', count: 24, id: 'hand' },
    { label: 'Foot', count: 22, id: 'foot' },
    { label: 'Clothing', count: 86, id: 'clothing' },
    { label: 'Accessories', count: 64, id: 'acc' },
  ]},
  { label: 'Props', count: 240, id: 'props' },
  { label: 'Environments', count: 180, id: 'envs' },
  { label: 'Food & Drink', count: 120, id: 'food' },
  { label: 'Vehicles', count: 56, id: 'vehicles' },
  { label: 'Animals', count: 54, id: 'animals' },
  { label: 'Plants', count: 92, id: 'plants' },
  { label: 'Buildings', count: 64, id: 'buildings' },
  { label: 'Materials', count: 0, id: 'materials' },
  { label: 'Textures', count: 0, id: 'textures' },
  { label: 'My Library', count: 0, id: 'mylib' },
]

const ASSETS = [
  { id: 'hm01', name: 'Head_Male_01', emoji: '👱', fav: true, sub: 'Human / Head' },
  { id: 'hf01', name: 'Head_Female_01', emoji: '👩', fav: true, sub: 'Human / Head' },
  { id: 'hm02', name: 'Hair_Male_01', emoji: '💈', fav: false, sub: 'Human / Hair' },
  { id: 'hf02', name: 'Hair_Female_01', emoji: '💇', fav: true, sub: 'Human / Hair' },
  { id: 'es01', name: 'Eye_Set_01', emoji: '👁', fav: false, sub: 'Human / Eyes' },
  { id: 'es02', name: 'Eye_Set_02', emoji: '👁', fav: false, sub: 'Human / Eyes' },
  { id: 'el01', name: 'Eyelash_01', emoji: '✨', fav: false, sub: 'Human / Eyes' },
  { id: 'eb01', name: 'Eyebrow_01', emoji: '〰', fav: false, sub: 'Human / Eyes' },
  { id: 'tu01', name: 'Teeth_Upper', emoji: '🦷', fav: false, sub: 'Human / Teeth' },
  { id: 'tl01', name: 'Teeth_Lower', emoji: '🦷', fav: false, sub: 'Human / Teeth' },
  { id: 'mo01', name: 'Mouth_01', emoji: '👄', fav: false, sub: 'Human / Mouth' },
  { id: 'to01', name: 'Tongue_01', emoji: '👅', fav: false, sub: 'Human / Mouth' },
  { id: 'bm01', name: 'Body_Male_Base', emoji: '🧍', fav: true, sub: 'Human / Body' },
  { id: 'bf01', name: 'Body_Female_Base', emoji: '🧍‍♀️', fav: true, sub: 'Human / Body' },
  { id: 'hl01', name: 'Hand_L_01', emoji: '✋', fav: false, sub: 'Human / Hand' },
  { id: 'fl01', name: 'Foot_L_01', emoji: '🦶', fav: false, sub: 'Human / Foot' },
  { id: 'cs01', name: 'Cloth_Shirt_01', emoji: '👕', fav: false, sub: 'Clothing' },
  { id: 'cp01', name: 'Cloth_Pants_01', emoji: '👖', fav: false, sub: 'Clothing' },
  { id: 'csh01', name: 'Cloth_Shoes_01', emoji: '👟', fav: false, sub: 'Clothing' },
  { id: 'ah01', name: 'Accessory_Hat_01', emoji: '🧢', fav: false, sub: 'Accessories' },
]

const CHAR_PARTS = [
  { name: 'Body_Male_Base', visible: true, locked: false, color: '#4a90d9' },
  { name: 'Head_Female_01', visible: true, locked: false, color: '#e91e8c' },
  { name: 'Hair_Female_01', visible: true, locked: false, color: '#f0c040' },
  { name: 'Eye_Set_01', visible: true, locked: false, color: '#27c96a' },
  { name: 'Teeth_Upper', visible: true, locked: false, color: '#80a0c0' },
  { name: 'Cloth_Shirt_01', visible: true, locked: false, color: '#a060d0' },
]

const MATERIALS = [
  { name: 'MAT_Aluminum', type: 'METAL', color: '#c0c8d0', shine: true },
  { name: 'MAT_Asphalt', type: 'SPECIAL', color: '#303035', shine: false },
  { name: 'MAT_Bamboo', type: 'BAMBOO', color: '#8a9a40', shine: false },
  { name: 'MAT_Brick', type: 'BRICK', color: '#8a4030', shine: false },
  { name: 'MAT_Ceramic', type: 'CERAMIC', color: '#e0dcd0', shine: true },
  { name: 'MAT_Cloth', type: 'FABRIC', color: '#7080a0', shine: false },
  { name: 'MAT_Glass', type: 'GLASS', color: '#80c0e0', shine: true },
  { name: 'MAT_Leather', type: 'LEATHER', color: '#5a3020', shine: false },
  { name: 'MAT_Skin', type: 'SKIN', color: '#d4907060', shine: false },
  { name: 'MAT_Wood', type: 'WOOD', color: '#6a4020', shine: false },
  { name: 'MAT_Water', type: 'LIQUID', color: '#3080c0', shine: true },
  { name: 'MAT_Plastic', type: 'PLASTIC', color: '#c0c0c0', shine: true },
]

const MAT_CATS = [
  'All (233)', 'Favorites (8)', '01 GLASS (8)', '02 PLASTIC (7)', '03 METAL (12)',
  '04 WOOD (10)', '05 STONE (8)', '06 CERAMIC (7)', '07 FABRIC (12)', '08 LEATHER (8)',
  '09 NATURE (18)', '10 ORGANIC (14)', '11 FOOD (20)', '12 LIQUID (10)', '13 SKIN (12)', '14 SPECIAL (12)',
]

const INSP_SECTIONS = ['Textures', 'UV', 'Retopology', 'Rig / Skin', 'Blend Shapes', 'Physics', 'LOD', 'Metadata']

/* ─── sub-components ─── */
function Checkbox({ checked }: { checked?: boolean }) {
  return (
    <input type="checkbox" defaultChecked={checked}
      style={{ accentColor: 'var(--pink)', width: 12, height: 12, cursor: 'pointer' }} />
  )
}

function EyeIcon({ vis }: { vis: boolean }) {
  return <span style={{ fontSize: 11, color: vis ? 'var(--t2)' : 'var(--t3)', cursor: 'pointer' }}>👁</span>
}

/* ─── Material sphere ─── */
function MatSphere({ mat }: { mat: typeof MATERIALS[0] }) {
  return (
    <div style={{ cursor: 'pointer' }}>
      <div style={{
        width: '100%', aspectRatio: '1', borderRadius: 6,
        background: `radial-gradient(circle at 35% 35%, ${mat.color}ff, ${mat.color}88 50%, #101418)`,
        boxShadow: mat.shine ? `inset -4px -4px 12px rgba(0,0,0,0.5), inset 2px 2px 8px rgba(255,255,255,0.25)` : `inset -4px -4px 12px rgba(0,0,0,0.6)`,
        border: '1px solid var(--bd)', marginBottom: 4,
      }} />
      <div style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--txt)', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mat.name}</div>
      <div style={{ fontSize: 8.5, color: 'var(--pink)', fontWeight: 500 }}>{mat.type}</div>
    </div>
  )
}

/* ─── main component ─── */
export default function AssetLibraryPage() {
  const [libTab, setLibTab] = useState('Models')
  const [selectedCat, setSelectedCat] = useState('chars')
  const [charsOpen, setCharsOpen] = useState(true)
  const [selectedAsset, setSelectedAsset] = useState('hf01')
  const [favs, setFavs] = useState<Set<string>>(new Set(['hm01', 'hf01', 'hf02', 'bm01', 'bf01']))
  const [viewportTab, setViewportTab] = useState('Viewport')
  const [mergeTab, setMergeTab] = useState('Parts')
  const [fittingTab, setFittingTab] = useState('Fitting')
  const [matCat, setMatCat] = useState('All (233)')
  const [inspTab, setInspTab] = useState('Inspector')
  const [openSections, setOpenSections] = useState(new Set(['Transform', 'Mesh', 'Materials']))
  const [searchVal, setSearchVal] = useState('')
  const [previewMode, setPreviewMode] = useState('Head')

  const toggleSection = (s: string) =>
    setOpenSections(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n })
  const toggleFav = (id: string) =>
    setFavs(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  const filtered = searchVal
    ? ASSETS.filter(a => a.name.toLowerCase().includes(searchVal.toLowerCase()))
    : ASSETS

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: 'var(--bg)', fontSize: 11 }}>

      {/* ══════════ LEFT — Asset Library ══════════ */}
      <div style={{ width: 380, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderRight: '1px solid var(--bd)' }}>

        {/* Panel header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid var(--bd)', flexShrink: 0 }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--txt)' }}>Asset Library</span>
          <div style={{ flex: 1 }} />
          <button style={{ width: 20, height: 20, border: '1px solid var(--bd)', borderRadius: 4, background: 'var(--p4)', color: 'var(--t2)', fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Tabs: Models / Prefabs / My Assets / Favorites */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--bd)', flexShrink: 0 }}>
          {[
            { id: 'Models', icon: '⬡' },
            { id: 'Prefabs', icon: '⊞' },
            { id: 'My Assets', icon: '📁' },
            { id: 'Favorites', icon: '★' },
          ].map(t => (
            <button key={t.id} onClick={() => setLibTab(t.id)} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
              padding: '7px 4px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 10.5, fontWeight: 500,
              color: libTab === t.id ? 'var(--pink)' : 'var(--t2)',
              borderBottom: `2px solid ${libTab === t.id ? 'var(--pink)' : 'transparent'}`, marginBottom: -1,
            }}>
              <span style={{ fontSize: 12 }}>{t.icon}</span>{t.id}
            </button>
          ))}
        </div>

        {/* Search + controls */}
        <div style={{ display: 'flex', gap: 6, padding: '8px 10px', borderBottom: '1px solid var(--bd)', flexShrink: 0 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 7, top: '50%', transform: 'translateY(-50%)', color: 'var(--t3)', fontSize: 11 }}>🔍</span>
            <input
              value={searchVal} onChange={e => setSearchVal(e.target.value)}
              placeholder="Search assets..."
              style={{ width: '100%', background: 'var(--p3)', border: '1px solid var(--bd)', borderRadius: 5, color: 'var(--txt)', padding: '4px 8px 4px 24px', fontSize: 10.5 }}
            />
          </div>
          {['⊟', '⊞', '▦'].map((ic, i) => (
            <button key={i} style={{ width: 26, height: 26, border: '1px solid var(--bd)', borderRadius: 4, background: 'var(--p3)', color: 'var(--t2)', fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ic}</button>
          ))}
        </div>

        {/* Category tree + grid */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Category tree */}
          <div style={{ width: 160, flexShrink: 0, overflowY: 'auto', borderRight: '1px solid var(--bd)', padding: '6px 0' }}>
            {CATEGORIES.map(cat => (
              <div key={cat.id}>
                <div
                  onClick={() => { setSelectedCat(cat.id); if (cat.id === 'chars') setCharsOpen(o => !o) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px',
                    cursor: 'pointer', borderRadius: 0,
                    background: selectedCat === cat.id ? 'var(--pink)' : selectedCat !== 'all' && cat.children?.some(c => c.id === selectedCat) ? 'rgba(233,30,140,0.1)' : 'transparent',
                    color: selectedCat === cat.id ? '#fff' : 'var(--txt)',
                  }}
                >
                  {cat.children && (
                    <span style={{ fontSize: 8, color: selectedCat === cat.id ? '#fff' : 'var(--t3)', width: 10 }}>
                      {charsOpen && cat.id === 'chars' ? '▼' : '▶'}
                    </span>
                  )}
                  {!cat.children && <span style={{ width: 10 }} />}
                  <span style={{ flex: 1, fontSize: 10.5 }}>{cat.label}</span>
                  <span style={{ fontSize: 9.5, color: selectedCat === cat.id ? 'rgba(255,255,255,0.7)' : 'var(--t3)' }}>{cat.count}</span>
                </div>
                {cat.children && charsOpen && cat.id === 'chars' && cat.children.map(sub => (
                  <div key={sub.id} onClick={() => setSelectedCat(sub.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '3px 10px 3px 22px', cursor: 'pointer',
                    background: selectedCat === sub.id ? 'rgba(233,30,140,0.15)' : 'transparent',
                    color: selectedCat === sub.id ? 'var(--pink)' : 'var(--t2)',
                  }}>
                    <span style={{ flex: 1, fontSize: 10.5 }}>{sub.label}</span>
                    <span style={{ fontSize: 9.5, color: 'var(--t3)' }}>{sub.count}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Asset grid */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 8, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, alignContent: 'start' }}>
            {filtered.map(asset => (
              <div key={asset.id} onClick={() => setSelectedAsset(asset.id)} style={{ cursor: 'pointer', position: 'relative' }}>
                <div style={{
                  borderRadius: 6, overflow: 'hidden',
                  border: `2px solid ${selectedAsset === asset.id ? 'var(--pink)' : 'var(--bd)'}`,
                  background: selectedAsset === asset.id ? 'rgba(233,30,140,0.08)' : 'var(--p3)',
                  transition: 'border-color 0.1s',
                }}>
                  <div style={{
                    height: 68, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, background: 'linear-gradient(135deg, #1a1d26, #0e1018)',
                  }}>{asset.emoji}</div>
                  {/* Star */}
                  <button onClick={e => { e.stopPropagation(); toggleFav(asset.id) }} style={{
                    position: 'absolute', top: 4, right: 4,
                    background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, lineHeight: 1,
                    color: favs.has(asset.id) ? '#f0c040' : 'var(--t3)',
                  }}>★</button>
                </div>
                <div style={{ fontSize: 9, color: 'var(--txt)', marginTop: 3, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{asset.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Character Assembly */}
        <div style={{ borderTop: '1px solid var(--bd)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '6px 10px', borderBottom: '1px solid var(--bd)' }}>
            <span style={{ fontWeight: 600, fontSize: 11.5, color: 'var(--txt)' }}>Character Assembly</span>
            <div style={{ flex: 1 }} />
            <button style={{ width: 18, height: 18, border: 'none', background: 'none', color: 'var(--t2)', cursor: 'pointer', fontSize: 12 }}>✕</button>
          </div>
          <div style={{ maxHeight: 160, overflowY: 'auto' }}>
            {CHAR_PARTS.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderBottom: '1px solid rgba(42,45,62,0.5)' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--pink)', width: 12, height: 12 }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 10.5, color: 'var(--txt)' }}>{p.name}</span>
                <EyeIcon vis={p.visible} />
                <span style={{ fontSize: 11, color: 'var(--t3)', cursor: 'pointer' }}>🔒</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '6px 10px' }}>
            <button style={{ width: '100%', padding: '4px', border: '1px dashed var(--bd)', borderRadius: 4, background: 'none', color: 'var(--t2)', fontSize: 10.5, cursor: 'pointer' }}>+ Add Part</button>
          </div>
        </div>
      </div>

      {/* ══════════ CENTER ══════════ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Viewport tabs */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--p2)', borderBottom: '1px solid var(--bd)', flexShrink: 0, height: 36 }}>
          {['Viewport', 'Render Preview', 'Animation Preview'].map(t => (
            <button key={t} onClick={() => setViewportTab(t)} style={{
              padding: '0 14px', height: '100%', border: 'none', background: viewportTab === t ? 'var(--p3)' : 'none',
              cursor: 'pointer', fontSize: 11, fontWeight: 500,
              color: viewportTab === t ? 'var(--txt)' : 'var(--t2)',
              borderBottom: `2px solid ${viewportTab === t ? 'var(--pink)' : 'transparent'}`,
            }}>{t}</button>
          ))}
          <div style={{ flex: 1 }} />
          <button style={{ width: 24, height: 24, border: '1px solid var(--bd)', borderRadius: 4, background: 'var(--p3)', color: 'var(--t2)', fontSize: 11, cursor: 'pointer', marginRight: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Viewport controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'var(--p2)', borderBottom: '1px solid var(--bd)', flexShrink: 0 }}>
          <button style={{ padding: '2px 10px', border: '1px solid var(--pink)', borderRadius: 4, background: 'rgba(233,30,140,0.12)', color: 'var(--pink)', fontSize: 10.5, cursor: 'pointer', fontWeight: 600 }}>⊙ Perspective</button>
          <button style={{ padding: '2px 10px', border: '1px solid var(--bd)', borderRadius: 4, background: 'var(--p3)', color: 'var(--t2)', fontSize: 10.5, cursor: 'pointer' }}>☀ Lit</button>
          <button style={{ padding: '2px 10px', border: '1px solid var(--bd)', borderRadius: 4, background: 'var(--p3)', color: 'var(--t2)', fontSize: 10.5, cursor: 'pointer' }}>⏱</button>
          <button style={{ padding: '2px 10px', border: '1px solid var(--bd)', borderRadius: 4, background: 'var(--p3)', color: 'var(--t2)', fontSize: 10.5, cursor: 'pointer' }}>Show</button>
          <div style={{ flex: 1 }} />
          {['⊞', '⊡', '⟳', '⊠', '✕'].map((ic, i) => (
            <button key={i} style={{ width: 24, height: 24, border: '1px solid var(--bd)', borderRadius: 3, background: 'var(--p3)', color: 'var(--t2)', fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ic}</button>
          ))}
        </div>

        {/* Main viewport area */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
          {/* 3D viewport */}
          <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(160deg, #0e1220 0%, #090b14 60%, #0c0e18 100%)', overflow: 'hidden' }}>
            {/* Floor grid */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', backgroundImage: 'linear-gradient(rgba(42,45,62,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(42,45,62,0.4) 1px, transparent 1px)', backgroundSize: '36px 36px', transform: 'perspective(500px) rotateX(55deg)', transformOrigin: 'bottom center', opacity: 0.6 }} />

            {/* Realistic-looking female character */}
            <div style={{ position: 'absolute', top: '4%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <svg width="220" height="480" viewBox="0 0 220 480" style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.8))' }}>
                {/* Hair back */}
                <ellipse cx="110" cy="28" rx="36" ry="42" fill="#1a0c06" />
                {/* Neck */}
                <rect x="100" y="65" width="20" height="28" rx="8" fill="#d4947080" />
                {/* Head */}
                <ellipse cx="110" cy="45" rx="34" ry="40" fill="#d49470" />
                {/* Face details */}
                <ellipse cx="98" cy="42" rx="8" ry="5" fill="#1a0c06" opacity="0.7" />
                <ellipse cx="122" cy="42" rx="8" ry="5" fill="#1a0c06" opacity="0.7" />
                <circle cx="98" cy="42" r="4" fill="#3a2010" />
                <circle cx="122" cy="42" r="4" fill="#3a2010" />
                <circle cx="100" cy="41" r="1.5" fill="#ffffff" opacity="0.8" />
                <circle cx="124" cy="41" r="1.5" fill="#ffffff" opacity="0.8" />
                <path d="M 100 60 Q 110 66 120 60" fill="none" stroke="#c07060" strokeWidth="1.8" strokeLinecap="round" />
                <ellipse cx="96" cy="56" rx="3.5" ry="2" fill="#e08090" opacity="0.5" />
                <ellipse cx="124" cy="56" rx="3.5" ry="2" fill="#e08090" opacity="0.5" />
                {/* Hair front */}
                <path d="M 76 25 Q 80 -2 110 0 Q 140 -2 144 25 Q 138 10 110 8 Q 82 10 76 25 Z" fill="#1a0c06" />
                <path d="M 76 25 Q 74 45 78 65 L 82 75" fill="none" stroke="#1a0c06" strokeWidth="12" strokeLinecap="round" />
                <path d="M 144 25 Q 146 45 142 65 L 145 90 Q 155 120 158 160" fill="none" stroke="#1a0c06" strokeWidth="14" strokeLinecap="round" />
                {/* Torso / black top */}
                <path d="M 82 92 Q 110 82 138 92 L 144 200 Q 118 214 110 215 Q 102 214 76 200 Z" fill="#1a1a20" />
                {/* Bra straps */}
                <line x1="96" y1="92" x2="92" y2="80" stroke="#303040" strokeWidth="3" />
                <line x1="124" y1="92" x2="128" y2="80" stroke="#303040" strokeWidth="3" />
                {/* Arms */}
                <path d="M 82 92 Q 60 110 44 160 Q 40 185 42 220" fill="none" stroke="#d49470" strokeWidth="20" strokeLinecap="round" />
                <path d="M 138 92 Q 160 110 176 160 Q 180 185 178 220" fill="none" stroke="#d49470" strokeWidth="20" strokeLinecap="round" />
                {/* Hands */}
                <ellipse cx="42" cy="230" rx="10" ry="14" fill="#d49470" />
                <ellipse cx="178" cy="230" rx="10" ry="14" fill="#d49470" />
                {/* Pants/shorts */}
                <path d="M 76 200 Q 70 260 65 330 L 68 430" fill="none" stroke="#303848" strokeWidth="30" strokeLinecap="round" />
                <path d="M 144 200 Q 150 260 155 330 L 152 430" fill="none" stroke="#303848" strokeWidth="30" strokeLinecap="round" />
                {/* Shoes */}
                <ellipse cx="68" cy="438" rx="18" ry="10" fill="#1a1a20" />
                <ellipse cx="152" cy="438" rx="18" ry="10" fill="#1a1a20" />
                {/* Waist band */}
                <rect x="76" y="196" width="68" height="12" rx="4" fill="#242838" />
              </svg>
            </div>

            {/* Gizmo */}
            <div style={{ position: 'absolute', top: 12, right: 12 }}>
              <svg width="60" height="60" viewBox="0 0 60 60">
                <line x1="30" y1="30" x2="30" y2="5" stroke="#50c060" strokeWidth="2" />
                <polygon points="30,2 27,8 33,8" fill="#50c060" />
                <text x="28" y="16" fill="#50c060" fontSize="8" fontWeight="700">Y</text>
                <line x1="30" y1="30" x2="55" y2="45" stroke="#e05050" strokeWidth="2" />
                <polygon points="58,47 52,43 53,49" fill="#e05050" />
                <text x="50" y="54" fill="#e05050" fontSize="8" fontWeight="700">X</text>
                <line x1="30" y1="30" x2="5" y2="45" stroke="#5090e0" strokeWidth="2" />
                <polygon points="2,47 8,43 7,49" fill="#5090e0" />
                <text x="0" y="54" fill="#5090e0" fontSize="8" fontWeight="700">Z</text>
              </svg>
            </div>

            {/* Side views strip */}
            <div style={{ position: 'absolute', right: 10, top: 70, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['Front', 'Side', 'Back'].map(v => (
                <div key={v} style={{ textAlign: 'center' }}>
                  <div style={{ width: 60, height: 80, background: '#0a0c14', border: '1px solid var(--bd)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🧍‍♀️</div>
                  <div style={{ fontSize: 8.5, color: 'var(--t2)', marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom tabs: 3D Merge etc */}
        <div style={{ flexShrink: 0, background: 'var(--p1)', borderTop: '1px solid var(--bd)' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--bd)' }}>
            {['3D Merge', 'Face', 'Body', 'Full Body', 'UV', 'Retopology', 'Materials', 'Rig', 'Animate', 'Export'].map(t => (
              <button key={t} onClick={() => setMergeTab(t)} style={{
                padding: '5px 12px', border: 'none', cursor: 'pointer', fontSize: 10.5, fontWeight: 500, whiteSpace: 'nowrap',
                background: mergeTab === t ? 'var(--pink)' : 'none',
                color: mergeTab === t ? '#fff' : 'var(--t2)',
              }}>{t}</button>
            ))}
          </div>

          {/* 3D Merge content */}
          <div style={{ display: 'flex', height: 240, overflow: 'hidden' }}>
            {/* Fitting Tools */}
            <div style={{ width: 180, flexShrink: 0, borderRight: '1px solid var(--bd)', padding: 10 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--t2)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fitting Tools</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 10 }}>
                {[{ ic: '✛', label: 'Move' }, { ic: '↺', label: 'Rotate' }, { ic: '⊠', label: 'Scale' }, { ic: '⊟', label: 'Auto Fit' }, { ic: '⊞', label: 'Mirror' }, { ic: '⊙', label: 'Snap' }].map(tool => (
                  <button key={tool.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 4px', border: '1px solid var(--bd)', borderRadius: 5, background: 'var(--p3)', cursor: 'pointer' }}>
                    <span style={{ fontSize: 14, color: 'var(--pink)' }}>{tool.ic}</span>
                    <span style={{ fontSize: 9, color: 'var(--t2)' }}>{tool.label}</span>
                  </button>
                ))}
              </div>
              {['Fit to Body', 'Preserve Shape', 'Keep Textures', 'Auto Align'].map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, cursor: 'pointer', fontSize: 10.5 }}>
                  <Checkbox checked />
                  <span style={{ color: 'var(--txt)' }}>{opt}</span>
                </label>
              ))}
            </div>

            {/* Sub-tabs: Parts / Fitting / Combine / Finalize */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--bd)' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--bd)', flexShrink: 0 }}>
                {['Parts', 'Fitting', 'Combine', 'Finalize'].map(t => (
                  <button key={t} onClick={() => setFittingTab(t)} style={{
                    flex: 1, padding: '5px', border: 'none', cursor: 'pointer', fontSize: 10.5, fontWeight: 500,
                    background: fittingTab === t ? 'var(--p3)' : 'none',
                    color: fittingTab === t ? 'var(--txt)' : 'var(--t2)',
                    borderBottom: `2px solid ${fittingTab === t ? 'var(--pink)' : 'transparent'}`,
                  }}>{t}</button>
                ))}
              </div>
              <div style={{ flex: 1, display: 'flex', gap: 10, padding: 10, overflow: 'hidden' }}>
                {/* Preview area */}
                <div style={{ flex: 1, background: '#0a0c14', borderRadius: 6, display: 'flex', flexDirection: 'column', border: '1px solid var(--bd)', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', borderBottom: '1px solid var(--bd)', fontSize: 9.5, color: 'var(--t2)' }}>
                    <span>Preview</span>
                    <select style={{ background: 'transparent', border: 'none', color: 'var(--t2)', fontSize: 9.5, cursor: 'pointer' }}>
                      <option>Studio</option><option>Outdoor</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                    {/* Material balls */}
                    {['#d49470','#808080','#c0c8d0'].map((c, i) => (
                      <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${c}ff, ${c}44)`, border: '1px solid var(--bd)', flexShrink: 0 }} />
                    ))}
                    <div style={{ fontSize: 24 }}>🧍‍♀️</div>
                  </div>
                </div>
                {/* Part preview thumbnails */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
                  {[
                    { label: 'Head', active: previewMode === 'Head' },
                    { label: 'Upper Body', active: false },
                    { label: 'Full Body', active: previewMode === 'Full Body' },
                  ].map(p => (
                    <div key={p.label} onClick={() => setPreviewMode(p.label)} style={{
                      width: 64, height: 70, border: `2px solid ${p.active ? 'var(--pink)' : 'var(--bd)'}`,
                      borderRadius: 6, background: '#0a0c14', cursor: 'pointer',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                    }}>
                      <span style={{ fontSize: 18 }}>{p.label === 'Head' ? '👩' : p.label === 'Full Body' ? '🧍‍♀️' : '👚'}</span>
                      <span style={{ fontSize: 8.5, color: p.active ? 'var(--pink)' : 'var(--t2)' }}>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Material Library */}
            <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ padding: '7px 10px', borderBottom: '1px solid var(--bd)', fontWeight: 700, fontSize: 12, color: 'var(--txt)', flexShrink: 0 }}>Material Library</div>
              <div style={{ display: 'flex', gap: 6, padding: '5px 8px', borderBottom: '1px solid var(--bd)', flexShrink: 0 }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 5, top: '50%', transform: 'translateY(-50%)', fontSize: 9, color: 'var(--t3)' }}>🔍</span>
                  <input placeholder="Search materials..." style={{ width: '100%', background: 'var(--p3)', border: '1px solid var(--bd)', borderRadius: 4, color: 'var(--txt)', padding: '2px 4px 2px 18px', fontSize: 9.5 }} />
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Mat categories */}
                <div style={{ width: 108, flexShrink: 0, overflowY: 'auto', borderRight: '1px solid var(--bd)', padding: '4px 0' }}>
                  {MAT_CATS.map(c => (
                    <div key={c} onClick={() => setMatCat(c)} style={{
                      padding: '3px 8px', cursor: 'pointer', fontSize: 9.5,
                      background: matCat === c ? 'var(--pink)' : 'transparent',
                      color: matCat === c ? '#fff' : 'var(--t2)',
                    }}>{c}</div>
                  ))}
                </div>
                {/* Mat grid */}
                <div style={{ flex: 1, overflowY: 'auto', padding: 6, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, alignContent: 'start' }}>
                  {MATERIALS.map(m => <MatSphere key={m.name} mat={m} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ RIGHT — Inspector ══════════ */}
      <div style={{ width: 248, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderLeft: '1px solid var(--bd)', overflow: 'hidden' }}>
        {/* Inspector / Scene / Hierarchy tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--bd)', flexShrink: 0 }}>
          {['Inspector', 'Scene', 'Hierarchy'].map(t => (
            <button key={t} onClick={() => setInspTab(t)} style={{
              flex: 1, padding: '7px 4px', border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 10.5, fontWeight: 500,
              color: inspTab === t ? 'var(--txt)' : 'var(--t2)',
              borderBottom: `2px solid ${inspTab === t ? 'var(--pink)' : 'transparent'}`,
              marginBottom: -1,
            }}>{t}</button>
          ))}
        </div>

        {/* Asset name */}
        <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--bd)', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 14 }}>👩</span>
          <span style={{ fontWeight: 600, fontSize: 12, color: 'var(--txt)' }}>Head_Female_01</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {/* Transform */}
          {[{ label: 'Transform', open: true }, { label: 'Mesh', open: true }, { label: 'Materials', open: true }].map(s => (
            <div key={s.label} style={{ borderBottom: '1px solid var(--bd)' }}>
              <div onClick={() => toggleSection(s.label)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', cursor: 'pointer', background: 'var(--p2)' }}>
                <span style={{ fontSize: 9, color: 'var(--t2)' }}>{openSections.has(s.label) ? '▼' : '▶'}</span>
                <span style={{ fontWeight: 600, fontSize: 11, color: 'var(--txt)' }}>{s.label}</span>
                {s.label === 'Materials' && <span style={{ fontSize: 10, color: 'var(--t2)', marginLeft: 2 }}>(4)</span>}
                <div style={{ flex: 1 }} />
                {s.label === 'Materials' && (
                  <button style={{ fontSize: 14, color: 'var(--t2)', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1, padding: 0 }}>+</button>
                )}
                {s.label === 'Mesh' && (
                  <button style={{ fontSize: 10, color: 'var(--t3)', background: 'none', border: 'none', cursor: 'pointer' }}>📋</button>
                )}
              </div>
              {openSections.has(s.label) && (
                <div style={{ padding: '6px 10px' }}>
                  {s.label === 'Transform' && (
                    <>
                      {[{ label: 'Position', v: ['0.000', '1.700', '0.000'] }, { label: 'Rotation', v: ['0.000', '0.000', '0.000'] }, { label: 'Scale', v: ['1.000', '1.000', '1.000'] }].map(row => (
                        <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                          <span style={{ color: 'var(--t2)', fontSize: 10, width: 46, flexShrink: 0 }}>{row.label}</span>
                          {(['X', 'Y', 'Z'] as const).map((ax, i) => (
                            <div key={ax} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                              <span style={{ fontSize: 9.5, fontWeight: 700, color: ax === 'X' ? '#e05050' : ax === 'Y' ? '#50c060' : '#5090e0', width: 9 }}>{ax}</span>
                              <input defaultValue={row.v[i]} style={{ flex: 1, background: 'var(--p3)', border: '1px solid var(--bd)', borderRadius: 3, color: 'var(--txt)', padding: '2px 3px', fontSize: 9.5, width: 0 }} />
                            </div>
                          ))}
                        </div>
                      ))}
                    </>
                  )}
                  {s.label === 'Mesh' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 11 }}>📄</span>
                      <span style={{ fontSize: 10.5, color: 'var(--blu)' }}>Head_Female_01.fbx</span>
                    </div>
                  )}
                  {s.label === 'Materials' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {[
                        { name: 'Skin_Face', badge: 'Main' },
                        { name: 'Eye_L' },
                        { name: 'Eye_R' },
                        { name: 'Eyelash' },
                      ].map(mat => (
                        <div key={mat.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #d49470, #804020)', border: '1px solid var(--bd)', flexShrink: 0 }} />
                          <span style={{ flex: 1, fontSize: 10.5, color: 'var(--txt)' }}>{mat.name}</span>
                          {mat.badge && <span style={{ fontSize: 8.5, padding: '1px 5px', background: 'rgba(233,30,140,0.15)', border: '1px solid rgba(233,30,140,0.3)', borderRadius: 3, color: 'var(--pink)' }}>{mat.badge}</span>}
                          <span style={{ fontSize: 10, color: 'var(--t2)', cursor: 'pointer' }}>👁</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Collapsed sections */}
          {INSP_SECTIONS.map(s => (
            <div key={s} onClick={() => toggleSection(s)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', cursor: 'pointer', borderBottom: '1px solid var(--bd)', background: openSections.has(s) ? 'var(--p2)' : 'transparent' }}>
              <span style={{ fontSize: 9, color: 'var(--t2)' }}>{openSections.has(s) ? '▼' : '▶'}</span>
              <span style={{ fontSize: 11, color: 'var(--t2)' }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Status */}
        <div style={{ borderTop: '1px solid var(--bd)', padding: '5px 10px', flexShrink: 0, fontSize: 9.5, color: 'var(--t3)', display: 'flex', gap: 8 }}>
          <span>Polygons: <span style={{ color: 'var(--txt)' }}>82,341</span></span>
          <span>VRAM: <span style={{ color: 'var(--txt)' }}>1.2 GB</span></span>
        </div>
      </div>
    </div>
  )
}
