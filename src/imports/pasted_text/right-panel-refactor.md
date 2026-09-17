TASK: Refactor the RIGHT INSPECTOR PANEL into a professional 3-tab workspace.

IMPORTANT:
Inspect the existing project/code first.

Do NOT simply add another UI on top of the existing UI.
Do NOT create duplicate inspector systems.
Do NOT make fake/static UI.
Refactor and reuse the current right panel.
Preserve existing working 3D viewport, import, selection, transforms, materials,
rigging, UV, retopology, project state, and asset systems.

==================================================
RIGHT PANEL TABS
==================================================

Replace the current tabs:

Model | Material | Animation

with:

Model | Project Manager | Hierarchy

The same right-side panel must switch between these 3 views.

==================================================
TAB 1 — MODEL
==================================================

Keep Model as the object inspector.

When I select an object from:
- Viewport
- Asset Library
- Hierarchy

Model must automatically inspect that selected object.

MODEL TAB:

[Selected Object]
Thumbnail
Object Name
Object Type
Change

▼ Transform
Position   X [0.000] Y [0.000] Z [0.000]
Rotation   X [0.000] Y [0.000] Z [0.000]
Scale      X [1.000] Y [1.000] Z [1.000]

▼ Model Info
Vertices
Triangles
Mesh Type
Skinned Mesh
Rigged
Materials
Textures
File Size
Source Path

▼ Skin Weights
Auto Normalize
Clean Weights

▼ Materials
Material Slots
Assign Material
Edit Material

▼ Rig
Rig information
Skeleton information

▼ Retopology
Open Retopology

▼ UV
Open UV Editor

Transform fields MUST be editable.

Editing Position/Rotation/Scale here must update the real object
in the 3D viewport immediately.

Selecting another object must update this inspector immediately.

==================================================
TAB 2 — PROJECT MANAGER
==================================================

This tab manages the CURRENT PROJECT.

Do not make it another Asset Library.

PROJECT

Project Name
Project Path
Created
Last Modified

Actions:
New Project
Open Project
Save
Save As
Import
Export

--------------------------------------------------
SCENE / ASSET SUMMARY
--------------------------------------------------

Show project contents:

Character
Meshes
Parts
Clothing
Materials
Textures
Skeleton
Animations

Example:

Project: Character_Male_01

Character
  BaseBody

Parts
  Head
  Hand_L
  Hand_R
  Foot_L
  Foot_R

Clothing
  Shirt_01
  Pants_01
  Shoes_01

Materials
  Skin
  Eye
  Hair
  Cloth

Rig
  Character_Skeleton

Animations
  Idle
  Walk
  Run

--------------------------------------------------
PROJECT STATUS
--------------------------------------------------

Show useful status:

Parts          6
Meshes         9
Materials      4
Textures       12
Skeleton       Yes
Animations     3

Unsaved Changes ●

--------------------------------------------------
IMPORTANT
--------------------------------------------------

Project Manager must use the REAL current project state.

When something is added or removed from the project,
Project Manager must update automatically.

Saving the project must preserve the scene/hierarchy and references.

==================================================
TAB 3 — HIERARCHY
==================================================

Build a REAL Blender-style scene hierarchy/outliner.

This is NOT a simple file list.

Example:

▼ Character_Male_01
    ▼ Body
        ◇ BaseBody
        ◇ Hand_L
        ◇ Hand_R
        ◇ Foot_L
        ◇ Foot_R

    ▼ Head
        ◇ Head_Mesh

        ▼ Eyes
            ◇ Eye_L
            ◇ Eye_R

        ▼ Mouth
            ◇ Teeth_Upper
            ◇ Teeth_Lower
            ◇ Tongue

        ◇ Hair

    ▼ Clothing
        ◇ Shirt
        ◇ Pants
        ◇ Shoes

    ▼ Skeleton
        🦴 Root
           ▼ Hips
              ▼ Spine
                 ▼ Chest
                    ▼ Neck
                       🦴 Head
              🦴 Arm_L
              🦴 Arm_R
              🦴 Leg_L
              🦴 Leg_R

==================================================
HIERARCHY ROW DESIGN
==================================================

Each row should support:

> Expand/Collapse
Object type icon
Object name
Visibility icon
Lock icon

Example:

▼ 👤 Character_Male_01       👁 🔒
  ▼ ◇ Body                   👁 🔒
      ◇ BaseBody             👁 🔒
      ◇ Hand_L               👁 🔒
      ◇ Hand_R               👁 🔒

Use indentation to clearly show parent/child relationships.

Use professional small icons rather than emoji in the actual UI.

==================================================
HIERARCHY FUNCTIONALITY
==================================================

Implement real functionality:

1. Click object
   → select real scene object.

2. Viewport selection
   → highlight the same object in Hierarchy.

3. Selection
   → automatically update Model tab Inspector.

4. Double-click object name
   → rename.

5. F2
   → rename selected object.

6. Delete
   → delete selected object.

7. Ctrl+D
   → duplicate.

8. Ctrl/Shift
   → multi-selection.

9. Eye button
   → Show/Hide object in viewport.

10. Lock button
    → prevent object editing/selection as appropriate.

11. Expand/Collapse parent nodes.

12. Drag & Drop
    → reorder objects.

13. Drag object onto another object/group
    → change parent.

14. Unparent object.

15. Right-click context menu:

Rename
Duplicate
Delete
Hide
Show
Lock
Unlock
Create Group
Parent
Unparent
Focus Selected
Save to Library

16. Search field at top.

17. Filter by:
All
Mesh
Part
Clothing
Skeleton
Bone
Light
Camera

18. F
    → focus selected object in viewport.

19. Ctrl+Z
    → undo hierarchy operation.

20. Ctrl+Y
    → redo.

==================================================
CRITICAL — ONE SHARED SCENE
==================================================

DO NOT create separate hierarchy data for every workflow.

All workflows must operate on ONE shared scene/project:

Parts
→ Assemble
→ Clothing
→ Retopology
→ UV
→ Material
→ Texture
→ Body Rig
→ Face Rig
→ Animate
→ Export

Example:

If I add Head in Parts:

Hierarchy immediately gets:

Character
└── Head

If I add Shirt in Clothing:

Character
├── Head
└── Clothing
    └── Shirt

If I create a skeleton in Body Rig:

Character
├── Head
├── Clothing
│   └── Shirt
└── Skeleton
    └── Root
        └── Hips
            └── Spine

Switching workflow MUST NOT reset this tree.

==================================================
SELECTION SYSTEM
==================================================

There must be ONE shared selection state.

Hierarchy selection
        ↕
3D Viewport selection
        ↕
Model Inspector
        ↕
Transform Gizmo

All four must stay synchronized.

Do not create four independent selection systems.

==================================================
LAYOUT
==================================================

Keep the current professional dark theme.

Right panel:

┌───────────────────────────────────────┐
│ Model | Project Manager | Hierarchy   │
├───────────────────────────────────────┤
│                                       │
│       ACTIVE TAB CONTENT              │
│                                       │
└───────────────────────────────────────┘

Selected tab:
Pink underline/accent.

Inactive tabs:
Muted text.

Keep spacing compact like Blender/Unreal professional editors.

The Hierarchy must remain usable with hundreds or thousands of objects.
Use scrolling and preferably tree virtualization if the current UI
framework supports it.

==================================================
ARCHITECTURE
==================================================

Do not put the entire implementation into one giant component/file.

Create/reuse clean shared systems such as:

RightPanel
├── ModelInspector
├── ProjectManager
└── Hierarchy
    ├── HierarchyToolbar
    ├── HierarchyTree
    ├── HierarchyNode
    └── HierarchyContextMenu

Shared state/services:

SceneStore
SelectionStore
ProjectStore
CommandHistory / UndoRedo

The exact filenames should follow the existing project architecture.
Inspect the repository before deciding paths.

DO NOT create duplicate SceneStore/ProjectStore systems if equivalent
systems already exist.

==================================================
FINAL REQUIREMENTS
==================================================

Do not only change HTML/CSS.

The functionality must be connected to the real application.

Refactor old code where necessary instead of continuously adding
parallel systems.

Remove obsolete UI/code after the replacement is working.

Do not break existing working features.

Run the project's available build/typecheck/tests.

Fix errors caused by this work.

At completion report:

1. Existing architecture inspected
2. Files modified
3. Files created
4. Files removed/refactored
5. How Model tab works
6. How Project Manager works
7. How Hierarchy works
8. How selection synchronization works
9. How parent/child drag-and-drop works
10. How project persistence works
11. Build/test results
12. Anything that is still genuinely unfinished

Do not claim a feature is complete unless it is actually connected
and working.