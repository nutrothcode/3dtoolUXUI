interface Props { step: number; setStep: (s: number) => void }

const STEPS = [
  { n: 1,  label: 'Parts' },
  { n: 2,  label: 'Assemble' },
  { n: 3,  label: 'Body Rig' },
  { n: 4,  label: 'Face Rig' },
  { n: 5,  label: 'Skin' },
  { n: 6,  label: 'Clothing' },
  { n: 7,  label: 'Retopology' },
  { n: 8,  label: 'UV' },
  { n: 9,  label: 'Texture' },
  { n: 10, label: 'Animate' },
  { n: 11, label: 'Export' },
]

export default function StepBar({ step, setStep }: Props) {
  return (
    <div style={{
      height: 62, display: 'flex', alignItems: 'center',
      background: 'var(--p1)', borderBottom: '1px solid var(--bd)',
      padding: '0 12px', flexShrink: 0,
    }}>
      {STEPS.map(s => {
        const active = step === s.n
        const done = step > s.n
        return (
          <button
            key={s.n}
            onClick={() => setStep(s.n)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 5, border: 'none', background: 'none',
              cursor: 'pointer', padding: '8px 4px', minWidth: 0,
            }}
          >
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: active ? 'var(--pink)' : done ? 'var(--p4)' : 'var(--p3)',
              border: `2px solid ${active ? 'var(--pink)' : done ? '#383b4e' : '#2e3144'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 11.5,
              color: active ? '#fff' : 'var(--t2)',
              flexShrink: 0,
              transition: 'background 0.15s, border-color 0.15s',
            }}>
              {s.n}
            </div>
            <span style={{
              fontSize: 10.5, fontWeight: active ? 600 : 400,
              color: active ? 'var(--pink)' : 'var(--t2)',
              whiteSpace: 'nowrap', transition: 'color 0.15s',
            }}>
              {s.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
