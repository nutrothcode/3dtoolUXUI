import { useState } from 'react'

/* ── data ── */
const CATEGORIES = [
  { label: 'All Assets', count: 1238, id: 'all' },
  {
    label: 'Characters', count: 328, id: 'chars', children: [
      { label: 'Human', count: 120, id: 'human' },
      { label: 'Head', count: 68, id: 'head' },
      { label: 'Hair', count: 54, id: 'hair' },
      { label: 'Eyes', count: 36, id: 'eyes' },
      { label: 'Mouth', count: 32, id: 'mouth' },
      { label: 'Teeth', count: 28, id: 'teeth' },
      { label: 'Hand', count: 24, id: 'hand' },
      { label: 'Foot', count: 22, id: 'foot' },
      { label: 'Clothing', count: 86, id: 'clothing' },
      { label: 'Accessories', count: 64, id: 'acc' },
    ]
  },
  { label: 'Props', count: 186, id: 'props' },
  { label: 'Environment', count: 142, id: 'environment' },
  { label: 'Animals', count: 54, id: 'animals' },
  { label: 'Vehicles', count: 28, id: 'vehicles' },
  { label: 'Plants', count: 36, id: 'plants' },
  { label: 'Buildings', count: 64, id: 'buildings' },
  { label: 'Food & Drink', count: 48, id: 'food' },
  { label: 'Materials', count: 220, id: 'materials' },
  { label: 'Textures', count: 312, id: 'textures' },
]

type Asset = {
  id: string
  name: string
  type: 'Characters' | 'Clothing' | 'Props' | 'Environment' | 'Animals' | 'Vehicles' | 'Accessories' | 'Favorites'
  tags: string[]
  cat: string
  g1: string
  g2: string
  fav: boolean
  polyCount: string
  fileSize: string
  format: string
  created: string
  modified: string
  path: string
  triangles: number
  materials: number
}

const ASSETS: Asset[] = [
  { id: 'hf01', name: 'Head_Female_01', type: 'Characters', tags: ['Character', 'Head'], cat: 'head', g1: '#c8907080', g2: '#80402080', fav: true, polyCount: '52,340', fileSize: '12.4 MB', format: 'FBX, OBJ, GLB', created: '2024-11-02 14:32', modified: '2024-11-10 09:21', path: '.../assets/characters/head/', triangles: 52340, materials: 4 },
  { id: 'hf02', name: 'Head_Female_02', type: 'Characters', tags: ['Character', 'Head'], cat: 'head', g1: '#d8a09080', g2: '#904858a0', fav: false, polyCount: '48,210', fileSize: '11.8 MB', format: 'FBX, OBJ, GLB', created: '2024-11-03 10:15', modified: '2024-11-12 14:30', path: '.../assets/characters/head/', triangles: 48210, materials: 4 },
  { id: 'hm01', name: 'Head_Male_01', type: 'Characters', tags: ['Character', 'Head'], cat: 'head', g1: '#b08870a0', g2: '#705040a0', fav: false, polyCount: '50,120', fileSize: '11.2 MB', format: 'FBX, OBJ, GLB', created: '2024-11-04 09:00', modified: '2024-11-11 08:45', path: '.../assets/characters/head/', triangles: 50120, materials: 4 },
  { id: 'hm02', name: 'Head_Male_02', type: 'Characters', tags: ['Character', 'Head'], cat: 'head', g1: '#a07860a0', g2: '#604030a0', fav: false, polyCount: '49,800', fileSize: '11.0 MB', format: 'FBX, OBJ, GLB', created: '2024-11-05 11:00', modified: '2024-11-13 16:00', path: '.../assets/characters/head/', triangles: 49800, materials: 4 },
  { id: 'ha01', name: 'Head_Anime_01', type: 'Characters', tags: ['Character', 'Head'], cat: 'head', g1: '#e8c0a0a0', g2: '#c0807060', fav: false, polyCount: '38,400', fileSize: '9.6 MB', format: 'FBX, OBJ, GLB', created: '2024-11-06 13:00', modified: '2024-11-14 10:30', path: '.../assets/characters/head/', triangles: 38400, materials: 3 },
  { id: 'es01', name: 'Eye_Set_01', type: 'Characters', tags: ['Character', 'Eyes'], cat: 'eyes', g1: '#3060c080', g2: '#1030a080', fav: false, polyCount: '8,200', fileSize: '2.1 MB', format: 'FBX, OBJ', created: '2024-11-07 15:00', modified: '2024-11-15 12:00', path: '.../assets/characters/eyes/', triangles: 8200, materials: 2 },
  { id: 'es02', name: 'Eye_Set_02', type: 'Characters', tags: ['Character', 'Eyes'], cat: 'eyes', g1: '#40a08080', g2: '#206050a0', fav: false, polyCount: '7,800', fileSize: '2.0 MB', format: 'FBX, OBJ', created: '2024-11-08 09:30', modified: '2024-11-16 11:00', path: '.../assets/characters/eyes/', triangles: 7800, materials: 2 },
  { id: 'es03', name: 'Eye_Set_03', type: 'Characters', tags: ['Character', 'Eyes'], cat: 'eyes', g1: '#c0804080', g2: '#804020a0', fav: false, polyCount: '8,400', fileSize: '2.2 MB', format: 'FBX, OBJ', created: '2024-11-09 14:00', modified: '2024-11-17 09:00', path: '.../assets/characters/eyes/', triangles: 8400, materials: 2 },
  { id: 'ib01', name: 'Iris_Brown_01', type: 'Characters', tags: ['Character', 'Eyes'], cat: 'eyes', g1: '#a0601880', g2: '#703010a0', fav: false, polyCount: '4,100', fileSize: '1.2 MB', format: 'FBX, OBJ', created: '2024-11-10 16:00', modified: '2024-11-18 13:00', path: '.../assets/characters/eyes/', triangles: 4100, materials: 1 },
  { id: 'ibl01', name: 'Iris_Blue_01', type: 'Characters', tags: ['Character', 'Eyes'], cat: 'eyes', g1: '#3080e080', g2: '#1050c0a0', fav: false, polyCount: '4,100', fileSize: '1.2 MB', format: 'FBX, OBJ', created: '2024-11-11 10:00', modified: '2024-11-19 14:00', path: '.../assets/characters/eyes/', triangles: 4100, materials: 1 },
  { id: 'eb01', name: 'Eyebrow_01', type: 'Characters', tags: ['Character', 'Head'], cat: 'head', g1: '#20100880', g2: '#100804a0', fav: false, polyCount: '1,200', fileSize: '0.4 MB', format: 'FBX, OBJ', created: '2024-11-12 11:00', modified: '2024-11-20 15:00', path: '.../assets/characters/head/', triangles: 1200, materials: 1 },
  { id: 'eb02', name: 'Eyebrow_02', type: 'Characters', tags: ['Character', 'Head'], cat: 'head', g1: '#30181080', g2: '#18100880', fav: false, polyCount: '1,100', fileSize: '0.4 MB', format: 'FBX, OBJ', created: '2024-11-13 12:00', modified: '2024-11-21 10:00', path: '.../assets/characters/head/', triangles: 1100, materials: 1 },
  { id: 'el01', name: 'Eyelash_01', type: 'Characters', tags: ['Character', 'Eyes'], cat: 'eyes', g1: '#18100880', g2: '#0c080480', fav: false, polyCount: '2,400', fileSize: '0.6 MB', format: 'FBX, OBJ', created: '2024-11-14 13:00', modified: '2024-11-22 11:00', path: '.../assets/characters/eyes/', triangles: 2400, materials: 1 },
  { id: 'el02', name: 'Eyelash_02', type: 'Characters', tags: ['Character', 'Eyes'], cat: 'eyes', g1: '#20141080', g2: '#10080880', fav: false, polyCount: '2,200', fileSize: '0.6 MB', format: 'FBX, OBJ', created: '2024-11-15 14:00', modified: '2024-11-23 12:00', path: '.../assets/characters/eyes/', triangles: 2200, materials: 1 },
  { id: 'ns01', name: 'Nose_01', type: 'Characters', tags: ['Character', 'Head'], cat: 'head', g1: '#c0907080', g2: '#80503060', fav: false, polyCount: '3,600', fileSize: '0.9 MB', format: 'FBX, OBJ', created: '2024-11-16 15:00', modified: '2024-11-24 13:00', path: '.../assets/characters/head/', triangles: 3600, materials: 1 },
  { id: 'mo01', name: 'Mouth_01', type: 'Characters', tags: ['Character', 'Mouth'], cat: 'mouth', g1: '#e0706080', g2: '#c0404060', fav: false, polyCount: '5,800', fileSize: '1.5 MB', format: 'FBX, OBJ', created: '2024-11-17 10:00', modified: '2024-11-25 14:00', path: '.../assets/characters/mouth/', triangles: 5800, materials: 2 },
  { id: 'mo02', name: 'Mouth_02', type: 'Characters', tags: ['Character', 'Mouth'], cat: 'mouth', g1: '#d86060a0', g2: '#b03040a0', fav: false, polyCount: '6,200', fileSize: '1.6 MB', format: 'FBX, OBJ', created: '2024-11-18 11:00', modified: '2024-11-26 15:00', path: '.../assets/characters/mouth/', triangles: 6200, materials: 2 },
  { id: 'tu01', name: 'Teeth_Upper', type: 'Characters', tags: ['Character', 'Mouth'], cat: 'teeth', g1: '#e8e0d880', g2: '#b0a89060', fav: false, polyCount: '4,200', fileSize: '1.1 MB', format: 'FBX, OBJ', created: '2024-11-19 12:00', modified: '2024-11-27 10:00', path: '.../assets/characters/teeth/', triangles: 4200, materials: 1 },
  { id: 'tl01', name: 'Teeth_Lower', type: 'Characters', tags: ['Character', 'Mouth'], cat: 'teeth', g1: '#e0d8d080', g2: '#a8a08060', fav: false, polyCount: '3,800', fileSize: '1.0 MB', format: 'FBX, OBJ', created: '2024-11-20 13:00', modified: '2024-11-28 11:00', path: '.../assets/characters/teeth/', triangles: 3800, materials: 1 },
  { id: 'to01', name: 'Tongue_01', type: 'Characters', tags: ['Character', 'Mouth'], cat: 'mouth', g1: '#e0806080', g2: '#c05040a0', fav: false, polyCount: '2,800', fileSize: '0.8 MB', format: 'FBX, OBJ', created: '2024-11-21 14:00', modified: '2024-11-29 12:00', path: '.../assets/characters/mouth/', triangles: 2800, materials: 1 },
  { id: 'sh01', name: 'Cloth_Shirt_01', type: 'Clothing', tags: ['Clothing', 'Top'], cat: 'clothing', g1: '#4060c080', g2: '#2040a060', fav: false, polyCount: '18,400', fileSize: '4.2 MB', format: 'FBX, OBJ', created: '2024-11-22 09:00', modified: '2024-11-30 13:00', path: '.../assets/clothing/', triangles: 18400, materials: 2 },
  { id: 'sh02', name: 'Cloth_Pants_01', type: 'Clothing', tags: ['Clothing', 'Bottom'], cat: 'clothing', g1: '#30406080', g2: '#1830a060', fav: false, polyCount: '16,200', fileSize: '3.8 MB', format: 'FBX, OBJ', created: '2024-11-23 10:00', modified: '2024-12-01 14:00', path: '.../assets/clothing/', triangles: 16200, materials: 2 },
  { id: 'pr01', name: 'Chair_Modern_01', type: 'Props', tags: ['Props', 'Furniture'], cat: 'props', g1: '#606070a0', g2: '#303038a0', fav: false, polyCount: '12,000', fileSize: '3.0 MB', format: 'FBX, OBJ, GLB', created: '2024-11-24 11:00', modified: '2024-12-02 15:00', path: '.../assets/props/', triangles: 12000, materials: 3 },
  { id: 'pr02', name: 'Table_Office_01', type: 'Props', tags: ['Props', 'Furniture'], cat: 'props', g1: '#806040a0', g2: '#503020a0', fav: false, polyCount: '8,400', fileSize: '2.1 MB', format: 'FBX, OBJ, GLB', created: '2024-11-25 12:00', modified: '2024-12-03 10:00', path: '.../assets/props/', triangles: 8400, materials: 2 },
  { id: 'en01', name: 'Room_Studio_01', type: 'Environment', tags: ['Environment', 'Indoor'], cat: 'environment', g1: '#304060a0', g2: '#1828408', fav: false, polyCount: '28,000', fileSize: '8.4 MB', format: 'FBX, GLB', created: '2024-11-26 13:00', modified: '2024-12-04 11:00', path: '.../assets/environment/', triangles: 28000, materials: 6 },
  { id: 'an01', name: 'Cat_01', type: 'Animals', tags: ['Animals', 'Pet'], cat: 'animals', g1: '#c0a07060', g2: '#806040a0', fav: false, polyCount: '22,000', fileSize: '5.5 MB', format: 'FBX, OBJ, GLB', created: '2024-11-27 14:00', modified: '2024-12-05 12:00', path: '.../assets/animals/', triangles: 22000, materials: 3 },
  { id: 'vh01', name: 'Car_Sedan_01', type: 'Vehicles', tags: ['Vehicles', 'Car'], cat: 'vehicles', g1: '#2050a060', g2: '#103070a0', fav: false, polyCount: '68,000', fileSize: '18.2 MB', format: 'FBX, OBJ, GLB', created: '2024-11-28 09:00', modified: '2024-12-06 13:00', path: '.../assets/vehicles/', triangles: 68000, materials: 8 },
  { id: 'ac01', name: 'Bag_Handbag_01', type: 'Accessories', tags: ['Accessories', 'Bag'], cat: 'acc', g1: '#703020a0', g2: '#401808a0', fav: false, polyCount: '6,400', fileSize: '1.8 MB', format: 'FBX, OBJ', created: '2024-11-29 10:00', modified: '2024-12-07 14:00', path: '.../assets/accessories/', triangles: 6400, materials: 2 },
]

const TYPE_FILTERS = ['All', 'Characters', 'Clothing', 'Props', 'Environment', 'Animals', 'Vehicles', 'Accessories', 'Favorites', 'Recent']

/* ── Asset thumbnail: gradient sphere/shape ── */
function AssetThumb({ asset, size = 120 }: { asset: Asset; size?: number }) {
  return (
    <div style={{
      width: '100%', paddingBottom: '85%', position: 'relative',
      background: `radial-gradient(ellipse at 40% 35%, ${asset.g1}, ${asset.g2} 55%, #090b14)`,
      borderRadius: 'var(--r-md)',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 60% 65%, rgba(255,255,255,0.04) 0%, transparent 60%)',
      }} />
    </div>
  )
}

/* ── Tag badge ── */
function Tag({ label }: { label: string }) {
  return (
    <span style={{
      fontSize: 9, padding: '1px 5px', borderRadius: 3,
      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
      color: 'var(--text-secondary)', whiteSpace: 'nowrap',
    }}>{label}</span>
  )
}

export default function AssetLibraryPage() {
  const [selectedCat, setSelectedCat] = useState('head')
  const [charsOpen, setCharsOpen] = useState(true)
  const [selectedAsset, setSelectedAsset] = useState('hf01')
  const [favs, setFavs] = useState(new Set(['hf01', 'sh01']))
  const [typeFilter, setTypeFilter] = useState('All')
  const [libTab, setLibTab] = useState('Categories')
  const [previewTab, setPreviewTab] = useState('Details')
  const [searchVal, setSearchVal] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)

  const toggleFav = (id: string) =>
    setFavs(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  const filtered = ASSETS.filter(a => {
    if (typeFilter === 'Favorites') return favs.has(a.id)
    if (typeFilter !== 'All' && typeFilter !== 'Recent') {
      if (a.type !== typeFilter) return false
    }
    if (searchVal && !a.name.toLowerCase().includes(searchVal.toLowerCase())) return false
    return true
  })

  const selAsset = ASSETS.find(a => a.id === selectedAsset) || ASSETS[0]
  const totalCount = typeFilter === 'All' ? 1238 : filtered.length

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: 'var(--bg-app)', fontSize: 11 }}>

      {/* ── LEFT: Category tree ── */}
      <div style={{ width: 192, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--bg-panel)', borderRight: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
          {CATEGORIES.map(cat => (
            <div key={cat.id}>
              <div
                onClick={() => { setSelectedCat(cat.id); if (cat.id === 'chars') setCharsOpen(o => !o) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4, padding: '4px 12px',
                  cursor: 'pointer',
                  background: selectedCat === cat.id ? 'var(--accent)' : 'transparent',
                  color: selectedCat === cat.id ? '#fff' : 'var(--text-secondary)',
                }}
              >
                {cat.children && (
                  <span style={{ fontSize: 7, opacity: 0.6, width: 8 }}>
                    {charsOpen && cat.id === 'chars' ? '▼' : '▶'}
                  </span>
                )}
                {!cat.children && <span style={{ width: 8 }} />}
                <span style={{ flex: 1, fontSize: 11 }}>{cat.label}</span>
                <span style={{ fontSize: 9.5, opacity: 0.55 }}>{cat.count}</span>
              </div>
              {cat.children && charsOpen && cat.id === 'chars' && cat.children.map(sub => (
                <div key={sub.id} onClick={() => setSelectedCat(sub.id)} style={{
                  display: 'flex', alignItems: 'center', padding: '3px 12px 3px 24px', cursor: 'pointer',
                  background: selectedCat === sub.id ? 'rgba(233,30,140,0.15)' : 'transparent',
                  color: selectedCat === sub.id ? 'var(--accent)' : 'var(--text-muted)',
                  borderLeft: selectedCat === sub.id ? '2px solid var(--accent)' : '2px solid transparent',
                }}>
                  <span style={{ flex: 1, fontSize: 10.5 }}>{sub.label}</span>
                  <span style={{ fontSize: 9.5, opacity: 0.55 }}>{sub.count}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Upgrade banner */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 14 }}>⚡</span>
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-primary)' }}>Run3dtool Pro</div>
              <div style={{ fontSize: 9.5, color: 'var(--text-muted)' }}>Unlock all features</div>
            </div>
          </div>
          <button style={{ width: '100%', padding: '5px', border: 'none', borderRadius: 'var(--r-md)', background: 'var(--accent)', color: '#fff', fontSize: 10.5, fontWeight: 700, cursor: 'pointer' }}>
            Upgrade Now
          </button>
        </div>
      </div>

      {/* ── CENTER: Asset browser ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Header */}
        <div style={{ padding: '12px 16px 0', background: 'var(--bg-panel-2)', flexShrink: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>Asset Library</div>
          <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginBottom: 10 }}>Browse, manage and use 3D assets in your projects</div>

          {/* Search + actions row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 0 }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 340 }}>
              <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--text-dim)', pointerEvents: 'none' }}>🔍</span>
              <input
                value={searchVal} onChange={e => setSearchVal(e.target.value)}
                placeholder="Search assets, tags, or type..."
                style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', color: 'var(--text-primary)', padding: '5px 72px 5px 28px', fontSize: 11 }}
              />
              <span style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 9, color: 'var(--text-dim)', background: 'var(--bg-panel-3)', border: '1px solid var(--border)', borderRadius: 3, padding: '1px 4px', letterSpacing: '0.03em' }}>Ctrl K</span>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', border: 'none', borderRadius: 'var(--r-md)', background: 'var(--accent)', color: '#fff', fontSize: 10.5, fontWeight: 700, cursor: 'pointer' }}>
              ⬆ Import Asset
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', background: 'var(--bg-input)', color: 'var(--text-secondary)', fontSize: 10.5, cursor: 'pointer' }}>
              ↻ Refresh
            </button>
            {/* View mode */}
            <button onClick={() => setViewMode('grid')} style={{ width: 28, height: 28, border: `1px solid ${viewMode === 'grid' ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--r-sm)', background: viewMode === 'grid' ? 'var(--accent-lo)' : 'var(--bg-input)', color: viewMode === 'grid' ? 'var(--accent)' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>⊞</button>
            <button onClick={() => setViewMode('list')} style={{ width: 28, height: 28, border: `1px solid ${viewMode === 'list' ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--r-sm)', background: viewMode === 'list' ? 'var(--accent-lo)' : 'var(--bg-input)', color: viewMode === 'list' ? 'var(--accent)' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>☰</button>
            <button style={{ width: 28, height: 28, border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', background: 'var(--bg-input)', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>⊟</button>
            <input type="range" min={40} max={120} defaultValue={70} style={{ width: 60, accentColor: 'var(--accent)', cursor: 'pointer' }} />
            <button style={{ width: 24, height: 24, border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', background: 'var(--bg-input)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 11 }}>✕</button>
          </div>
        </div>

        {/* Tabs: Categories | Collections */}
        <div style={{ display: 'flex', background: 'var(--bg-panel-2)', borderBottom: '1px solid var(--border)', flexShrink: 0, paddingLeft: 16 }}>
          {['Categories', 'Collections'].map(t => (
            <button key={t} onClick={() => setLibTab(t)} style={{
              padding: '7px 14px', border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 11, fontWeight: 500,
              color: libTab === t ? 'var(--accent)' : 'var(--text-muted)',
              borderBottom: `2px solid ${libTab === t ? 'var(--accent)' : 'transparent'}`,
              marginBottom: -1,
            }}>{t}</button>
          ))}
        </div>

        {/* Type filter chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0, overflowX: 'auto', background: 'var(--bg-panel-2)' }}>
          {TYPE_FILTERS.map(f => {
            const isActive = typeFilter === f
            const isRecent = f === 'Recent'
            return (
              <button key={f} onClick={() => { setTypeFilter(f); setPage(1) }} style={{
                display: 'flex', alignItems: 'center', gap: 3,
                padding: '4px 10px', border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 20, background: isActive ? 'var(--accent)' : 'var(--bg-input)',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                fontSize: 10.5, fontWeight: isActive ? 700 : 400, cursor: 'pointer', whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>
                {f}{isRecent && <span style={{ fontSize: 9 }}>▾</span>}
              </button>
            )
          })}
        </div>

        {/* Asset grid / list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
          {viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 8 }}>
              {filtered.map(asset => (
                <div key={asset.id} onClick={() => setSelectedAsset(asset.id)} style={{
                  borderRadius: 'var(--r-lg)', border: `1.5px solid ${selectedAsset === asset.id ? 'var(--accent)' : 'var(--border)'}`,
                  background: selectedAsset === asset.id ? 'rgba(233,30,140,0.06)' : 'var(--bg-panel-2)',
                  cursor: 'pointer', overflow: 'hidden', position: 'relative',
                  transition: 'border-color 0.1s',
                }}>
                  <div style={{ padding: 6, position: 'relative' }}>
                    <AssetThumb asset={asset} />
                    {/* Star */}
                    <button onClick={e => { e.stopPropagation(); toggleFav(asset.id) }} style={{
                      position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.5)',
                      border: 'none', cursor: 'pointer', width: 20, height: 20, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
                    }}>
                      <span style={{ fontSize: 11, color: favs.has(asset.id) ? '#f0c040' : 'rgba(255,255,255,0.4)' }}>★</span>
                    </button>
                  </div>
                  <div style={{ padding: '0 8px 8px' }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 3 }}>{asset.name}</div>
                    <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                      {asset.tags.map(t => <Tag key={t} label={t} />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filtered.map(asset => (
                <div key={asset.id} onClick={() => setSelectedAsset(asset.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px',
                  borderRadius: 'var(--r-md)', border: `1px solid ${selectedAsset === asset.id ? 'var(--accent)' : 'transparent'}`,
                  background: selectedAsset === asset.id ? 'rgba(233,30,140,0.06)' : 'var(--bg-panel-2)',
                  cursor: 'pointer',
                }}>
                  <div style={{ width: 40, height: 34, borderRadius: 'var(--r-sm)', background: `radial-gradient(circle at 40% 35%, ${asset.g1}, ${asset.g2} 60%, #090b14)`, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{asset.name}</div>
                    <div style={{ display: 'flex', gap: 3, marginTop: 2 }}>
                      {asset.tags.map(t => <Tag key={t} label={t} />)}
                    </div>
                  </div>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{asset.fileSize}</span>
                  <button onClick={e => { e.stopPropagation(); toggleFav(asset.id) }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <span style={{ fontSize: 12, color: favs.has(asset.id) ? '#f0c040' : 'var(--text-dim)' }}>★</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom status + pagination */}
        <div style={{ height: 34, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', borderTop: '1px solid var(--border)', background: 'var(--bg-panel-2)', flexShrink: 0 }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{totalCount} assets | 1 selected</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} style={{ width: 22, height: 22, border: '1px solid var(--border)', borderRadius: 4, background: 'var(--bg-input)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 10 }}>‹</button>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setPage(n)} style={{
                width: 22, height: 22, border: `1px solid ${page === n ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 4, background: page === n ? 'var(--accent)' : 'var(--bg-input)',
                color: page === n ? '#fff' : 'var(--text-muted)', cursor: 'pointer', fontSize: 10,
              }}>{n}</button>
            ))}
            <span style={{ fontSize: 10, color: 'var(--text-dim)', padding: '0 2px' }}>...</span>
            <button style={{ width: 22, height: 22, border: '1px solid var(--border)', borderRadius: 4, background: 'var(--bg-input)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 10 }}>62</button>
            <button onClick={() => setPage(p => Math.min(62, p + 1))} style={{ width: 22, height: 22, border: '1px solid var(--border)', borderRadius: 4, background: 'var(--bg-input)', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 10 }}>›</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Grid:</span>
            <select style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-secondary)', fontSize: 10, padding: '1px 4px', cursor: 'pointer' }}>
              <option>Medium</option><option>Small</option><option>Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Asset Preview ── */}
      <div style={{ width: 272, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--bg-panel)', borderLeft: '1px solid var(--border)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <span style={{ fontWeight: 700, fontSize: 12, color: 'var(--text-primary)' }}>Asset Preview</span>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 4 }}>
            {['↻', '○', '◎', '⊙'].map((ic, i) => (
              <button key={i} style={{ width: 20, height: 20, border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12, padding: 0 }}>{ic}</button>
            ))}
            <button style={{ width: 20, height: 20, border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 11, padding: 0 }}>✕</button>
          </div>
        </div>

        {/* 3D Preview area */}
        <div style={{ position: 'relative', background: 'linear-gradient(160deg, #0e1220, #0a0c16)', height: 200, flexShrink: 0, overflow: 'hidden' }}>
          {/* Floor grid */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', backgroundImage: 'linear-gradient(rgba(42,45,70,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(42,45,70,0.35) 1px, transparent 1px)', backgroundSize: '20px 20px', transform: 'perspective(300px) rotateX(50deg)', transformOrigin: 'bottom center', opacity: 0.7 }} />
          {/* Asset visual */}
          <div style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', width: 120, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: 100, height: 120, borderRadius: '50% 50% 40% 40%',
              background: `radial-gradient(ellipse at 38% 35%, ${selAsset.g1}, ${selAsset.g2} 55%, #050810)`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.7), inset 0 2px 12px rgba(255,255,255,0.05)',
            }} />
          </div>
          {/* Axes gizmo */}
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <line x1="22" y1="22" x2="22" y2="4" stroke="#50c060" strokeWidth="1.5" />
              <polygon points="22,2 20,7 24,7" fill="#50c060" />
              <text x="20" y="13" fill="#50c060" fontSize="6" fontWeight="700">Y</text>
              <line x1="22" y1="22" x2="40" y2="33" stroke="#e05050" strokeWidth="1.5" />
              <polygon points="42,35 37,31 38,36" fill="#e05050" />
              <text x="37" y="40" fill="#e05050" fontSize="6" fontWeight="700">X</text>
              <line x1="22" y1="22" x2="4" y2="33" stroke="#5090e0" strokeWidth="1.5" />
              <polygon points="2,35 7,31 6,36" fill="#5090e0" />
              <text x="0" y="40" fill="#5090e0" fontSize="6" fontWeight="700">Z</text>
            </svg>
          </div>
        </div>

        {/* Asset name + tags */}
        <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 12.5, color: 'var(--text-primary)', marginBottom: 4 }}>{selAsset.name}</div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {selAsset.tags.map(t => <Tag key={t} label={t} />)}
          </div>
        </div>

        {/* Use Asset button */}
        <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 0 }}>
            <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '7px 12px', border: 'none', borderRadius: 'var(--r-md) 0 0 var(--r-md)', background: 'var(--accent)', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
              <span style={{ fontSize: 12 }}>⊙</span> Use Asset in Scene
            </button>
            <button style={{ width: 32, border: '1px solid rgba(255,255,255,0.15)', borderLeft: 'none', borderRadius: '0 var(--r-md) var(--r-md) 0', background: 'color-mix(in srgb, var(--accent) 80%, #000)', color: '#fff', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▾</button>
          </div>
        </div>

        {/* Tabs: Details / Files / Tags / Similar */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          {['Details', 'Files', 'Tags', 'Similar'].map(t => (
            <button key={t} onClick={() => setPreviewTab(t)} style={{
              flex: 1, padding: '6px 4px', border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 10.5, fontWeight: 500,
              color: previewTab === t ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottom: `2px solid ${previewTab === t ? 'var(--accent)' : 'transparent'}`,
              marginBottom: -1,
            }}>{t}</button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
          {previewTab === 'Details' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                ['Name', selAsset.name],
                ['Category', selAsset.tags.join(' / ')],
                ['Type', '3D Model'],
                ['Format', selAsset.format],
                ['File Size', selAsset.fileSize],
                ['Triangles', selAsset.triangles.toLocaleString()],
                ['Materials', String(selAsset.materials)],
                ['Created', selAsset.created],
                ['Modified', selAsset.modified],
                ['Path', selAsset.path],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', gap: 8, padding: '4px 0', borderBottom: '1px solid var(--border-2)' }}>
                  <span style={{ fontSize: 10.5, color: 'var(--text-muted)', width: 68, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 10.5, color: 'var(--text-secondary)', wordBreak: 'break-all' }}>{value}</span>
                </div>
              ))}
            </div>
          )}
          {previewTab === 'Files' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['FBX', 'OBJ', 'GLB'].map(fmt => (
                <div key={fmt} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: 'var(--bg-panel-2)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 12 }}>📄</span>
                  <span style={{ flex: 1, fontSize: 10.5, color: 'var(--text-secondary)' }}>{selAsset.name}.{fmt.toLowerCase()}</span>
                  <span style={{ fontSize: 9.5, color: 'var(--text-muted)' }}>{selAsset.fileSize}</span>
                </div>
              ))}
            </div>
          )}
          {previewTab === 'Tags' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {[...selAsset.tags, selAsset.type, '3D Model', 'PBR', 'Rigged'].map(t => (
                <span key={t} style={{ padding: '3px 8px', borderRadius: 20, background: 'var(--bg-panel-2)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: 10 }}>{t}</span>
              ))}
            </div>
          )}
          {previewTab === 'Similar' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {ASSETS.filter(a => a.type === selAsset.type && a.id !== selAsset.id).slice(0, 6).map(asset => (
                <div key={asset.id} onClick={() => setSelectedAsset(asset.id)} style={{ cursor: 'pointer', borderRadius: 'var(--r-md)', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-panel-2)' }}>
                  <div style={{ padding: 6 }}><AssetThumb asset={asset} /></div>
                  <div style={{ padding: '0 6px 6px', fontSize: 9.5, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{asset.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom actions */}
        <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border)', display: 'flex', gap: 6, flexShrink: 0 }}>
          <button style={{ flex: 1, padding: '5px', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', background: 'var(--bg-input)', color: 'var(--text-secondary)', fontSize: 10.5, cursor: 'pointer' }}>⊡ Duplicate</button>
          <button style={{ flex: 1, padding: '5px', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', background: 'var(--bg-input)', color: 'var(--text-secondary)', fontSize: 10.5, cursor: 'pointer' }}>✏ Edit Metadata</button>
        </div>
        <div style={{ padding: '0 12px 8px', display: 'flex', gap: 6, flexShrink: 0 }}>
          <button style={{ flex: 1, padding: '5px', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', background: 'var(--bg-input)', color: 'var(--text-secondary)', fontSize: 10.5, cursor: 'pointer' }}>📁 Open in File Browser</button>
          <button style={{ padding: '5px 10px', border: '1px solid rgba(224,64,64,0.3)', borderRadius: 'var(--r-md)', background: 'rgba(224,64,64,0.1)', color: 'var(--danger)', fontSize: 10.5, cursor: 'pointer' }}>🗑 Delete</button>
        </div>
        <div style={{ padding: '0 12px 8px', flexShrink: 0 }}>
          <button style={{ width: '100%', padding: '5px', border: '1px solid rgba(233,30,140,0.3)', borderRadius: 'var(--r-md)', background: 'rgba(233,30,140,0.08)', color: 'var(--accent)', fontSize: 10.5, cursor: 'pointer' }}>★ Add to Favorites</button>
        </div>
      </div>
    </div>
  )
}
