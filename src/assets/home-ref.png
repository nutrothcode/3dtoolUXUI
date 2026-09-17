Work ONLY inside this project:

https://github.com/nutrothcode/3dtoolUXUI

DO NOT create another separate UI.
DO NOT redesign from zero.
DO NOT add random new pages.
DO NOT keep old inconsistent styling.

Your task is to inspect the entire existing project first, then refactor and upgrade ALL UI into one coherent professional desktop 3D application interface.

MAIN GOAL:

Make the whole application look and behave like a serious professional 3D production tool.

Think in the direction of:
- Blender
- Unreal Editor
- Substance 3D
- professional DCC applications

But keep this project's own dark + pink visual identity.

==================================================
1. INSPECT FIRST
==================================================

Before editing:

- inspect the full project tree
- inspect all routes
- inspect all pages
- inspect all reusable components
- inspect all layout components
- inspect all styles
- inspect all theme files
- inspect all asset cards
- inspect all material cards
- inspect Home
- inspect Asset Library
- inspect Material Library
- inspect Character pages
- inspect Environment
- inspect Props
- inspect Animation
- inspect Export
- inspect Settings
- inspect Project pages
- inspect all modals and side panels

Find:

- duplicate UI
- inconsistent components
- repeated CSS
- hardcoded sizes
- inconsistent spacing
- inconsistent colors
- inconsistent buttons
- fake data
- placeholder cards
- nonfunctional controls
- poor responsive behavior
- overflow problems
- empty space
- inconsistent sidebar layouts
- pages that look like separate applications

Do not only inspect README.

==================================================
2. ONE GLOBAL APP SHELL
==================================================

The entire app must use ONE shared professional shell.

Required structure:

TOP BAR
- app logo
- current project
- global search
- save
- undo
- redo
- settings
- window controls

LEFT SIDEBAR
- Home
- Asset Library
- Material Library
- Character
- Environment
- Props
- Animation
- Render
- Export
- Projects
- Settings

CENTER WORKSPACE
- page content
- large editor / viewport area where appropriate

RIGHT SIDEBAR
- Inspector
- Scene
- Hierarchy
- Properties

BOTTOM STATUS BAR
- app state
- project state
- autosave
- polygon count
- selection status
- render/device status when available

Use the same shell everywhere.

==================================================
3. DESIGN SYSTEM
==================================================

Create ONE central design system.

Do not scatter random colors through components.

Use centralized theme tokens such as:

--bg-app
--bg-panel
--bg-panel-2
--bg-input
--bg-hover
--border
--border-active
--text-primary
--text-secondary
--text-muted
--accent
--accent-hover
--danger
--success
--warning

Visual direction:

- dark neutral desktop UI
- charcoal / near-black background
- pink/magenta primary accent
- subtle borders
- subtle shadows
- compact controls
- consistent panel radius
- professional spacing
- clean typography
- no giant mobile-style cards
- no childish emoji buttons
- no random rainbow colors
- no huge empty dashboard gaps

==================================================
4. HOME PAGE
==================================================

Redesign Home to look professional and useful.

Keep:

- New Project
- Open Project
- Import Asset
- Browse Library
- Recent Projects
- Recent Activity
- Templates
- quick access tools

But fix:

- giant empty spaces
- oversized cards
- fake statistics
- inconsistent alignment
- emoji-looking icons
- weak hierarchy
- too much dashboard-style decoration

If numbers are fake, remove them or mark them clearly as demo data.

==================================================
5. ASSET LIBRARY
==================================================

Upgrade Asset Library into a real professional asset browser.

Required:

LEFT PANEL:
- Collections
- All
- Recent
- Favorites
- Categories

TOP TOOLBAR:
- Search
- Filter
- Sort
- Grid/List
- Thumbnail size
- Import Asset
- Refresh

CENTER:
- real asset cards
- thumbnail
- asset name
- category
- tags
- favorite
- selected state
- hover actions

RIGHT INSPECTOR:
- preview
- name
- category
- tags
- metadata
- file information
- Use Asset
- Open Preview
- Favorite
- Edit Metadata
- Reveal Files
- Duplicate
- Rename
- Delete

Also support:

- drag asset into editor
- double click to use
- right click context menu
- keyboard navigation

Do not leave a giant blank central area when library is empty.

Create a polished empty state.

==================================================
6. MATERIAL LIBRARY
==================================================

Make Material Library visually consistent with Asset Library.

Required:

- same search style
- same filter style
- same card style
- same sidebar style
- same inspector style
- same spacing
- same toolbar height

Material cards should show:

- sphere preview
- material name
- category
- type
- favorite

Inspector should support:

- live preview
- Base Color
- Metallic
- Roughness
- Normal
- AO
- Opacity
- Emission
- texture slots
- tags
- category
- Apply Material
- Save
- Duplicate
- Rename
- Delete

Do not make Material Library look like a different application.

==================================================
7. CHARACTER WORKSPACE
==================================================

Character editing pages should be real editor workspaces, not dashboards.

Use structure like:

LEFT:
- parts / assets / hierarchy

CENTER:
- large 3D viewport

RIGHT:
- inspector / properties

BOTTOM:
- contextual tools / timeline / workflow

Main character modes can include:

- Parts
- Assemble
- Face
- Body
- Full Body
- UV
- Retopology
- Materials
- Rig
- Animation
- Export

Do not reload or visually reset the whole application when changing mode.

==================================================
8. EDITOR LAYOUT
==================================================

For editing tools, prioritize the viewport.

Use approximately:

LEFT PANEL: 260–320px
CENTER VIEWPORT: flexible / largest area
RIGHT PANEL: 300–360px
BOTTOM PANEL: collapsible

Panels should be:

- resizable
- collapsible
- hideable
- consistent

Avoid oversized headers inside editing screens.

==================================================
9. INTERACTION
==================================================

Add professional desktop interaction patterns.

Mouse:

- left click select
- shift select
- drag select
- middle mouse orbit
- shift + middle mouse pan
- mouse wheel zoom
- drag transform gizmo

Keyboard:

- G = move
- R = rotate
- S = scale
- F = focus selected
- Delete = delete
- Ctrl+Z = undo
- Ctrl+Shift+Z = redo
- Ctrl+S = save
- Ctrl+D = duplicate
- F2 = rename
- H = hide
- Alt+H = unhide

Do not make everything button-only.

==================================================
10. SHARED COMPONENTS
==================================================

Refactor repeated UI into reusable components.

Examples:

AppShell
TopBar
Sidebar
Panel
Toolbar
Inspector
Hierarchy
AssetBrowser
MaterialBrowser
AssetCard
MaterialCard
SearchBar
FilterBar
SortControl
SegmentedControl
IconButton
PrimaryButton
NumericField
TransformPanel
Section
EmptyState
ContextMenu
Modal
Toast
StatusBar
ViewportToolbar

Do not duplicate components page by page.

==================================================
11. ICON SYSTEM
==================================================

Replace emoji-style icons with one consistent professional icon set.

Use:

- same stroke weight
- same size rules
- same hover behavior
- same active state

Do not mix emojis, text symbols, and unrelated icon styles.

==================================================
12. SPACING SYSTEM
==================================================

Create consistent spacing tokens.

Example:

4px
8px
12px
16px
20px
24px
32px

Use them globally.

Do not manually use random padding values in every component.

==================================================
13. TYPOGRAPHY
==================================================

Create clear hierarchy:

App title
Page title
Section title
Card title
Body text
Muted metadata
Small labels

Keep desktop UI compact.

Do not use oversized website typography.

==================================================
14. FIX RESPONSIVE BEHAVIOR
==================================================

Test common desktop sizes:

1920×1080
1600×900
1440×900
1366×768

Fix:

- clipping
- panel overflow
- hidden controls
- broken sidebars
- overlapping buttons
- horizontal scrolling
- text overflow
- broken card grids

Editing tools should still be usable at 1366×768.

==================================================
15. REMOVE FAKE / DEMO LOOK
==================================================

Audit and remove or replace:

- fake project counts
- fake asset counts
- fake export counts
- fake recent activity
- fake progress
- fake performance status
- placeholder hero data
- fake thumbnails

If real data is not available, use clean empty states instead.

==================================================
16. PROJECT PAGE
==================================================

Create a clean professional project browser.

Support:

- New Project
- Open
- Rename
- Duplicate
- Delete
- Recent
- Favorites
- Last Modified
- project thumbnail
- search
- sort

Do not make it look like a generic website dashboard.

==================================================
17. CONSISTENCY RULE
==================================================

Every page must feel like the SAME application.

These must match globally:

- toolbar height
- sidebar width
- button size
- button radius
- card radius
- border color
- accent color
- text hierarchy
- icon size
- hover states
- selected states
- scrollbar style
- empty states
- modal style
- context menus

==================================================
18. CLEAN FILE STRUCTURE
==================================================

Refactor the existing project into a cleaner structure using the framework already present.

Prefer something similar to:

src/
├── app/
│   ├── shell/
│   ├── routing/
│   └── state/
├── components/
│   ├── common/
│   ├── layout/
│   ├── editor/
│   ├── library/
│   ├── inspector/
│   └── viewport/
├── features/
│   ├── home/
│   ├── projects/
│   ├── asset-library/
│   ├── material-library/
│   ├── character/
│   ├── environment/
│   ├── props/
│   ├── animation/
│   ├── render/
│   └── export/
├── styles/
│   ├── tokens
│   ├── theme
│   └── globals
└── types/

But inspect first.

Do not create duplicate folders if equivalents already exist.

==================================================
19. IMPORTANT: REPLACE OLD UI
==================================================

This is critical.

Do NOT only add new code.

Do NOT leave the old inconsistent UI underneath.

When a component is redesigned:

- replace the old implementation
- remove duplicate styles
- remove obsolete components
- update all pages to use the new shared component

The goal is not “more code”.

The goal is a cleaner professional system.

==================================================
20. VALIDATION
==================================================

After changes:

- run install if needed
- run build
- run type check
- run lint
- fix all errors
- launch the app
- inspect every route
- resize window
- test scrolling
- test navigation
- test empty states
- test selection states
- test modal layouts

==================================================
21. REPORT
==================================================

At the end, report:

1. files inspected
2. files changed
3. files added
4. files deleted
5. duplicated UI removed
6. shared components created
7. pages fully redesigned
8. remaining placeholder features
9. build result
10. lint/type-check result
11. remaining known UI issues

Do NOT claim “finished” if some pages are still mock or inconsistent.

MAIN REQUIREMENT:

Make the ENTIRE existing 3dtoolUXUI project look like one polished, professional desktop 3D application.

Do not make one beautiful page and leave the rest old.

Fix the whole UI system.