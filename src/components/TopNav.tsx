interface Props { active: string; setActive: (t: string) => void }

const NAV_TABS = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'library', label: 'Asset Library', icon: '⊞', pink: true },
  { id: 'material', label: 'Material Library', icon: '◈' },
  { id: 'character', label: 'Character & Motion', icon: '♀' },
  { id: 'environment', label: 'Environment', icon: '⬡' },
  { id: 'animation', label: 'Rig & Animation', icon: '◎' },
  { id: 'export', label: 'Export', icon: '⬇' },
]

export default function TopNav({ active, setActive }: Props) {
  return (
    <div style={{
      height: 52, display: 'flex', alignItems: 'center',
      background: 'var(--p1)', borderBottom: '1px solid var(--bd)',
      flexShrink: 0, gap: 0,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', minWidth: 200 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg,#2a2fff,#7b2fff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, color: '#fff', fontWeight: 700,
        }}>G</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--txt)', lineHeight: 1.2 }}>Game Asset Studio</div>
          <div style={{ fontSize: 10, color: 'var(--t2)' }}>Create 3D Assets for Games</div>
        </div>
      </div>

      {/* Nav tabs */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', height: '100%', gap: 2, padding: '0 8px' }}>
        {NAV_TABS.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 2, padding: '0 12px', border: 'none', background: 'none', cursor: 'pointer',
            fontSize: 10, fontWeight: 500,
            color: active === t.id ? (t.pink ? 'var(--pink)' : 'var(--txt)') : 'var(--t2)',
            borderBottom: `2px solid ${active === t.id ? (t.pink ? 'var(--pink)' : 'var(--txt)') : 'transparent'}`,
            transition: 'all 0.15s',
            position: 'relative',
          }}>
            <span style={{ fontSize: t.pink ? 16 : 14, lineHeight: 1 }}>{t.icon}</span>
            <span style={{ whiteSpace: 'nowrap' }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '0 8px' }}>
        {['Project', 'Settings', 'Help'].map(label => (
          <button key={label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '6px 10px', border: 'none', background: 'none',
            color: 'var(--t2)', fontSize: 10, fontWeight: 500, cursor: 'pointer',
          }}>
            <span style={{ fontSize: 14 }}>{label === 'Project' ? '⊞' : label === 'Settings' ? '⚙' : '?'}</span>
            <span>{label}</span>
          </button>
        ))}
        {/* Window controls */}
        <div style={{ display: 'flex', gap: 6, marginLeft: 8, paddingLeft: 12, borderLeft: '1px solid var(--bd)' }}>
          {['—', '□', '✕'].map((sym, i) => (
            <button key={i} style={{
              width: 24, height: 24, border: 'none', borderRadius: 4,
              background: i === 2 ? 'var(--red)' : 'var(--hov)',
              color: 'var(--txt)', fontSize: 11, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{sym}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
