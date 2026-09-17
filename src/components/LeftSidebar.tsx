import { Icons, type IconName } from './Icon'

interface Props {
  active: string
  setActive: (id: string) => void
  collapsed: boolean
  onToggle: () => void
}

const NAV: { id: string; label: string; icon: IconName }[] = [
  { id: 'home',        label: 'Home',              icon: 'Home' },
  { id: 'library',     label: 'Asset Library',     icon: 'AssetLibrary' },
  { id: 'material',    label: 'Material Library',  icon: 'Material' },
  { id: 'character',   label: 'Character & Motion', icon: 'Character' },
  { id: 'environment', label: 'Environment',       icon: 'Environment' },
  { id: 'props',       label: 'Props',             icon: 'Props' },
  { id: 'animation',   label: 'Animation',         icon: 'Animation' },
  { id: 'render',      label: 'Render',            icon: 'Render' },
  { id: 'export',      label: 'Export',            icon: 'Export' },
]

const PROJECT_NAV: { id: string; label: string; icon: IconName }[] = [
  { id: 'projects',  label: 'My Projects',   icon: 'Folder' },
  { id: 'recent',    label: 'Recent Files',  icon: 'Clock' },
  { id: 'favorites', label: 'Favorites',     icon: 'Star' },
  { id: 'cloud',     label: 'Cloud Storage', icon: 'Cloud' },
]

const LEARN_NAV: { id: string; label: string; icon: IconName }[] = [
  { id: 'tutorials', label: 'Tutorials',     icon: 'Play' },
  { id: 'docs',      label: 'Documentation', icon: 'FileText' },
  { id: 'community', label: 'Community',     icon: 'Users' },
]

function NavItem({ id, label, icon, active, onClick, collapsed }: {
  id: string; label: string; icon: IconName; active: boolean; onClick: () => void; collapsed: boolean
}) {
  const Ic = Icons[icon]
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      style={{
        width: '100%', display: 'flex', alignItems: 'center',
        gap: collapsed ? 0 : 9,
        justifyContent: collapsed ? 'center' : 'flex-start',
        padding: collapsed ? '7px 0' : '6px 10px',
        border: 'none', cursor: 'pointer', textAlign: 'left',
        background: active ? 'var(--accent)' : 'transparent',
        borderRadius: 'var(--r-lg)', marginBottom: 1, transition: 'background 0.12s',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-hover)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
    >
      <Ic size={15} color={active ? '#fff' : 'var(--text-muted)'} />
      {!collapsed && (
        <span style={{
          fontSize: 11.5, fontWeight: active ? 600 : 400,
          color: active ? '#fff' : 'var(--text-secondary)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{label}</span>
      )}
    </button>
  )
}

function SectionLabel({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) {
    return <div style={{ height: 1, background: 'var(--border)', margin: '6px 8px' }} />
  }
  return (
    <div style={{
      padding: '10px 10px 4px', fontSize: 9.5, fontWeight: 700,
      color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em',
    }}>{label}</div>
  )
}

export default function LeftSidebar({ active, setActive, collapsed, onToggle }: Props) {
  return (
    <div style={{
      width: collapsed ? 48 : 'var(--sidebar-w)',
      flexShrink: 0, display: 'flex', flexDirection: 'column',
      background: 'var(--bg-panel)', borderRight: '1px solid var(--border)',
      overflow: 'hidden', transition: 'width 0.2s ease',
    }}>
      {/* Toggle button */}
      <div style={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', padding: collapsed ? '8px 0' : '6px 8px', flexShrink: 0, borderBottom: '1px solid var(--border)' }}>
        <button
          onClick={onToggle}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            width: 28, height: 28, border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)', background: 'var(--bg-panel-2)',
            color: 'var(--text-muted)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, transition: 'background 0.12s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-panel-2)'}
        >
          {/* 3-dot icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="2.5" cy="7" r="1.4" fill="currentColor" />
            <circle cx="7" cy="7" r="1.4" fill="currentColor" />
            <circle cx="11.5" cy="7" r="1.4" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, overflowY: 'auto', padding: collapsed ? '6px 4px 0' : '6px 8px 0' }}>
        {NAV.map(n => (
          <NavItem key={n.id} {...n} active={active === n.id} onClick={() => setActive(n.id)} collapsed={collapsed} />
        ))}

        <SectionLabel label="Project" collapsed={collapsed} />
        {PROJECT_NAV.map(n => (
          <NavItem key={n.id} {...n} active={active === n.id} onClick={() => setActive(n.id)} collapsed={collapsed} />
        ))}

        <SectionLabel label="Learn" collapsed={collapsed} />
        {LEARN_NAV.map(n => (
          <NavItem key={n.id} {...n} active={active === n.id} onClick={() => setActive(n.id)} collapsed={collapsed} />
        ))}
      </div>

      {/* Pro upgrade — hidden when collapsed */}
      {!collapsed && (
        <div style={{
          margin: '8px', borderRadius: 'var(--r-xl)', flexShrink: 0,
          background: 'linear-gradient(145deg, #18152a, #221640)',
          border: '1px solid #2e2050', padding: '12px 10px', textAlign: 'center',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
            <Icons.Crown size={18} color="var(--accent)" />
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>Run3dtool Pro</div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 8 }}>Unlock all features</div>
          <button style={{
            width: '100%', padding: '6px', border: 'none', borderRadius: 'var(--r-lg)',
            background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: 11, cursor: 'pointer',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >Upgrade Now</button>
        </div>
      )}

      {/* Collapsed: crown icon at bottom */}
      {collapsed && (
        <div style={{ padding: '8px 0 10px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
          <button title="Upgrade to Pro" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <Icons.Crown size={18} color="var(--accent)" />
          </button>
        </div>
      )}
    </div>
  )
}
