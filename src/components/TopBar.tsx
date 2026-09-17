import { useState } from 'react'
import { Icons } from './Icon'

interface Props { navTo: (id: string) => void }

function IconBtn({ icon, badge, title }: { icon: keyof typeof Icons; badge?: boolean; title?: string }) {
  const Ic = Icons[icon]
  return (
    <button title={title} style={{
      width: 30, height: 30, borderRadius: 'var(--r-lg)', border: '1px solid var(--border)',
      background: 'var(--bg-input)', color: 'var(--text-secondary)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      transition: 'border-color 0.12s, color 0.12s',
      flexShrink: 0,
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-focus)'; e.currentTarget.style.color = 'var(--text-primary)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
    >
      <Ic size={14} color="currentColor" />
      {badge && <span style={{ position: 'absolute', top: 4, right: 4, width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', border: '1.5px solid var(--bg-panel)' }} />}
    </button>
  )
}

export default function TopBar({ navTo }: Props) {
  const [search, setSearch] = useState('')

  return (
    <div style={{
      height: 'var(--topbar-h)', display: 'flex', alignItems: 'center', gap: 8,
      background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)',
      padding: '0 14px', flexShrink: 0, zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 6, flexShrink: 0 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7, flexShrink: 0,
          background: 'linear-gradient(135deg, #e91e8c, #a0106a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 900, color: '#fff', letterSpacing: '-0.5px',
        }}>R</div>
        <div style={{ lineHeight: 1.15 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>Run3dtool</div>
          <div style={{ fontSize: 8, color: 'var(--text-dim)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>SOMARNIX</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 360, position: 'relative' }}>
        <Icons.Search size={13} color="var(--text-dim)" style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search assets, materials, projects..."
          style={{
            width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-lg)', color: 'var(--text-primary)', padding: '5px 54px 5px 28px', fontSize: 11,
            transition: 'border-color 0.12s',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        <span style={{
          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
          fontSize: 9, color: 'var(--text-dim)', background: 'var(--bg-panel)',
          border: '1px solid var(--border)', borderRadius: 3, padding: '1px 5px',
          whiteSpace: 'nowrap',
        }}>Ctrl K</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <IconBtn icon="Bell" badge title="Notifications" />
        <IconBtn icon="Cloud" title="Cloud Sync" />

        {/* Undo / Redo */}
        <div style={{ display: 'flex', gap: 2, padding: '0 4px', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
          <IconBtn icon="Undo" title="Undo (Ctrl+Z)" />
          <IconBtn icon="Redo" title="Redo (Ctrl+Shift+Z)" />
        </div>

        {/* Project selector */}
        <div style={{
          display: 'flex', alignItems: 'center', border: '1px solid var(--border)',
          borderRadius: 'var(--r-lg)', background: 'var(--bg-input)', overflow: 'hidden', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px', height: 30 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: 'linear-gradient(135deg,var(--accent),var(--info))', flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: 'var(--text-primary)', fontWeight: 500, whiteSpace: 'nowrap' }}>MyProject</span>
          </div>
          <div style={{ width: 1, height: 30, background: 'var(--border)' }} />
          <button style={{
            width: 26, height: 30, border: 'none', background: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icons.ChevronDown size={11} color="currentColor" />
          </button>
        </div>

        {/* Save */}
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5, padding: '0 14px', height: 30,
          border: 'none', borderRadius: 'var(--r-lg)', background: 'var(--accent)', color: '#fff',
          fontWeight: 700, fontSize: 11.5, cursor: 'pointer', transition: 'background 0.12s', flexShrink: 0,
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
        >
          <Icons.Save size={13} color="#fff" />
          Save
        </button>

        <IconBtn icon="Settings" title="Settings" />

        {/* User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, borderLeft: '1px solid var(--border)', paddingLeft: 10, flexShrink: 0 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--info), var(--accent))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>S</div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>SOMARNIX</div>
            <div style={{ fontSize: 9.5, color: 'var(--text-muted)' }}>Creator</div>
          </div>
        </div>

        {/* Window controls */}
        <div style={{ display: 'flex', gap: 4, paddingLeft: 8, borderLeft: '1px solid var(--border)' }}>
          {['—', '□', '✕'].map((sym, i) => (
            <button key={i} style={{
              width: 22, height: 22, border: 'none', borderRadius: 4,
              background: i === 2 ? '#8a2020' : 'var(--bg-hover)',
              color: i === 2 ? '#fff' : 'var(--text-secondary)',
              fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{sym}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
