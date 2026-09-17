interface Props { navTo: (id: string) => void }

export default function TopBar({ navTo }: Props) {
  return (
    <div style={{
      height: 48, display: 'flex', alignItems: 'center', gap: 12,
      background: '#100d1a', borderBottom: '1px solid #2a2535',
      padding: '0 16px', flexShrink: 0, zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8, flexShrink: 0 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8, flexShrink: 0,
          background: 'linear-gradient(135deg, #e91e8c, #c01060)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 900, color: '#fff',
        }}>R</div>
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>Run3dtool</div>
          <div style={{ fontSize: 8.5, color: '#7a7a8c', letterSpacing: '0.15em', textTransform: 'uppercase' }}>SOMARNIX</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 380, position: 'relative' }}>
        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#4a4560', fontSize: 13 }}>🔍</span>
        <input placeholder="Search assets, materials, projects..." style={{
          width: '100%', background: '#1a1726', border: '1px solid #2a2535',
          borderRadius: 8, color: '#c0bfd0', padding: '6px 60px 6px 32px', fontSize: 11.5,
        }} />
        <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 9.5, color: '#3a3550', background: '#12101e', border: '1px solid #2a2535', borderRadius: 4, padding: '1px 5px' }}>Ctrl K</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Bell */}
        <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #2a2535', background: '#1a1726', color: '#8a8a9c', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          🔔
          <span style={{ position: 'absolute', top: 5, right: 6, width: 7, height: 7, borderRadius: '50%', background: '#e91e8c', border: '1.5px solid #100d1a' }} />
        </button>
        {/* Cloud */}
        <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #2a2535', background: '#1a1726', color: '#8a8a9c', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>☁</button>
        {/* Project selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid #2a2535', borderRadius: 8, background: '#1a1726', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px', height: 32 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: 'linear-gradient(135deg,#e91e8c,#4a90d9)', flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: '#d0cfe0', fontWeight: 500 }}>MyProject</span>
          </div>
          <div style={{ width: 1, height: 32, background: '#2a2535' }} />
          <button style={{ width: 28, height: 32, border: 'none', background: 'none', color: '#6a6a7a', cursor: 'pointer', fontSize: 10 }}>▼</button>
        </div>
        {/* Save button */}
        <button style={{ padding: '0 16px', height: 32, border: 'none', borderRadius: 8, background: '#e91e8c', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer', letterSpacing: '0.02em' }}>Save</button>
        {/* Settings */}
        <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #2a2535', background: '#1a1726', color: '#8a8a9c', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚙</button>
        {/* User avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderLeft: '1px solid #2a2535', paddingLeft: 12 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#4a90d9,#e91e8c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>S</div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: '#ddd' }}>SOMARNIX</div>
            <div style={{ fontSize: 9.5, color: '#6a6a7c' }}>Creator</div>
          </div>
        </div>
        {/* Window controls */}
        <div style={{ display: 'flex', gap: 5, marginLeft: 6, paddingLeft: 10, borderLeft: '1px solid #2a2535' }}>
          {['—', '□', '✕'].map((s, i) => (
            <button key={i} style={{ width: 22, height: 22, border: 'none', borderRadius: 4, background: i === 2 ? '#c03030' : '#2a2535', color: '#ccc', fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
