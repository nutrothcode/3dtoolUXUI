interface Props { active: string; setActive: (id: string) => void }

const NAV = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'library', label: 'Asset Library', icon: '⊞' },
  { id: 'material', label: 'Material Library', icon: '◈' },
  { id: 'character', label: 'Character & Motion', icon: '🧍' },
  { id: 'environment', label: 'Environment', icon: '⬡' },
  { id: 'props', label: 'Props', icon: '⬢' },
  { id: 'animation', label: 'Animation', icon: '▶' },
  { id: 'render', label: 'Render', icon: '◎' },
  { id: 'export', label: 'Export', icon: '⬇' },
]

const PROJECT_NAV = [
  { id: 'myprojects', label: 'My Projects', icon: '📁' },
  { id: 'recent', label: 'Recent Files', icon: '🕐' },
  { id: 'favorites', label: 'Favorites', icon: '★' },
  { id: 'cloud', label: 'Cloud Storage', icon: '☁' },
]

const LEARN_NAV = [
  { id: 'tutorials', label: 'Tutorials', icon: '▶' },
  { id: 'docs', label: 'Documentation', icon: '📄' },
  { id: 'community', label: 'Community', icon: '👥' },
]

function NavItem({ id, label, icon, active, onClick }: { id: string; label: string; icon: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 14px', border: 'none', cursor: 'pointer', textAlign: 'left',
      background: active ? '#e91e8c' : 'transparent', borderRadius: 8, marginBottom: 2,
      transition: 'background 0.15s',
    }}
      onMouseEnter={e => !active && (e.currentTarget.style.background = '#1e1b2c')}
      onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}
    >
      <span style={{ fontSize: 14, width: 18, textAlign: 'center', flexShrink: 0, color: active ? '#fff' : '#6a6a80' }}>{icon}</span>
      <span style={{ fontSize: 11.5, fontWeight: active ? 600 : 400, color: active ? '#fff' : '#9090a8' }}>{label}</span>
    </button>
  )
}

export default function LeftSidebar({ active, setActive }: Props) {
  return (
    <div style={{
      width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column',
      background: '#0f0c1a', borderRight: '1px solid #1e1b2c', overflow: 'hidden',
    }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px 0' }}>
        {/* Main nav */}
        {NAV.map(n => (
          <NavItem key={n.id} {...n} active={active === n.id} onClick={() => setActive(n.id)} />
        ))}

        {/* PROJECT section */}
        <div style={{ padding: '12px 14px 4px', fontSize: 9.5, fontWeight: 700, color: '#3a3850', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Project</div>
        {PROJECT_NAV.map(n => (
          <NavItem key={n.id} {...n} active={active === n.id} onClick={() => setActive(n.id)} />
        ))}

        {/* LEARN section */}
        <div style={{ padding: '12px 14px 4px', fontSize: 9.5, fontWeight: 700, color: '#3a3850', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Learn</div>
        {LEARN_NAV.map(n => (
          <NavItem key={n.id} {...n} active={active === n.id} onClick={() => setActive(n.id)} />
        ))}
      </div>

      {/* Pro upgrade card */}
      <div style={{ flexShrink: 0, margin: 10, borderRadius: 10, background: 'linear-gradient(145deg, #1e1b30, #2a1840)', border: '1px solid #3a2858', padding: '14px 12px', textAlign: 'center' }}>
        <div style={{ fontSize: 18, marginBottom: 4 }}>👑</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 3 }}>Run3dtool Pro</div>
        <div style={{ fontSize: 10, color: '#7a7a9c', marginBottom: 10 }}>Unlock all features</div>
        <button style={{ width: '100%', padding: '7px', border: 'none', borderRadius: 7, background: '#e91e8c', color: '#fff', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>Upgrade Now</button>
      </div>
    </div>
  )
}
