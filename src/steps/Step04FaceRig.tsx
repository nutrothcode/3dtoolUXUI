import { useState, useMemo } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────
type ProfileTier = 'Standard' | 'Extended' | 'Extended+' | 'HD'
type RightTab = 'Morphs' | 'Muscle' | 'Viseme' | 'Hierarchy'
type MorphValues = Record<string, number>

// ── Data ──────────────────────────────────────────────────────────────────────
const MORPH_GROUPS: Record<string, string[]> = {
  Eyes:    ['Blink_L', 'Blink_R', 'EyeWide_L', 'EyeWide_R', 'EyeSquint_L', 'EyeSquint_R', 'Wink_L', 'Wink_R'],
  Brows:   ['BrowDown_L', 'BrowDown_R', 'BrowInnerUp', 'BrowOuterUp_L', 'BrowOuterUp_R'],
  Cheeks:  ['CheekPuff', 'CheekSquint_L', 'CheekSquint_R'],
  Nose:    ['NoseSneer_L', 'NoseSneer_R', 'NoseTip'],
  Mouth:   ['MouthSmile_L', 'MouthSmile_R', 'MouthFrown_L', 'MouthFrown_R', 'MouthOpen', 'MouthClose', 'MouthPucker', 'MouthFunnel', 'MouthStretch_L', 'MouthStretch_R', 'MouthDimple_L', 'MouthDimple_R', 'MouthPress_L', 'MouthPress_R'],
  Jaw:     ['JawOpen', 'JawLeft', 'JawRight', 'JawForward'],
  Tongue:  ['TongueOut', 'TongueUp', 'TongueDown', 'TongueLeft', 'TongueRight'],
  Eyelid:  ['EyelidUpperUp_L', 'EyelidUpperUp_R', 'EyelidLowerDown_L', 'EyelidLowerDown_R'],
}

const TIER_GROUPS: Record<ProfileTier, string[]> = {
  'Standard':  ['Eyes', 'Brows', 'Cheeks', 'Nose', 'Mouth', 'Jaw'],
  'Extended':  ['Eyes', 'Brows', 'Cheeks', 'Nose', 'Mouth', 'Jaw', 'Tongue'],
  'Extended+': ['Eyes', 'Brows', 'Cheeks', 'Nose', 'Mouth', 'Jaw', 'Tongue', 'Eyelid'],
  'HD':        ['Eyes', 'Brows', 'Cheeks', 'Nose', 'Mouth', 'Jaw', 'Tongue', 'Eyelid'],
}

const PROFILES = [
  { tier: 'Standard'  as ProfileTier, morphs: '60+',  label: 'ARKit · Mocap · Stylized' },
  { tier: 'Extended'  as ProfileTier, morphs: '140+', label: 'Detailed Mocap · Tongue' },
  { tier: 'Extended+' as ProfileTier, morphs: '250+', label: 'Non-linear · Lip Sync' },
  { tier: 'HD'        as ProfileTier, morphs: '390+', label: 'MetaHuman-compatible' },
]

const EXPRESSION_PRESETS: Record<string, { emoji: string; color: string; morphs: Partial<MorphValues> }> = {
  Neutral:  { emoji: '😐', color: '#6a6888', morphs: {} },
  Happy:    { emoji: '😄', color: '#27c96a', morphs: { MouthSmile_L: 82, MouthSmile_R: 82, CheekSquint_L: 65, CheekSquint_R: 65, EyeSquint_L: 45, EyeSquint_R: 45 } },
  Sad:      { emoji: '😢', color: '#4a90d9', morphs: { BrowInnerUp: 75, MouthFrown_L: 82, MouthFrown_R: 82, BrowDown_L: 25, BrowDown_R: 25 } },
  Angry:    { emoji: '😡', color: '#e05050', morphs: { BrowDown_L: 88, BrowDown_R: 88, NoseSneer_L: 55, NoseSneer_R: 55, MouthFrown_L: 50, MouthFrown_R: 50, MouthPress_L: 65, MouthPress_R: 65 } },
  Disgust:  { emoji: '🤢', color: '#80c060', morphs: { NoseSneer_L: 92, NoseSneer_R: 92, MouthFrown_L: 60, MouthFrown_R: 60, BrowDown_L: 40, CheekSquint_L: 30 } },
  Fear:     { emoji: '😨', color: '#e091e8', morphs: { EyeWide_L: 92, EyeWide_R: 92, BrowInnerUp: 82, BrowOuterUp_L: 72, BrowOuterUp_R: 72, MouthOpen: 48 } },
  Surprise: { emoji: '😲', color: '#f0c040', morphs: { EyeWide_L: 100, EyeWide_R: 100, BrowOuterUp_L: 100, BrowOuterUp_R: 100, MouthOpen: 68, JawOpen: 58 } },
}

const REGION_COLORS: Record<string, string> = {
  Eyes: '#4a90d9', Brows: '#27c96a', Cheeks: '#f0a040',
  Nose: '#80c0d0', Mouth: '#e91e8c', Jaw: '#a070e0',
  Tongue: '#e05050', Eyelid: '#60d0c0',
}

const VISEME_SHAPES = ['Ah', 'Ee', 'Oh', 'Oo', 'Mm', 'Ff', 'Th', 'Ww']
const TONGUE_SHAPES = ['Rest', 'Up', 'Down', 'Front', 'Back', 'L-pos', 'R-pos']

const FACE_BONES = [
  { id: 'head',         label: 'Head',           depth: 0 },
  { id: 'jaw',          label: 'Jaw',             depth: 1 },
  { id: 'tongue_root',  label: 'Tongue_Root',     depth: 2 },
  { id: 'tongue_mid',   label: 'Tongue_Mid',      depth: 3 },
  { id: 'tongue_tip',   label: 'Tongue_Tip',      depth: 4 },
  { id: 'eye_l',        label: 'Eye_L',           depth: 1 },
  { id: 'eye_r',        label: 'Eye_R',           depth: 1 },
  { id: 'brow_inner_l', label: 'Brow_Inner_L',    depth: 1 },
  { id: 'brow_mid_l',   label: 'Brow_Mid_L',      depth: 2 },
  { id: 'brow_outer_l', label: 'Brow_Outer_L',    depth: 2 },
  { id: 'brow_inner_r', label: 'Brow_Inner_R',    depth: 1 },
  { id: 'brow_mid_r',   label: 'Brow_Mid_R',      depth: 2 },
  { id: 'brow_outer_r', label: 'Brow_Outer_R',    depth: 2 },
  { id: 'cheek_l',      label: 'Cheek_L',         depth: 1 },
  { id: 'cheek_r',      label: 'Cheek_R',         depth: 1 },
  { id: 'lip_upper_c',  label: 'Lip_Upper_C',     depth: 1 },
  { id: 'lip_upper_l',  label: 'Lip_Upper_L',     depth: 2 },
  { id: 'lip_upper_r',  label: 'Lip_Upper_R',     depth: 2 },
  { id: 'lip_lower_c',  label: 'Lip_Lower_C',     depth: 1 },
  { id: 'lip_corner_l', label: 'Lip_Corner_L',    depth: 1 },
  { id: 'lip_corner_r', label: 'Lip_Corner_R',    depth: 1 },
]

function defaultMorphs(): MorphValues {
  const m: MorphValues = {}
  Object.values(MORPH_GROUPS).flat().forEach(k => { m[k] = 0 })
  return m
}

// ── MorphRow ──────────────────────────────────────────────────────────────────
function MorphRow({ name, value, onChange, highlight, compact }: {
  name: string; value: number; onChange: (v: number) => void
  highlight?: boolean; compact?: boolean
}) {
  const color = highlight ? '#e91e8c' : value > 0 ? '#c0bfd4' : '#6a6888'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: compact ? '2px 0' : '4px 10px', borderBottom: compact ? 'none' : '1px solid rgba(255,255,255,0.03)' }}>
      <span style={{ fontSize: 9.5, color, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{name}</span>
      <input type="range" min={0} max={100} value={value} onChange={e => onChange(Number(e.target.value))}
        style={{ width: compact ? 48 : 62, accentColor: '#e91e8c', height: 3, flexShrink: 0, cursor: 'pointer' }} />
      <span style={{ fontSize: 9.5, color: value > 0 ? '#c0bfd4' : '#3a3858', width: 22, textAlign: 'right', flexShrink: 0 }}>{value}</span>
    </div>
  )
}

// ── Face SVG ──────────────────────────────────────────────────────────────────
function FaceSVG({ morphs, activeRegion }: { morphs: MorphValues; activeRegion: string | null }) {
  const v = (k: string) => (morphs[k] ?? 0) / 100

  // Derived values
  const smileNet  = (v('MouthSmile_L') + v('MouthSmile_R')) / 2
  const frownNet  = (v('MouthFrown_L') + v('MouthFrown_R')) / 2
  const mouthCurve = smileNet * 24 - frownNet * 16
  const mouthOpen  = Math.max(v('MouthOpen'), v('JawOpen'))
  const pucker     = v('MouthPucker')
  const stretch    = (v('MouthStretch_L') + v('MouthStretch_R')) / 2
  const mouthW     = 64 - pucker * 30 + stretch * 16
  const lipGap     = mouthOpen * 20
  const jawDrop    = mouthOpen * 8

  const blinkL = v('Blink_L'), blinkR = v('Blink_R')
  const wideL  = v('EyeWide_L'), wideR  = v('EyeWide_R')
  const EY = 9.5
  const eyeLRy = Math.max(0.15, EY * (1 - blinkL + wideL * 0.35))
  const eyeRRy = Math.max(0.15, EY * (1 - blinkR + wideR * 0.35))

  const bdL = v('BrowDown_L'), bdR = v('BrowDown_R')
  const biU = v('BrowInnerUp')
  const boL = v('BrowOuterUp_L'), boR = v('BrowOuterUp_R')
  const blOY = 88 + bdL * 10 - boL * 14    // outer brow L Y
  const blIY = 92 + bdL * 8  - biU * 18    // inner brow L Y
  const brIY = 92 + bdR * 8  - biU * 18    // inner brow R Y
  const brOY = 88 + bdR * 10 - boR * 14    // outer brow R Y

  const cheekPuff = v('CheekPuff')
  const cx = 130, mBaseY = 207
  const mCtrlY = mBaseY + mouthCurve
  const lY = mBaseY + mouthCurve * 0.08
  const isOn = (r: string) => activeRegion === r

  return (
    <svg width="260" height="320" viewBox="0 0 260 320" style={{ filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.7))' }}>
      <defs>
        <radialGradient id="fg" cx="40%" cy="28%" r="70%">
          <stop offset="0%"   stopColor="#f0d8b0" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#805030" stopOpacity="0.15" />
        </radialGradient>
        <radialGradient id="blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#e08060" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#e08060" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Hair */}
      <ellipse cx="130" cy="55" rx="100" ry="72" fill="#1c1008" />
      <rect x="30" y="55" width="19" height="105" rx="9" fill="#1c1008" />
      <rect x="211" y="55" width="19" height="105" rx="9" fill="#1c1008" />

      {/* Head base */}
      <ellipse cx="130" cy="163" rx="93" ry="122" fill="#c8a882" />
      <ellipse cx="130" cy="163" rx="93" ry="122" fill="url(#fg)" />

      {/* Ears */}
      <ellipse cx="37"  cy="165" rx="11" ry="18" fill="#be9d70" />
      <ellipse cx="223" cy="165" rx="11" ry="18" fill="#be9d70" />

      {/* Region overlays */}
      {isOn('Brows')  && <rect x="70"  y="72"  width="120" height="32" rx="8" fill="#27c96a" opacity="0.1" />}
      {isOn('Eyes')   && <rect x="72"  y="108" width="116" height="36" rx="8" fill="#4a90d9" opacity="0.1" />}
      {isOn('Cheeks') && <>
        <ellipse cx="70"  cy="167" rx={30 + cheekPuff * 10} ry="22" fill="#f0a040" opacity="0.13" />
        <ellipse cx="190" cy="167" rx={30 + cheekPuff * 10} ry="22" fill="#f0a040" opacity="0.13" />
      </>}
      {isOn('Nose')   && <ellipse cx="130" cy="171" rx="24" ry="26" fill="#80c0d0" opacity="0.12" />}
      {isOn('Mouth')  && <rect x="93"  y="194" width="74" height={34 + lipGap} rx="8" fill="#e91e8c" opacity="0.1" />}
      {isOn('Jaw')    && <ellipse cx="130" cy="262" rx="54" ry="22" fill="#a070e0" opacity="0.1" />}

      {/* Cheek blush */}
      <ellipse cx="75"  cy="167" rx={22 + cheekPuff * 8} ry="13" fill="url(#blush)" opacity={0.5 + cheekPuff * 0.6} />
      <ellipse cx="185" cy="167" rx={22 + cheekPuff * 8} ry="13" fill="url(#blush)" opacity={0.5 + cheekPuff * 0.6} />

      {/* Eyebrows */}
      <path d={`M 80 ${blOY} Q 96 ${(blOY+blIY)/2-4} 112 ${blIY}`} fill="none" stroke="#1c1008" strokeWidth="3.5" strokeLinecap="round" />
      <path d={`M 148 ${brIY} Q 164 ${(brIY+brOY)/2-4} 180 ${brOY}`} fill="none" stroke="#1c1008" strokeWidth="3.5" strokeLinecap="round" />

      {/* Eye whites */}
      <ellipse cx="100" cy="128" rx="20" ry={EY} fill="white" />
      <ellipse cx="160" cy="128" rx="20" ry={EY} fill="white" />

      {/* Iris + pupil */}
      <ellipse cx="100" cy="128" rx="9" ry={Math.min(9, eyeLRy * 0.94)} fill="#3a2515" />
      <ellipse cx="160" cy="128" rx="9" ry={Math.min(9, eyeRRy * 0.94)} fill="#3a2515" />
      <ellipse cx="100" cy="128" rx="5" ry={Math.min(5, eyeLRy * 0.94)} fill="#0a0508" />
      <ellipse cx="160" cy="128" rx="5" ry={Math.min(5, eyeRRy * 0.94)} fill="#0a0508" />
      <ellipse cx="97"  cy="125" rx="2.5" ry={Math.min(2.5, eyeLRy * 0.24)} fill="white" opacity="0.85" />
      <ellipse cx="157" cy="125" rx="2.5" ry={Math.min(2.5, eyeRRy * 0.24)} fill="white" opacity="0.85" />

      {/* Upper eyelids (blink cover) */}
      <ellipse cx="100" cy={128 - eyeLRy} rx="21" ry={EY - eyeLRy + 0.3} fill="#c8a882" />
      <ellipse cx="160" cy={128 - eyeRRy} rx="21" ry={EY - eyeRRy + 0.3} fill="#c8a882" />

      {/* Lid crease */}
      <path d={`M 80 ${128-eyeLRy-1} Q 100 ${128-eyeLRy-4} 120 ${128-eyeLRy-1}`} fill="none" stroke="#b08860" strokeWidth="0.8" opacity="0.5" />
      <path d={`M 140 ${128-eyeRRy-1} Q 160 ${128-eyeRRy-4} 180 ${128-eyeRRy-1}`} fill="none" stroke="#b08860" strokeWidth="0.8" opacity="0.5" />

      {/* Nose */}
      <path d="M 130 150 Q 121 171 117 181 Q 128 190 143 181 Q 138 171 130 150" fill="#b89070" opacity="0.42" />
      <ellipse cx="120" cy="181" rx="6.5" ry="4" fill="#a07555" opacity="0.35" />
      <ellipse cx="140" cy="181" rx="6.5" ry="4" fill="#a07555" opacity="0.35" />

      {/* Mouth */}
      {mouthOpen > 0.06 ? (
        <>
          <path d={`M ${cx-mouthW/2} ${lY} Q ${cx} ${mCtrlY-4} ${cx+mouthW/2} ${lY}`} fill="none" stroke="#7a3830" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx={cx} cy={lY + lipGap * 0.32 + jawDrop} rx={mouthW * 0.4} ry={lipGap * 0.46 + 2} fill="#180606" />
          {mouthOpen > 0.22 && <rect x={cx-mouthW*0.3} y={lY+3} width={mouthW*0.6} height={Math.min(lipGap*0.32, 7)} rx="2.5" fill="rgba(255,255,255,0.82)" />}
          {mouthOpen > 0.35 && <rect x={cx-mouthW*0.25} y={lY+lipGap*0.48+jawDrop-2} width={mouthW*0.5} height={Math.min(lipGap*0.28, 6)} rx="2.5" fill="rgba(255,255,255,0.68)" />}
          <path d={`M ${cx-mouthW/2+6} ${lY+lipGap+jawDrop+2} Q ${cx} ${mCtrlY+lipGap+jawDrop+5} ${cx+mouthW/2-6} ${lY+lipGap+jawDrop+2}`} fill="none" stroke="#7a3830" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d={`M ${cx-mouthW/2} ${lY} Q ${cx} ${mCtrlY} ${cx+mouthW/2} ${lY}`} fill="none" stroke="#8a5040" strokeWidth="2.5" strokeLinecap="round" />
          <path d={`M ${cx-mouthW/2+10} ${lY-2} Q ${cx} ${mCtrlY-8} ${cx+mouthW/2-10} ${lY-2}`} fill="none" stroke="#d4a878" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
        </>
      )}

      {/* Control points */}
      {([
        { x: 100,           y: 128,       r: 'Eyes'   },
        { x: 160,           y: 128,       r: 'Eyes'   },
        { x: 82,            y: blOY-2,    r: 'Brows'  },
        { x: 178,           y: brOY-2,    r: 'Brows'  },
        { x: 68,            y: 167,       r: 'Cheeks' },
        { x: 192,           y: 167,       r: 'Cheeks' },
        { x: cx-mouthW/2-2, y: lY,        r: 'Mouth'  },
        { x: cx+mouthW/2+2, y: lY,        r: 'Mouth'  },
        { x: cx,            y: mCtrlY-6,  r: 'Mouth'  },
        { x: 130,           y: 181,       r: 'Nose'   },
        { x: 130,           y: 262,       r: 'Jaw'    },
      ] as {x:number;y:number;r:string}[]).map((pt, i) => {
        const on = isOn(pt.r)
        const c = REGION_COLORS[pt.r]
        return (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r={on ? 6 : 4.5} fill="none" stroke={c} strokeWidth={on ? 2 : 1.5} opacity={0.9} />
            <circle cx={pt.x} cy={pt.y} r={on ? 3 : 2}   fill={c} opacity={0.8} />
          </g>
        )
      })}
    </svg>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Step04FaceRig() {
  const [profile, setProfile]       = useState<ProfileTier>('Standard')
  const [morphs, setMorphs]         = useState<MorphValues>(defaultMorphs)
  const [activeExpr, setActiveExpr] = useState('Neutral')
  const [intensity, setIntensity]   = useState(100)
  const [symmetry, setSymmetry]     = useState(true)
  const [exprMix, setExprMix]       = useState(false)
  const [rightTab, setRightTab]     = useState<RightTab>('Morphs')
  const [morphSearch, setMorphSearch] = useState('')
  const [openGroups, setOpenGroups] = useState(new Set(['Eyes', 'Mouth']))
  const [activeRegion, setActiveRegion] = useState<string | null>(null)
  const [visemeMode, setVisemeMode] = useState<'8+7' | '1:1'>('8+7')
  const [activeViseme, setActiveViseme] = useState<string | null>(null)

  const unlocked = TIER_GROUPS[profile]

  const setMorph = (key: string, val: number) => {
    setMorphs(m => {
      const next = { ...m, [key]: val }
      if (symmetry) {
        if (key.endsWith('_L')) next[key.replace('_L', '_R')] = val
        if (key.endsWith('_R')) next[key.replace('_R', '_L')] = val
      }
      return next
    })
  }

  const applyExpression = (name: string, pct: number) => {
    setActiveExpr(name)
    const preset = EXPRESSION_PRESETS[name]
    if (!preset) return
    const base = exprMix ? { ...morphs } : defaultMorphs()
    const next = { ...base }
    const scale = pct / 100
    if (name === 'Neutral') { Object.keys(next).forEach(k => { next[k] = 0 }); setMorphs(next); return }
    Object.entries(preset.morphs).forEach(([k, raw]) => {
      const v = Math.round((raw as number) * scale)
      next[k] = v
      if (symmetry) {
        if (k.endsWith('_L')) next[k.replace('_L', '_R')] = v
        if (k.endsWith('_R')) next[k.replace('_R', '_L')] = v
      }
    })
    setMorphs(next)
  }

  const visibleGroups = useMemo(() => {
    const result: Record<string, string[]> = {}
    unlocked.forEach(g => {
      const keys = MORPH_GROUPS[g] ?? []
      const filtered = morphSearch ? keys.filter(k => k.toLowerCase().includes(morphSearch.toLowerCase())) : keys
      if (filtered.length) result[g] = filtered
    })
    return result
  }, [unlocked, morphSearch])

  const activeMorphs = Object.entries(morphs).filter(([, v]) => v !== 0)
  const exprColor = EXPRESSION_PRESETS[activeExpr]?.color ?? '#6a6888'

  const toggleGroup = (g: string) => setOpenGroups(s => { const n = new Set(s); n.has(g) ? n.delete(g) : n.add(g); return n })
  const toggleRegion = (r: string) => setActiveRegion(a => a === r ? null : r)

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: '#0d0a14' }}>

      {/* ── LEFT PANEL ─────────────────────────────────────────────────────── */}
      <div style={{ width: 216, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#0f0c1a', borderRight: '1px solid #1e1b2c', overflow: 'hidden' }}>

        {/* Profile Tier */}
        <div style={{ padding: '10px 12px', borderBottom: '1px solid #1e1b2c', flexShrink: 0 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: '#6a6888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Expression Profile</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {PROFILES.map(p => (
              <button key={p.tier} onClick={() => setProfile(p.tier)} style={{
                padding: '5px 7px', borderRadius: 6, cursor: 'pointer', textAlign: 'left',
                border: `1px solid ${profile === p.tier ? '#e91e8c' : '#252336'}`,
                background: profile === p.tier ? 'rgba(233,30,140,0.1)' : '#181626',
              }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: profile === p.tier ? '#e91e8c' : '#c0bfd4' }}>{p.tier}</div>
                <div style={{ fontSize: 8.5, color: '#6a6888' }}>{p.morphs} morphs</div>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 9, color: '#4a4868', marginTop: 5 }}>{PROFILES.find(p => p.tier === profile)?.label}</div>
        </div>

        {/* Expression Presets */}
        <div style={{ padding: '10px 12px', borderBottom: '1px solid #1e1b2c', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: '#6a6888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Presets</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: 9.5, color: '#6a6888' }}>
              <input type="checkbox" checked={exprMix} onChange={e => setExprMix(e.target.checked)} style={{ accentColor: '#e91e8c', width: 11, height: 11 }} />Mix
            </label>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginBottom: 10 }}>
            {Object.entries(EXPRESSION_PRESETS).map(([name, p]) => (
              <button key={name} onClick={() => applyExpression(name, intensity)} title={name} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                padding: '5px 2px', borderRadius: 7, cursor: 'pointer',
                border: `1.5px solid ${activeExpr === name ? p.color : '#1e1b2c'}`,
                background: activeExpr === name ? `${p.color}18` : '#141220',
              }}>
                <span style={{ fontSize: 15 }}>{p.emoji}</span>
                <span style={{ fontSize: 8, color: activeExpr === name ? p.color : '#6a6888', fontWeight: 600 }}>{name}</span>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 9.5, color: '#6a6888', flexShrink: 0 }}>Intensity</span>
            <input type="range" min={0} max={100} value={intensity} onChange={e => { const v = Number(e.target.value); setIntensity(v); applyExpression(activeExpr, v) }}
              style={{ flex: 1, accentColor: '#e91e8c', cursor: 'pointer' }} />
            <span style={{ fontSize: 9.5, color: '#c0bfd4', width: 22, textAlign: 'right' }}>{intensity}</span>
          </div>
        </div>

        {/* Region Mix */}
        <div style={{ padding: '10px 12px', borderBottom: '1px solid #1e1b2c', flexShrink: 0 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: '#6a6888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Regions</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {unlocked.map(r => (
              <button key={r} onClick={() => toggleRegion(r)} style={{
                padding: '3px 8px', borderRadius: 12, cursor: 'pointer', fontSize: 9.5, fontWeight: 600,
                border: `1px solid ${activeRegion === r ? REGION_COLORS[r] : '#252336'}`,
                background: activeRegion === r ? `${REGION_COLORS[r]}20` : '#181626',
                color: activeRegion === r ? REGION_COLORS[r] : '#6a6888',
              }}>{r}</button>
            ))}
          </div>
        </div>

        {/* Symmetry + actions */}
        <div style={{ padding: '10px 12px', flexShrink: 0 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', marginBottom: 8 }}>
            <input type="checkbox" checked={symmetry} onChange={e => setSymmetry(e.target.checked)} style={{ accentColor: '#e91e8c', width: 12, height: 12 }} />
            <span style={{ fontSize: 10.5, color: '#c0bfd4' }}>Mirror L ↔ R</span>
          </label>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => { setMorphs(defaultMorphs()); setActiveExpr('Neutral') }}
              style={{ flex: 1, padding: '5px', border: '1px solid #252336', borderRadius: 6, background: '#181626', color: '#8a8aaa', fontSize: 10, cursor: 'pointer' }}>Reset</button>
            <button style={{ flex: 1, padding: '5px', border: 'none', borderRadius: 6, background: '#e91e8c', color: '#fff', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>Save</button>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {activeMorphs.length > 0 && (
          <div style={{ padding: '7px 12px', borderTop: '1px solid #1e1b2c', background: 'rgba(233,30,140,0.05)' }}>
            <span style={{ fontSize: 10, color: '#e91e8c', fontWeight: 600 }}>{activeMorphs.length}</span>
            <span style={{ fontSize: 10, color: '#4a4868' }}> active morph{activeMorphs.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* ── CENTER VIEWPORT ────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'linear-gradient(160deg, #0d1020 0%, #070910 100%)', position: 'relative', overflow: 'hidden', minWidth: 0 }}>
        <div style={{ padding: '7px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #181828', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#e91e8c' }}>Face Rig</span>
            <span style={{ fontSize: 10, color: '#2e2c40' }}>|</span>
            <span style={{ fontSize: 10, color: '#5a5878' }}>{profile} · {activeMorphs.length} active</span>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            {['Ortho', 'Wireframe', 'Symmetry'].map(btn => (
              <button key={btn} style={{ padding: '3px 9px', border: '1px solid #252336', borderRadius: 5, background: '#181626', color: '#6a6888', fontSize: 9.5, cursor: 'pointer' }}>{btn}</button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {/* Grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
          {/* Center guide */}
          <div style={{ position: 'absolute', left: '50%', top: '10%', bottom: '10%', width: 1, background: 'rgba(233,30,140,0.12)', transform: 'translateX(-50%)' }} />
          <FaceSVG morphs={morphs} activeRegion={activeRegion} />
        </div>

        {/* Bottom status */}
        <div style={{ padding: '6px 14px', borderTop: '1px solid #181828', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {unlocked.map(r => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: REGION_COLORS[r] }} />
                <span style={{ fontSize: 9, color: '#4a4868' }}>{r}</span>
              </div>
            ))}
          </div>
          <span style={{ fontSize: 9.5, color: activeExpr !== 'Neutral' ? exprColor : '#3a3858', fontWeight: 600 }}>
            {activeExpr !== 'Neutral' ? `${activeExpr} · ${intensity}%` : 'Neutral'}
          </span>
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────────────────────────── */}
      <div style={{ width: 256, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#0f0c1a', borderLeft: '1px solid #1e1b2c', overflow: 'hidden' }}>

        {/* Tab bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid #1e1b2c', flexShrink: 0 }}>
          {(['Morphs', 'Muscle', 'Viseme', 'Hierarchy'] as RightTab[]).map(t => (
            <button key={t} onClick={() => setRightTab(t)} style={{
              flex: 1, padding: '7px 2px', border: 'none', borderBottom: `2px solid ${rightTab === t ? '#e91e8c' : 'transparent'}`,
              background: 'none', color: rightTab === t ? '#e91e8c' : '#4a4868', fontSize: 9.5, fontWeight: 600, cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>

        {/* MORPHS TAB */}
        {rightTab === 'Morphs' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '8px 10px', flexShrink: 0 }}>
              <input value={morphSearch} onChange={e => setMorphSearch(e.target.value)} placeholder="Search morphs..."
                style={{ width: '100%', background: '#181626', border: '1px solid #252336', borderRadius: 6, color: '#c0bfd4', padding: '5px 8px', fontSize: 10.5, boxSizing: 'border-box' }} />
            </div>
            {activeMorphs.length > 0 && !morphSearch && (
              <div style={{ padding: '0 10px 4px', flexShrink: 0 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#e91e8c', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Active</div>
                {activeMorphs.slice(0, 5).map(([k, v]) => <MorphRow key={`a_${k}`} name={k} value={v} onChange={val => setMorph(k, val)} highlight />)}
                {activeMorphs.length > 5 && <div style={{ fontSize: 9.5, color: '#4a4868', padding: '2px 0' }}>+{activeMorphs.length - 5} more</div>}
                <div style={{ height: 1, background: '#1e1b2c', margin: '5px 0' }} />
              </div>
            )}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {Object.entries(visibleGroups).map(([group, keys]) => (
                <div key={group}>
                  <div onClick={() => toggleGroup(group)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', background: '#141220', borderBottom: '1px solid #1e1b2c', cursor: 'pointer', userSelect: 'none' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: REGION_COLORS[group] ?? '#4a4868', flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 10.5, fontWeight: 600, color: '#c0bfd4' }}>{group}</span>
                    <span style={{ fontSize: 8, color: '#4a4868' }}>{openGroups.has(group) ? '▼' : '▶'}</span>
                  </div>
                  {openGroups.has(group) && keys.map(k => (
                    <MorphRow key={k} name={k} value={morphs[k] ?? 0} onChange={val => setMorph(k, val)} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MUSCLE TAB */}
        {rightTab === 'Muscle' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            <div style={{ fontSize: 9.5, color: '#4a4868', marginBottom: 10 }}>Click a region to expand its muscle controls.</div>
            {unlocked.map(region => {
              const keys = MORPH_GROUPS[region] ?? []
              const avg = Math.round(keys.reduce((s, k) => s + (morphs[k] ?? 0), 0) / Math.max(1, keys.length))
              const c = REGION_COLORS[region] ?? '#4a4868'
              const isExpanded = activeRegion === region
              return (
                <div key={region} style={{ marginBottom: 7, borderRadius: 8, border: `1px solid ${isExpanded ? c : '#1e1b2c'}`, overflow: 'hidden' }}>
                  <div onClick={() => toggleRegion(region)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: '#141220', cursor: 'pointer', userSelect: 'none' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: c, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 10.5, fontWeight: 600, color: '#c0bfd4' }}>{region}</span>
                    <div style={{ width: 32, height: 3, borderRadius: 2, background: '#252336', flexShrink: 0, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${avg}%`, background: c }} />
                    </div>
                    <span style={{ fontSize: 9.5, color: avg > 0 ? c : '#4a4868', width: 22, textAlign: 'right' }}>{avg}</span>
                  </div>
                  {isExpanded && (
                    <div style={{ padding: '6px 10px 8px', background: '#0f0c1a' }}>
                      {keys.map(k => <MorphRow key={k} name={k} value={morphs[k] ?? 0} onChange={val => setMorph(k, val)} compact />)}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* VISEME TAB */}
        {rightTab === 'Viseme' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '10px', borderBottom: '1px solid #1e1b2c', flexShrink: 0 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#6a6888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 7 }}>Lip Sync Mode</div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 7 }}>
                {(['8+7', '1:1'] as const).map(m => (
                  <button key={m} onClick={() => setVisemeMode(m)} style={{
                    flex: 1, padding: '5px', cursor: 'pointer', fontSize: 10.5, fontWeight: 600,
                    border: `1px solid ${visemeMode === m ? '#e91e8c' : '#252336'}`,
                    borderRadius: 6, background: visemeMode === m ? 'rgba(233,30,140,0.12)' : '#181626',
                    color: visemeMode === m ? '#e91e8c' : '#6a6888',
                  }}>{m}</button>
                ))}
              </div>
              <div style={{ fontSize: 9.5, color: '#4a4868' }}>
                {visemeMode === '8+7' ? '8 lip shapes + 7 tongue poses with predefined curves' : '1:1 — one sound maps to one shape (scanned / stylized)'}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#6a6888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Lip Shapes</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 14 }}>
                {VISEME_SHAPES.map(vs => (
                  <button key={vs} onClick={() => setActiveViseme(a => a === vs ? null : vs)} style={{
                    padding: '8px 3px', borderRadius: 7, cursor: 'pointer',
                    border: `1.5px solid ${activeViseme === vs ? '#e91e8c' : '#1e1b2c'}`,
                    background: activeViseme === vs ? 'rgba(233,30,140,0.12)' : '#141220',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  }}>
                    <div style={{ fontSize: 16 }}>👄</div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: activeViseme === vs ? '#e91e8c' : '#c0bfd4' }}>{vs}</span>
                  </button>
                ))}
              </div>
              {unlocked.includes('Tongue') && (
                <>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: '#6a6888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 7 }}>Tongue Poses</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                    {TONGUE_SHAPES.map(ts => (
                      <button key={ts} style={{ padding: '5px 3px', borderRadius: 6, border: '1px solid #1e1b2c', background: '#141220', cursor: 'pointer', fontSize: 9.5, color: '#6a6888', fontWeight: 600 }}>{ts}</button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* HIERARCHY TAB */}
        {rightTab === 'Hierarchy' && (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ padding: '6px 10px', borderBottom: '1px solid #1e1b2c', fontSize: 9.5, color: '#4a4868' }}>
              {FACE_BONES.length} face bones · {profile} profile
            </div>
            {FACE_BONES
              .filter(b => b.depth <= (unlocked.includes('Tongue') ? 4 : b.id.startsWith('tongue') ? -1 : 2))
              .map(bone => (
                <div key={bone.id} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', paddingLeft: 10 + bone.depth * 14, borderBottom: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#141220' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none' }}>
                  <span style={{ fontSize: 9, color: '#27c96a', opacity: 0.8 }}>◆</span>
                  <span style={{ fontSize: 10.5, color: '#c0bfd4' }}>{bone.label}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
