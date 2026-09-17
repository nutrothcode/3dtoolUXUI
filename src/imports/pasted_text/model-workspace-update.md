TASK: Change Step 1 from "Parts" to a universal "Model" workspace.

IMPORTANT:
Inspect the existing code first.

Do NOT only rename the text "Parts" to "Model".
The current Parts system is too character-specific.

I want Step 1 to become the universal starting point for ANY 3D model/project.

==================================================
TOP WORKFLOW
==================================================

CHANGE:

1 Parts

TO:

1 Model

Keep the rest of the workflow for now.

==================================================
MODEL WORKSPACE
==================================================

At the top of the left panel, add:

Model Type: [ Character ▼ ]

This must be a real dropdown/select control.

The user can choose what kind of model/project they are creating.

Initial types:

Character
Drink
Food
Vehicle
Building
Furniture
Weapon
Tool
Plant
Animal
Environment
Prop
Other / Custom

IMPORTANT:
Do NOT hard-code the application around Character.

"Character" is only ONE model type.

==================================================
EXAMPLE
==================================================

If selected:

Model Type: Character

show useful categories such as:

All
Body
Head
Hair
Eye
Mouth
Hand
Foot
Clothing
Accessory


If selected:

Model Type: Drink

show:

All
Cup
Bottle
Can
Liquid
Ice
Lid
Straw
Decoration


If selected:

Model Type: Vehicle

show:

All
Body
Wheel
Tire
Glass
Interior
Light
Engine
Accessory


If selected:

Model Type: Building

show:

All
Structure
Wall
Floor
Roof
Door
Window
Stairs
Decoration


If selected:

Model Type: Custom

allow the user to create their own categories.

==================================================
ASSET LIBRARY
==================================================

Rename:

Part Library

to:

Model Library

The panel should become:

Asset Library

[ Model Type: Character ▼ ]

Model Library | My Assets | Project

Search models...

[ All ] [ Body ] [ Head ] [ Hair ] ...

The library content must react to the selected Model Type.

Do NOT show Body/Head/Hand/Foot when the project is Drink or Vehicle.

==================================================
PROJECT DATA
==================================================

Each project should store something like:

Project
- Name
- Model Type
- Custom Type if needed
- Scene
- Models
- Materials
- Textures
- UV
- Retopology
- Rig if applicable
- Animations if applicable

Example:

Project Name: MyCharacter
Model Type: Character

or

Project Name: Coffee_01
Model Type: Drink

or

Project Name: SportsCar_01
Model Type: Vehicle

or

Project Name: KhmerHouse_01
Model Type: Building

==================================================
VERY IMPORTANT — OPTIONAL WORKFLOWS
==================================================

Do NOT assume every model needs:

Body Rig
Face Rig
Animation
Clothing

These are character-specific capabilities.

The application must understand the selected model type.

For example:

CHARACTER
Model
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


DRINK
Model
→ Assemble
→ Retopology
→ UV
→ Material
→ Texture
→ Export


BUILDING
Model
→ Assemble
→ Retopology
→ UV
→ Material
→ Texture
→ Export


VEHICLE
Model
→ Assemble
→ Retopology
→ UV
→ Material
→ Texture
→ Rig/Animate only when needed
→ Export

Do not destroy existing functionality.
Make character-only tools conditional rather than forcing them onto every project.

==================================================
CUSTOM MODEL TYPE
==================================================

I also want:

Model Type: Custom

When Custom is selected:

Custom Model Type:
[________________]

Example:

Robot
Boat
Tree
Machine
Furniture Set
Game Prop

Allow custom categories to be created.

This means I am NOT limited to a fixed list forever.

==================================================
ARCHITECTURE
==================================================

This must be data-driven.

Do NOT write a completely separate UI for every Model Type.

Use ONE shared Model workspace.

For example conceptually:

ModelType
    id
    name
    icon
    categories
    availableTools

The UI reads this configuration.

Example:

Character
categories:
Body, Head, Hand, Foot, Clothing

Drink
categories:
Cup, Liquid, Ice, Lid, Straw

Vehicle
categories:
Body, Wheel, Glass, Interior

The same Asset Library component renders the correct categories.

==================================================
SHARED SYSTEM
==================================================

All model types must continue using the SAME:

3D Viewport
Hierarchy
Project Manager
Model Inspector
Transform system
Asset Library
Selection system
Retopology
UV
Material
Texture
Export

Do NOT duplicate these systems per model type.

Character-specific tools such as:

Clothing
Body Rig
Face Rig

can appear only when relevant.

==================================================
UI
==================================================

I want the model selector similar to a professional desktop editor:

Model Type   [ Character             ▼ ]

or:

Model Type   [ Drink                 ▼ ]

or:

Model Type   [ Vehicle               ▼ ]

Keep the existing dark UI and pink selected accent.

Do not make the dropdown oversized.

==================================================
MIGRATION
==================================================

Existing Character/Parts functionality must not be lost.

Migrate the current Parts data/categories into:

Model Type = Character

Current:
Parts
Body
Head
Hand
Foot
Clothing

becomes:

Model
Model Type = Character

Categories:
All
Body
Head
Hand
Foot
Clothing

Remove obsolete character-only assumptions from the shared Model workspace.

==================================================
FINAL CHECK
==================================================

Test at least these project types:

1. Character
2. Drink
3. Vehicle
4. Building
5. Custom

Verify changing Model Type actually changes the relevant categories/tools.

Do not claim completion if only the label changed.

Report:
- files changed
- old Parts code refactored
- new Model Type system
- how categories are configured
- how Custom works
- how workflows change by model type
- build/typecheck/test results
- remaining unfinished functionality