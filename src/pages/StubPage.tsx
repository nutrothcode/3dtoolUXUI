import { Icons, type IconName } from '../components/Icon'

interface StubPageProps {
  id: string
  icon: IconName
  title: string
  desc: string
  actions?: { label: string; primary?: boolean }[]
}

export default function StubPage({ icon, title, desc, actions = [] }: StubPageProps) {
  const Ic = Icons[icon]
  return (
    <div style={{
      height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 16, background: 'var(--bg-app)',
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: 18, border: '1px solid var(--border)',
        background: 'var(--bg-panel-2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Ic size={28} color="var(--text-muted)" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', maxWidth: 300 }}>{desc}</div>
      </div>
      {actions.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          {actions.map(a => (
            <button key={a.label} style={{
              padding: '7px 18px', border: a.primary ? 'none' : '1px solid var(--border)',
              borderRadius: 'var(--r-lg)', background: a.primary ? 'var(--accent)' : 'var(--bg-input)',
              color: a.primary ? '#fff' : 'var(--text-secondary)', fontSize: 11.5, fontWeight: a.primary ? 700 : 400,
              cursor: 'pointer',
            }}>{a.label}</button>
          ))}
        </div>
      )}
      <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 8 }}>Coming soon — in development</div>
    </div>
  )
}
