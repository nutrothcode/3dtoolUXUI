ខ្ញុំបានអាន code structure ពិតក្នុង repo `nutrothcode/3dtoolUXUI` ហើយ។ បញ្ហាធំបំផុតសម្រាប់អ្វីដែលអ្នកចង់បាន **Base Template + Child Template** គឺ project ឥឡូវនេះនៅតែមាន logic ច្រើនដាក់ក្នុង page/step file ធំៗ ហើយ data មួយចំនួនជា demo/local state មិនមែន shared scene system ពិតទេ។ ឧទាហរណ៍ `Step01Model.tsx` ធំជាង 50KB ហើយមាន `MY_ASSETS`, `ProjectTab`, details UI និង state ជាច្រើននៅក្នុង file ដូចគ្នា។

`HierarchyPanel.tsx` ក៏មានបញ្ហាដូចគ្នា៖ វាមាន `INITIAL_BONES` hard-coded ជា Character skeleton ដោយផ្ទាល់ ហើយ hierarchy state របស់វារស់នៅក្នុង component នោះតែម្តង។ ដូច្នេះវាមិនទាន់ជា hierarchy ដែលអាចប្រើសម្រាប់ Drink, Vehicle, Building, Prop ឬ model type ផ្សេងៗបានទេ។

Repo មាន structure ដាច់ជា `components`, `pages`, `steps`, `modelTypes.ts` រួចហើយ ដែលជាមូលដ្ឋានល្អ ប៉ុន្តែ step files នៅតែបែកតាម workflow ច្រើន ហើយមានទាំង `Step01Model.tsx` និង `Step01Parts.tsx` នៅជាមួយគ្នា។ នេះបង្ហាញថា old/new architecture កំពុង overlap គ្នា។

សម្រាប់ tool អ្នក ខ្ញុំស្នើឲ្យ fix structure ទៅជា **Template-driven architecture** ដូចនេះ៖

```text
src/
├── app/
│   ├── App.tsx
│   ├── routes.ts
│   └── providers/
│       ├── SceneProvider.tsx
│       ├── ProjectProvider.tsx
│       ├── SelectionProvider.tsx
│       └── HistoryProvider.tsx
│
├── core/
│   ├── scene/
│   │   ├── scene.types.ts
│   │   ├── scene.store.ts
│   │   ├── scene.actions.ts
│   │   └── scene.selectors.ts
│   │
│   ├── project/
│   │   ├── project.types.ts
│   │   ├── project.store.ts
│   │   ├── project.serializer.ts
│   │   └── project.defaults.ts
│   │
│   ├── selection/
│   │   ├── selection.store.ts
│   │   └── selection.types.ts
│   │
│   └── history/
│       ├── history.store.ts
│       └── command.types.ts
│
├── templates/
│   ├── base/
│   │   ├── BaseTemplate.ts
│   │   ├── BaseTemplate.types.ts
│   │   └── baseTemplate.config.ts
│   │
│   ├── character/
│   │   ├── CharacterTemplate.ts
│   │   ├── character.categories.ts
│   │   ├── character.tools.ts
│   │   └── character.defaults.ts
│   │
│   ├── drink/
│   │   ├── DrinkTemplate.ts
│   │   ├── drink.categories.ts
│   │   ├── drink.tools.ts
│   │   └── drink.defaults.ts
│   │
│   ├── vehicle/
│   │   ├── VehicleTemplate.ts
│   │   ├── vehicle.categories.ts
│   │   └── vehicle.tools.ts
│   │
│   ├── building/
│   │   ├── BuildingTemplate.ts
│   │   ├── building.categories.ts
│   │   └── building.tools.ts
│   │
│   └── custom/
│       ├── CustomTemplate.ts
│       └── customTemplate.factory.ts
│
├── features/
│   ├── model/
│   │   ├── ModelWorkspace.tsx
│   │   ├── ModelLibrary.tsx
│   │   ├── ModelTypeSelector.tsx
│   │   └── ModelInspector.tsx
│   │
│   ├── assemble/
│   │   ├── AssembleWorkspace.tsx
│   │   ├── AssemblySlots.tsx
│   │   └── AutoFitPanel.tsx
│   │
│   ├── retopology/
│   │   └── RetopologyWorkspace.tsx
│   │
│   ├── uv/
│   │   └── UVWorkspace.tsx
│   │
│   ├── material/
│   │   └── MaterialWorkspace.tsx
│   │
│   ├── texture/
│   │   └── TextureWorkspace.tsx
│   │
│   ├── rig/
│   │   ├── BodyRigWorkspace.tsx
│   │   └── FaceRigWorkspace.tsx
│   │
│   ├── animation/
│   │   └── AnimationWorkspace.tsx
│   │
│   └── export/
│       └── ExportWorkspace.tsx
│
├── shared/
│   ├── layout/
│   │   ├── EditorShell.tsx
│   │   ├── LeftPanel.tsx
│   │   ├── CenterViewport.tsx
│   │   ├── RightPanel.tsx
│   │   └── BottomPanel.tsx
│   │
│   ├── hierarchy/
│   │   ├── HierarchyPanel.tsx
│   │   ├── HierarchyTree.tsx
│   │   ├── HierarchyNode.tsx
│   │   ├── HierarchyToolbar.tsx
│   │   └── HierarchyContextMenu.tsx
│   │
│   ├── inspector/
│   │   ├── InspectorTabs.tsx
│   │   ├── TransformSection.tsx
│   │   ├── MeshInfoSection.tsx
│   │   └── RigInfoSection.tsx
│   │
│   ├── library/
│   │   ├── AssetGrid.tsx
│   │   ├── AssetCard.tsx
│   │   ├── AssetSearch.tsx
│   │   └── CategoryFilter.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Tabs.tsx
│       ├── Select.tsx
│       ├── Input.tsx
│       ├── Section.tsx
│       └── Icon.tsx
│
└── config/
    ├── modelTypes.ts
    ├── workflow.ts
    └── editorTheme.ts
```

### Base Template គឺអ្វី?

`BaseTemplate` គួរមានតែអ្វីដែល **គ្រប់ model type ត្រូវការ**៖

```ts
type BaseTemplate = {
  id: string
  name: string

  categories: string[]

  tools: {
    assemble: boolean
    retopology: boolean
    uv: boolean
    material: boolean
    texture: boolean
    bodyRig: boolean
    faceRig: boolean
    animation: boolean
    export: boolean
  }

  defaultHierarchy: SceneNode[]

  assemblySlots?: AssemblySlot[]
}
```

ឧទាហរណ៍ base:

```ts
const baseTemplate = {
  tools: {
    assemble: true,
    retopology: true,
    uv: true,
    material: true,
    texture: true,
    bodyRig: false,
    faceRig: false,
    animation: false,
    export: true,
  }
}
```

### Child Template គឺអ្វី?

Character មិនគួរសរសេរ UI ថ្មីទាំងមូលទេ។ វាគួរ extend base:

```ts
CharacterTemplate
extends BaseTemplate

categories:
Body
Head
Hair
Eye
Mouth
Hand
Foot
Clothing
Accessory

tools:
Body Rig = true
Face Rig = true
Animation = true

assemblySlots:
Body
Head
Hair
Hand_L
Hand_R
Foot_L
Foot_R
Clothing
Accessory
```

Drink:

```ts
DrinkTemplate
extends BaseTemplate

categories:
Cup
Liquid
Ice
Lid
Straw
Decoration

tools:
Body Rig = false
Face Rig = false
Animation = false

assemblySlots:
Container
Liquid
Ice
Lid
Straw
Decoration
```

Vehicle:

```ts
VehicleTemplate
extends BaseTemplate

categories:
Body
Wheel
Tire
Glass
Interior
Light
Engine
Accessory
```

ដូចនេះ `AssembleWorkspace.tsx` មាន **តែ 1 file** ប៉ុណ្ណោះ។ វាមិនគួរមាន `CharacterAssemble`, `DrinkAssemble`, `VehicleAssemble` បី UI ដាច់គ្នាទេ។ វាអាន `template.assemblySlots` ហើយ render UI តាម config។

### បញ្ហាដែលខ្ញុំឃើញច្បាស់ពី repo

1. `Step01Model.tsx` ធំពេក ហើយមាន component/data ច្រើននៅក្នុង file តែមួយ។
2. មាន `Step01Model.tsx` និង `Step01Parts.tsx` ទាំងពីរ ដែលគួរត្រូវ merge/refactor មិនមែនរក្សាទាំងពីរ។
3. `HierarchyPanel.tsx` គិតថា hierarchy = bones/character skeleton ព្រោះ type សូម្បីតែឈ្មោះ `BoneNode` និង `INITIAL_BONES` hard-code character anatomy។
4. Hierarchy selection/state គឺ local `useState` ក្នុង component មិនមែន shared SceneStore/SelectionStore។
5. `ProjectTab` ក្នុង `Step01Model.tsx` ក៏រក្សា project entries ជា local state និងបង្កើតពី `assets.slice(0,6)` ដែលបញ្ជាក់ថាវាជា UI/demo state មិនមែន project scene data ពិត។
6. `MY_ASSETS` ក៏ជា hard-coded sample array ក្នុង file នេះផ្ទាល់។
7. Repo មាន shared components ដូច `LeftSidebar`, `StepBar`, `TopBar`, `TopNav`, `HierarchyPanel` រួចហើយ ដូច្នេះមិនគួរបង្កើត UI layer ថ្មីមួយទៀតទេ—គួរ refactor component ទាំងនេះឲ្យ share store/config។

សម្រាប់ AI coding prompt អ្នកអាចផ្តល់នេះ៖

```text
Refactor this project into a Base Template + Child Template architecture.

Do NOT add another parallel UI system.
Inspect and refactor the current code.

Current problems to fix:
- Step01Model.tsx is too large and mixes UI, demo data, project state, library data, inspector logic, and workflow logic.
- Step01Parts.tsx still exists beside Step01Model.tsx and creates duplicate old/new architecture.
- HierarchyPanel.tsx is character-specific and hard-codes INITIAL_BONES.
- Hierarchy state is local instead of shared scene state.
- ProjectTab uses local mock entries instead of real project/scene data.
- MY_ASSETS is hard-coded inside Step01Model.tsx.
- Character-specific assumptions are mixed into shared editor UI.

TARGET ARCHITECTURE:

BaseTemplate
  ├── CharacterTemplate
  ├── DrinkTemplate
  ├── VehicleTemplate
  ├── BuildingTemplate
  └── CustomTemplate

BaseTemplate defines:
- categories
- available tools
- default hierarchy
- assembly slots
- common workflow capabilities

Child templates only provide configuration/data differences.

IMPORTANT:
Do NOT duplicate complete pages for every model type.

Use ONE shared:
- ModelWorkspace
- AssembleWorkspace
- RetopologyWorkspace
- UVWorkspace
- MaterialWorkspace
- TextureWorkspace
- Hierarchy
- Inspector
- Viewport
- Project Manager
- Export system

The active Child Template controls:
- categories
- assembly slots
- which workflow steps are visible
- default scene hierarchy
- optional tools

Create shared stores:
- SceneStore
- ProjectStore
- SelectionStore
- HistoryStore

Hierarchy must read/write SceneStore.
Viewport selection must use SelectionStore.
Inspector must inspect the same selected scene object.
Project Manager must read ProjectStore.
Workflow switching must NOT reset scene data.

Refactor HierarchyPanel:
- rename BoneNode to SceneNode
- remove INITIAL_BONES hard-coded character data
- receive nodes from SceneStore
- support mesh, group, bone, light, camera, material references
- visibility
- lock
- rename
- duplicate
- delete
- parent/unparent
- drag reorder
- multi-select
- search
- right-click actions

Move hard-coded data out of Step01Model.tsx.
Split Step01Model.tsx into small reusable components.

Remove Step01Parts.tsx after migration if no longer needed.

Expected target folders:

src/core/
src/templates/
src/features/
src/shared/
src/config/

Do not change visual style unnecessarily.
Preserve the current dark/pink design.

After refactor:
1. Character must work.
2. Drink must use the same UI but different categories/slots.
3. Vehicle must use the same UI.
4. Building must use the same UI.
5. Custom template must work.
6. Switching templates must not create duplicate editor systems.

Run typecheck/build and fix errors.

At completion report:
- files moved
- files deleted
- files created
- old duplicate code removed
- SceneStore implementation
- Template system implementation
- Hierarchy migration
- Project state migration
- build result
- remaining unfinished real functionality

Do not claim completion if it is only visual or mock data.
```

សរុប៖ **Base Template = editor/workflow structure រួម**។ **Child Template = Character/Drink/Vehicle/... config ប៉ុណ្ណោះ**។ កុំឲ្យ Child Template មាន copy UI ពេញមួយទៀត។ នេះជាចំណុចដែលនឹងធ្វើឲ្យ project អ្នកស្អាត និងពេលក្រោយចង់បន្ថែម model type ថ្មី អ្នកគ្រាន់តែបន្ថែម template មួយ មិនចាំបាច់ចម្លង code 10 file ទៀត។
