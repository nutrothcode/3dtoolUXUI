import { useState } from 'react'
import TopBar from './components/TopBar'
import LeftSidebar from './components/LeftSidebar'
import StepBar from './components/StepBar'
import HomePage from './pages/HomePage'
import AssetLibraryPage from './pages/AssetLibraryPage'
import Step01 from './steps/Step01Parts'
import Step02 from './steps/Step02Assemble'
import Step03 from './steps/Step03BodyRig'
import Step04 from './steps/Step04FaceRig'
import Step05 from './steps/Step05Skin'
import Step06 from './steps/Step06Clothing'
import Step07 from './steps/Step07Retopology'
import Step08 from './steps/Step08UV'
import Step09 from './steps/Step09Texture'
import Step10 from './steps/Step10Animate'
import Step11 from './steps/Step11Export'

const STEP_COMPONENTS = [Step01, Step02, Step03, Step04, Step05, Step06, Step07, Step08, Step09, Step10, Step11]

export default function App() {
  const [nav, setNav] = useState('home')
  const [step, setStep] = useState(1)

  const StepView = STEP_COMPONENTS[step - 1]

  const handleNav = (id: string) => setNav(id)
  const handleStartPipeline = (s?: number) => {
    setNav('character')
    if (s) setStep(s)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#0d0a14' }}>
      <TopBar navTo={handleNav} />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <LeftSidebar active={nav} setActive={handleNav} />

        {/* Content area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          {nav === 'character' && <StepBar step={step} setStep={setStep} />}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {nav === 'home' && <HomePage onStartPipeline={handleStartPipeline} />}
            {nav === 'library' && <AssetLibraryPage />}
            {nav === 'character' && <StepView />}
            {!['home', 'library', 'character'].includes(nav) && (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: '#3a3850' }}>
                <div style={{ fontSize: 48 }}>🚧</div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{nav.charAt(0).toUpperCase() + nav.slice(1)}</div>
                <div style={{ fontSize: 12 }}>Coming soon</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div style={{ height: 26, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0a0814', borderTop: '1px solid #1e1b2c', padding: '0 14px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, color: '#3a3850', fontWeight: 600 }}>Run3dtool v0.1.0</span>
          <span style={{ width: 1, height: 12, background: '#2a2535' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#27c96a', display: 'inline-block' }} />
          <span style={{ fontSize: 10, color: '#4a4a60' }}>Ready</span>
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 10, color: '#3a3850' }}>
          <span>GPU: <span style={{ color: '#5a5a70' }}>NVIDIA RTX 4070</span></span>
          <span>VRAM: <span style={{ color: '#5a5a70' }}>3.2 / 12 GB</span></span>
          <span>Project: <span style={{ color: '#5a5a70' }}>MyProject</span></span>
          <span>Auto Save: <span style={{ color: '#27c96a' }}>ON</span></span>
        </div>
      </div>
    </div>
  )
}
