import React, { type CSSProperties } from 'react'

interface IconProps {
  size?: number
  color?: string
  style?: CSSProperties
}

type IconDef = (props: IconProps) => React.ReactElement

function make(path: string): IconDef {
  return ({ size = 16, color = 'currentColor', style }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
      stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: 'block', ...style }}>
      <path d={path} />
    </svg>
  )
}

function makeMulti(paths: string[]): IconDef {
  return ({ size = 16, color = 'currentColor', style }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
      stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: 'block', ...style }}>
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  )
}

export const Icons = {
  Home:         makeMulti(['M2 6.5L8 2l6 4.5V14H10V9.5H6V14H2V6.5z']),
  AssetLibrary: makeMulti(['M2 2h5v5H2z', 'M9 2h5v5H9z', 'M2 9h5v5H2z', 'M9 9h5v5H9z']),
  Material:     makeMulti(['M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2z', 'M5 5c1 0 3 1 3 3s-1 3-3 3']),
  Character:    makeMulti(['M8 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M5 7h6l1 8H4L5 7z', 'M6 7l-1 4M10 7l1 4']),
  Environment:  makeMulti(['M1 13L5 6l3 4 2-3 4 6H1z', 'M12 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z']),
  Props:        makeMulti(['M8 1l6 3.5v7L8 15l-6-3.5v-7L8 1z', 'M8 1v13', 'M2 4.5l6 3.5 6-3.5']),
  Animation:    makeMulti(['M3 2l11 6-11 6V2z']),
  Render:       makeMulti(['M1 4.5A1.5 1.5 0 0 1 2.5 3h11A1.5 1.5 0 0 1 15 4.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-8z', 'M5 7.5a2 2 0 1 0 4 0 2 2 0 0 0-4 0z', 'M11 5h.01']),
  Export:       makeMulti(['M8 2v8', 'M4 6l4-4 4 4', 'M2 11v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2']),
  Folder:       makeMulti(['M1 5a1 1 0 0 1 1-1h4l2 2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5z']),
  Clock:        makeMulti(['M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2z', 'M8 5v3l2.5 2.5']),
  Star:         makeMulti(['M8 1.5l1.8 3.6 4 .58-2.9 2.83.68 4L8 10.35 4.42 12.5l.68-4L2.2 5.68l4-.58L8 1.5z']),
  Cloud:        makeMulti(['M4.5 12a3 3 0 1 1 .5-5.96A4 4 0 1 1 12 10h.5a2 2 0 1 1 0 2H4.5z']),
  Book:         makeMulti(['M3 2h8a1 1 0 0 1 1 1v11H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z', 'M12 14H4a1 1 0 0 1 0-2h8', 'M5 5h6M5 8h4']),
  FileText:     makeMulti(['M9 1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5L9 1z', 'M9 1v4h4', 'M5 8h6M5 11h4']),
  Users:        makeMulti(['M11 12s0-2-3-2-3 2-3 2', 'M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M14 12s0-1.5-2-2', 'M12 5a2 2 0 0 1 0 4']),
  Search:       makeMulti(['M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z', 'M15 15l-3.5-3.5']),
  Bell:         makeMulti(['M8 2a5 5 0 0 0-5 5v3l-1 2h12l-1-2V7a5 5 0 0 0-5-5z', 'M6.5 13a1.5 1.5 0 0 0 3 0']),
  Save:         makeMulti(['M13 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7l4 4v7a1 1 0 0 1-1 1z', 'M9 2v4H5V2', 'M4 9h8v5H4z']),
  Settings:     makeMulti(['M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M12.7 10a5 5 0 0 0 .3-2 5 5 0 0 0-.3-2l2-1.6-2-3.4-2.3 1a5 5 0 0 0-3.4 0l-2.3-1L.7 4.4l2 1.6a5 5 0 0 0 0 4l-2 1.6 2 3.4 2.3-1a5 5 0 0 0 3.4 0l2.3 1 2-3.4-2-1.6z']),
  Undo:         makeMulti(['M4 7H9a4 4 0 0 1 0 8H6', 'M4 7L1 4l3-3']),
  Redo:         makeMulti(['M12 7H7a4 4 0 0 0 0 8h3', 'M12 7l3-3-3-3']),
  ChevronDown:  make('M3 6l5 5 5-5'),
  ChevronRight: make('M6 3l5 5-5 5'),
  Close:        make('M2 2l12 12M14 2L2 14'),
  Plus:         make('M8 2v12M2 8h12'),
  Crown:        makeMulti(['M1 12l2-7 3 4 2-7 2 7 3-4 2 7H1z', 'M1 12h14']),
  Filter:       makeMulti(['M2 3h12M4 8h8M6 13h4']),
  Grid:         makeMulti(['M2 2h5v5H2z', 'M9 2h5v5H9z', 'M2 9h5v5H2z', 'M9 9h5v5H9z']),
  List:         makeMulti(['M3 4h10M3 8h10M3 12h7']),
  Upload:       makeMulti(['M8 2v8', 'M4 6l4-4 4 4', 'M2 12h12']),
  Eye:          makeMulti(['M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z', 'M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z']),
  Lock:         makeMulti(['M5 7V5a3 3 0 0 1 6 0v2', 'M3 7h10a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z']),
  Layers:       makeMulti(['M8 1l7 4-7 4L1 5l7-4z', 'M1 9l7 4 7-4', 'M1 12l7 4 7-4']),
  Sliders:      makeMulti(['M2 4h12M10 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z', 'M2 8h12M6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z', 'M2 12h12M12 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z']),
  Play:         make('M3 2l11 6-11 6V2z'),
  Dot:          make('M8 8m-2 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0'),
  Refresh:      makeMulti(['M2 8a6 6 0 1 1 1.5 4', 'M2 13V8h5']),
  Trash:        makeMulti(['M1 4h14', 'M5 4V2h6v2', 'M3 4l1 10h8l1-10']),
  Edit:         makeMulti(['M11.5 2.5a2 2 0 0 1 2.83 2.83L5 14.5H2v-3L11.5 2.5z']),
  Copy:         makeMulti(['M5 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-2', 'M6 1h7a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z']),
  Link:         makeMulti(['M7 9a3 3 0 0 0 4.24.02l2-2a3 3 0 0 0-4.24-4.24l-1.13 1.13', 'M9 7a3 3 0 0 0-4.24-.02l-2 2a3 3 0 0 0 4.24 4.24l1.12-1.12']),
}

export type IconName = keyof typeof Icons
