import { useState } from 'react'
import TopBar from './components/TopBar'
import LeftSidebar from './components/LeftSidebar'
import StepBar from './components/StepBar'
import HomePage from './pages/HomePage'
import AssetLibraryPage from './pages/AssetLibraryPage'
import MaterialLibraryPage from './pages/MaterialLibraryPage'
import StubPage from './pages/StubPage'
import Step01Model from './steps/Step01Model'
import Step02 from './steps/Step02Assemble'
import Step03 from './steps/Step03BodyRig'
import Step04 from './steps/Step04FaceRig'
import Step06 from './steps/Step06Clothing'
import StepMaterial from './steps/StepMaterial'
import Step07 from './steps/Step07Retopology'
import Step08 from './steps/Step08UV'
import Step09 from './steps/Step09Texture'
import Step10 from './steps/Step10Animate'
import Step11 from './steps/Step11Export'
import { getModelType, type ModelTypeId, type StepId } from './modelTypes'

// Maps step id → component (components that don't need model type props)
const STEP_COMPONENT_MAP: Partial<Record<StepId, React.ComponentType>> = {
  assemble: Step02,
  bodyrig: Step03,
  facerig: Step04,
  clothing: Step06,
  retopology: Step07,
  uv: Step08,
  material: StepMaterial,
  texture: Step09,
  animate: Step10,
  export: Step11,
}

export default function App() {
  const [nav, setNav] = useState('home')
  const [stepIndex, setStepIndex] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [modelTypeId, setModelTypeId] = useState<ModelTypeId>('character')

  const modelType = getModelType(modelTypeId)
  const steps = modelType.steps

  const handleNav = (id: string) => setNav(id)
  const handleStartPipeline = (s?: number) => {
    setNav('character')
    if (s !== undefined) setStepIndex(s)
  }

  const currentStepId = steps[stepIndex] ?? 'model'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#0d0a14' }}>
      <TopBar navTo={handleNav} />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <LeftSidebar active={nav} setActive={handleNav} collapsed={!sidebarOpen} onToggle={() => setSidebarOpen(o => !o)} />

        {/* Content area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          {nav === 'character' && (
            <StepBar steps={steps} stepIndex={stepIndex} setStepIndex={setStepIndex} />
          )}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {nav === 'home' && <HomePage onStartPipeline={handleStartPipeline} />}
            {nav === 'library' && <AssetLibraryPage />}
            {nav === 'material' && <MaterialLibraryPage />}
            {nav === 'character' && currentStepId === 'model' && (
              <Step01Model modelTypeId={modelTypeId} onModelTypeChange={id => { setModelTypeId(id); setStepIndex(0) }} />
            )}
            {nav === 'character' && currentStepId !== 'model' && (() => {
              const StepView = STEP_COMPONENT_MAP[currentStepId]
              return StepView ? <StepView /> : null
            })()}
            {nav === 'environment' && <StubPage id="environment" icon="Environment" title="Environment Builder" desc="Create and manage scene environments, HDRI lighting, skyboxes, and world settings." actions={[{ label: 'New Environment', primary: true }, { label: 'Import HDRI' }]} />}
            {nav === 'props' && <StubPage id="props" icon="Props" title="Props Workshop" desc="Place, arrange, and configure scene props, furniture, vehicles, and decorative objects." actions={[{ label: 'Browse Props', primary: true }, { label: 'Import Asset' }]} />}
            {nav === 'animation' && <StubPage id="animation" icon="Animation" title="Animation Studio" desc="Build character animations, NLA clips, blend trees, and motion capture retargeting." actions={[{ label: 'New Animation', primary: true }, { label: 'Import BVH' }]} />}
            {nav === 'render' && <StubPage id="render" icon="Render" title="Render Engine" desc="Configure render passes, lighting, global illumination, and post-processing effects." actions={[{ label: 'Start Render', primary: true }, { label: 'Render Settings' }]} />}
            {nav === 'export' && <StubPage id="export" icon="Export" title="Export Manager" desc="Export to FBX, GLTF, OBJ, USD, or Unreal/Unity packages with LOD and atlas baking." actions={[{ label: 'Export Project', primary: true }, { label: 'Batch Export' }]} />}
            {nav === 'projects' && <StubPage id="projects" icon="Folder" title="My Projects" desc="View and manage all your 3D projects, organize by tags, or create new ones." actions={[{ label: 'New Project', primary: true }]} />}
            {nav === 'recent' && <StubPage id="recent" icon="Clock" title="Recent Files" desc="Quick access to recently opened files, assets, and projects." actions={[]} />}
            {nav === 'favorites' && <StubPage id="favorites" icon="Star" title="Favorites" desc="Your bookmarked assets, materials, and projects for quick access." actions={[]} />}
            {nav === 'cloud' && <StubPage id="cloud" icon="Cloud" title="Cloud Storage" desc="Sync your projects to the cloud, share with your team, and manage backups." actions={[{ label: 'Connect Account', primary: true }]} />}
            {nav === 'tutorials' && <StubPage id="tutorials" icon="Play" title="Tutorials" desc="Learn Run3dtool through guided video tutorials and interactive walkthroughs." actions={[{ label: 'Browse Tutorials', primary: true }]} />}
            {nav === 'docs' && <StubPage id="docs" icon="FileText" title="Documentation" desc="Full reference documentation, API guides, and best-practice workflows." actions={[{ label: 'Open Docs', primary: true }]} />}
            {nav === 'community' && <StubPage id="community" icon="Users" title="Community" desc="Connect with other Run3dtool users, share work, and get feedback." actions={[{ label: 'Open Community', primary: true }]} />}
            {!['home', 'library', 'material', 'character', 'environment', 'props', 'animation', 'render', 'export', 'projects', 'recent', 'favorites', 'cloud', 'tutorials', 'docs', 'community'].includes(nav) && (
              <StubPage id={nav} icon="Folder" title={nav.charAt(0).toUpperCase() + nav.slice(1)} desc="This section is under development." actions={[]} />
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
          <span>Model: <span style={{ color: '#5a5a70' }}>{modelType.icon} {modelType.name}</span></span>
          <span>GPU: <span style={{ color: '#5a5a70' }}>NVIDIA RTX 4070</span></span>
          <span>VRAM: <span style={{ color: '#5a5a70' }}>3.2 / 12 GB</span></span>
          <span>Project: <span style={{ color: '#5a5a70' }}>MyProject</span></span>
          <span>Auto Save: <span style={{ color: '#27c96a' }}>ON</span></span>
        </div>
      </div>
    </div>
  )
}
