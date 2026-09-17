import type { StepId } from '../modelTypes'
import { ALL_STEP_LABELS } from '../modelTypes'

interface Props {
  steps: StepId[]
  stepIndex: number
  setStepIndex: (i: number) => void
}

export default function StepBar({ steps = [], stepIndex, setStepIndex }: Props) {
  return (
    <div style={{
      height: 62, display: 'flex', alignItems: 'center',
      background: 'var(--p1)', borderBottom: '1px solid var(--bd)',
      padding: '0 12px', flexShrink: 0, overflow: 'hidden',
    }}>
      {steps.map((stepId, i) => {
        const active = stepIndex === i
        const done = stepIndex > i
        return (
          <button
            key={stepId}
            onClick={() => setStepIndex(i)}
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
              {i + 1}
            </div>
            <span style={{
              fontSize: 10.5, fontWeight: active ? 600 : 400,
              color: active ? 'var(--pink)' : 'var(--t2)',
              whiteSpace: 'nowrap', transition: 'color 0.15s',
            }}>
              {ALL_STEP_LABELS[stepId]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
