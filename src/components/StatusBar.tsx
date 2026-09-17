export default function StatusBar() {
  return (
    <div style={{
      height: 26, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'var(--p1)', borderTop: '1px solid var(--bd)',
      padding: '0 12px', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--grn)' }} />
        <span style={{ color: 'var(--t2)', fontSize: 10.5 }}>Ready</span>
      </div>
      <div style={{ display: 'flex', gap: 16, color: 'var(--t2)', fontSize: 10.5 }}>
        <span>Project: <span style={{ color: 'var(--txt)' }}>KhmerMale_01</span></span>
        <span>Autosave: <span style={{ color: 'var(--grn)' }}>On</span></span>
      </div>
    </div>
  )
}
