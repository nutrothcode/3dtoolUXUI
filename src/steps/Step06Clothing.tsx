import { useState } from 'react'
import { Btn, Check, TabRow, PanelLabel } from '../components/shared'

const CLOTHING_TOOLS = ['Fit to Body', 'Adjust', 'Transfer Weights', 'Fix Clipping', 'Hide Body', 'Mirror Clothing', 'Add Accessory']
const ITEMS = {
  Tops: [{ name: 'T-Shirt', icon: '👕' }, { name: 'Jacket', icon: '🧥' }, { name: 'Pants', icon: '👖' }, { name: 'Shorts', icon: '🩳' }],
  Bottoms: [{ name: 'Skirt', icon: '👗' }],
  Shoes: [{ name: 'Shoes', icon: '👟' }],
  Hats: [{ name: 'Hat', icon: '🎩' }],
  Accessory: [{ name: 'Glasses', icon: '🕶' }],
}
const CLOTH_TESTS = ['Idle', 'Walk', 'Run', 'Jump']

export default function Step06Clothing() {
  const [category, setCategory] = useState('Tops')
  const [selected, setSelected] = useState('Jacket')
  const [clothTest, setClothTest] = useState('Idle')
  const [activeTool, setActiveTool] = useState('Fit to Body')

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* LEFT */}
      <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderRight: '1px solid var(--bd)' }}>
        <PanelLabel>Clothing Library</PanelLabel>
        {/* Category tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--bd)', flexShrink: 0, overflowX: 'auto' }}>
          {Object.keys(ITEMS).map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{
              padding: '5px 10px', border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 10.5, fontWeight: 500, whiteSpace: 'nowrap',
              color: category === cat ? 'var(--pink)' : 'var(--t2)',
              borderBottom: `2px solid ${category === cat ? 'var(--pink)' : 'transparent'}`, marginBottom: -1,
            }}>{cat}</button>
          ))}
        </div>
        {/* Clothing grid */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6, padding: 8, alignContent: 'start' }}>
          {(ITEMS[category as keyof typeof ITEMS] || []).map(item => (
            <div key={item.name} onClick={() => setSelected(item.name)} style={{
              borderRadius: 6, border: `2px solid ${selected === item.name ? 'var(--pink)' : 'var(--bd)'}`,
              background: selected === item.name ? 'var(--pink-lo)' : 'var(--p3)',
              padding: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer',
            }}>
              <div style={{ fontSize: 32 }}>{item.icon}</div>
              <div style={{ fontSize: 10, color: 'var(--txt)', fontWeight: 500 }}>{item.name}</div>
            </div>
          ))}
        </div>
        {/* Accessory items row */}
        <div style={{ borderTop: '1px solid var(--bd)', padding: 8, flexShrink: 0 }}>
          <div style={{ fontSize: 10, color: 'var(--t2)', marginBottom: 4 }}>Accessories</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Skirt', 'Shoes', 'Hat', 'Glasses'].map(a => (
              <div key={a} style={{ flex: 1, padding: '4px', background: 'var(--p3)', border: '1px solid var(--bd)', borderRadius: 4, textAlign: 'center', fontSize: 9, color: 'var(--t2)', cursor: 'pointer' }}>{a}</div>
            ))}
          </div>
        </div>
        {/* Cloth test */}
        <div style={{ borderTop: '1px solid var(--bd)', padding: 8, flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--t2)', marginBottom: 6, textTransform: 'uppercase' }}>Cloth Test</div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {CLOTH_TESTS.map(t => (
              <button key={t} onClick={() => setClothTest(t)} style={{
                padding: '3px 10px', border: `1px solid ${clothTest === t ? 'var(--pink)' : 'var(--bd)'}`,
                borderRadius: 4, background: clothTest === t ? 'var(--pink)' : 'var(--p4)',
                color: clothTest === t ? '#fff' : 'var(--txt)', fontSize: 10, cursor: 'pointer',
              }}>{t}</button>
            ))}
          </div>
          <Check checked label="Auto Rotate" />
        </div>
      </div>

      {/* CENTER */}
      <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(180deg, #0e1220 0%, #090b12 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', backgroundImage: 'linear-gradient(var(--bd) 1px, transparent 1px), linear-gradient(90deg, var(--bd) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3, transform: 'perspective(400px) rotateX(60deg)', transformOrigin: 'bottom center' }} />
        {/* Clothed character */}
        <svg width="200" height="420" viewBox="0 0 200 420">
          <ellipse cx="100" cy="20" rx="22" ry="26" fill="#c8a882" />
          <ellipse cx="100" cy="8" rx="24" ry="18" fill="#2a1a08" />
          {/* Jacket */}
          <path d="M 62 55 Q 100 42 138 55 L 148 165 Q 120 178 100 180 Q 80 178 52 165 Z" fill="#4a4a60" opacity="0.9" />
          {/* Pants */}
          <path d="M 58 180 Q 52 260 50 350 L 52 410" fill="none" stroke="#2a3050" strokeWidth="26" strokeLinecap="round" opacity="0.9" />
          <path d="M 142 180 Q 148 260 150 350 L 148 410" fill="none" stroke="#2a3050" strokeWidth="26" strokeLinecap="round" opacity="0.9" />
          {/* Arms */}
          <path d="M 62 165 Q 55 180 30 185 L 15 200 L 8 235" fill="none" stroke="#4a4a60" strokeWidth="18" strokeLinecap="round" opacity="0.9" />
          <path d="M 138 165 Q 145 180 170 185 L 185 200 L 192 235" fill="none" stroke="#4a4a60" strokeWidth="18" strokeLinecap="round" opacity="0.9" />
          {/* Hands */}
          <circle cx="8" cy="242" r="10" fill="#c8a882" opacity="0.8" />
          <circle cx="192" cy="242" r="10" fill="#c8a882" opacity="0.8" />
          {/* Shoes */}
          <ellipse cx="52" cy="412" rx="16" ry="8" fill="#1a1a1a" opacity="0.9" />
          <ellipse cx="148" cy="412" rx="16" ry="8" fill="#1a1a1a" opacity="0.9" />
        </svg>
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <svg width="55" height="55" viewBox="0 0 55 55">
            <line x1="27" y1="27" x2="27" y2="5" stroke="#50c060" strokeWidth="2" /><text x="25" y="13" fill="#50c060" fontSize="8" fontWeight="700">Y</text>
            <line x1="27" y1="27" x2="50" y2="42" stroke="#e05050" strokeWidth="2" /><text x="46" y="48" fill="#e05050" fontSize="8" fontWeight="700">X</text>
            <line x1="27" y1="27" x2="4" y2="42" stroke="#5090e0" strokeWidth="2" /><text x="1" y="48" fill="#5090e0" fontSize="8" fontWeight="700">Z</text>
          </svg>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--p1)', borderLeft: '1px solid var(--bd)' }}>
        <PanelLabel>Clothing Tools</PanelLabel>
        <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {CLOTHING_TOOLS.map(t => (
            <button key={t} onClick={() => setActiveTool(t)} style={{
              padding: '5px 10px', border: `1px solid ${activeTool === t ? 'var(--pink)' : 'var(--bd)'}`,
              borderRadius: 4, background: activeTool === t ? 'var(--pink-lo)' : 'var(--p3)',
              color: activeTool === t ? 'var(--pink)' : 'var(--txt)', fontSize: 10.5, cursor: 'pointer', textAlign: 'left',
            }}>{t}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
