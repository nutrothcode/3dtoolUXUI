import { type CSSProperties } from 'react'

export function PanelSection({ title, children, style }: { title: string; children: React.ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ borderTop: '1px solid var(--bd)', ...style }}>
      <div style={{
        padding: '6px 10px 4px', fontWeight: 600, fontSize: 10.5,
        color: 'var(--t2)', textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>{title}</div>
      <div style={{ padding: '0 10px 8px' }}>{children}</div>
    </div>
  )
}

export function XYZRow({ label, values }: { label: string; values: [string, string, string] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
      <span style={{ color: 'var(--t2)', fontSize: 10, width: 48, flexShrink: 0 }}>{label}</span>
      {(['X', 'Y', 'Z'] as const).map((ax, i) => (
        <div key={ax} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <span style={{
            fontSize: 9.5, fontWeight: 600,
            color: ax === 'X' ? '#e05050' : ax === 'Y' ? '#50c060' : '#5090e0',
            marginRight: 2, width: 8,
          }}>{ax}</span>
          <input defaultValue={values[i]} style={{
            flex: 1, background: 'var(--p3)', border: '1px solid var(--bd)',
            borderRadius: 3, color: 'var(--txt)', padding: '2px 4px', fontSize: 10.5,
            width: 0,
          }} />
        </div>
      ))}
    </div>
  )
}

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 10.5 }}>
      <span style={{ color: 'var(--t2)' }}>{label}</span>
      <span style={{ color: 'var(--txt)', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

export function Btn({ children, red, pink, small, full, onClick, style }: {
  children: React.ReactNode; red?: boolean; pink?: boolean; small?: boolean; full?: boolean;
  onClick?: () => void; style?: CSSProperties;
}) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 4, padding: small ? '3px 8px' : '5px 10px',
      width: full ? '100%' : undefined,
      background: red ? 'var(--red)' : pink ? 'var(--pink)' : 'var(--p4)',
      border: `1px solid ${red ? '#c03030' : pink ? 'var(--pink)' : 'var(--bd)'}`,
      borderRadius: 4, color: (red || pink) ? '#fff' : 'var(--txt)',
      fontWeight: 500, fontSize: 10.5, cursor: 'pointer',
      ...style,
    }}>{children}</button>
  )
}

export function Check({ checked, label, onChange }: { checked?: boolean; label: string; onChange?: (v: boolean) => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 10.5, marginBottom: 3 }}>
      <input type="checkbox" defaultChecked={checked} style={{ accentColor: 'var(--pink)', width: 12, height: 12 }}
        onChange={e => onChange?.(e.target.checked)} />
      <span style={{ color: 'var(--txt)' }}>{label}</span>
    </label>
  )
}

export function TabRow({ tabs, active, setActive }: { tabs: string[]; active: string; setActive: (t: string) => void }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid var(--bd)', flexShrink: 0 }}>
      {tabs.map(t => (
        <button key={t} onClick={() => setActive(t)} style={{
          padding: '6px 12px', border: 'none', background: 'none', cursor: 'pointer',
          fontSize: 11, fontWeight: 500,
          color: active === t ? 'var(--txt)' : 'var(--t2)',
          borderBottom: `2px solid ${active === t ? 'var(--pink)' : 'transparent'}`,
          marginBottom: -1,
        }}>{t}</button>
      ))}
    </div>
  )
}

export function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: '5px 10px', fontSize: 10, fontWeight: 700, color: 'var(--t2)',
      textTransform: 'uppercase', letterSpacing: '0.06em',
      background: 'var(--p3)', borderBottom: '1px solid var(--bd)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>{children}</div>
  )
}
