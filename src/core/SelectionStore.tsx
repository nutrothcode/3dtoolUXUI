import { createContext, useContext, useReducer, type ReactNode } from 'react'

type SelectionState = { selectedIds: string[] }

type Action =
  | { type: 'SELECT'; id: string }
  | { type: 'MULTI_SELECT'; id: string }
  | { type: 'CLEAR' }

function reducer(state: SelectionState, action: Action): SelectionState {
  switch (action.type) {
    case 'SELECT':
      return { selectedIds: [action.id] }
    case 'MULTI_SELECT':
      return {
        selectedIds: state.selectedIds.includes(action.id)
          ? state.selectedIds.filter(id => id !== action.id)
          : [...state.selectedIds, action.id],
      }
    case 'CLEAR':
      return { selectedIds: [] }
    default:
      return state
  }
}

type SelectionCtx = {
  selectedIds: string[]
  primaryId: string | null
  dispatch: React.Dispatch<Action>
}

const SelectionContext = createContext<SelectionCtx | null>(null)

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { selectedIds: [] })
  return (
    <SelectionContext.Provider value={{ selectedIds: state.selectedIds, primaryId: state.selectedIds[0] ?? null, dispatch }}>
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelection() {
  const ctx = useContext(SelectionContext)
  if (!ctx) throw new Error('useSelection must be used inside SelectionProvider')
  return ctx
}
