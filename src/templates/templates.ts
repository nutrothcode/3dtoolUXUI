import type { SceneNode, SceneNodeType } from '../core/SceneStore'
import type { ModelTypeId, StepId } from '../modelTypes'

export type TemplateId = ModelTypeId

/* ── Template types ── */
export type AssemblySlot = { id: string; label: string; required: boolean; accepts: string[] }

export type TemplateTools = {
  assemble: boolean
  retopology: boolean
  uv: boolean
  material: boolean
  texture: boolean
  clothing: boolean
  bodyRig: boolean
  faceRig: boolean
  animation: boolean
  export: boolean
}

export type BaseTemplate = {
  id: ModelTypeId
  name: string
  icon: string
  categories: string[]
  tools: TemplateTools
  steps: StepId[]
  defaultHierarchy: SceneNode[]
  assemblySlots: AssemblySlot[]
}

/* ── Helpers ── */
let _nid = 0
function nid() { return `n_${++_nid}` }

function node(
  id: string, label: string, type: SceneNodeType,
  parentId: string | null, open = true,
): SceneNode {
  return { id, label, type, parentId, open, visible: true, locked: false }
}

/* ── Base tool defaults ── */
const BASE_TOOLS: TemplateTools = {
  assemble: true,
  retopology: true,
  uv: true,
  material: true,
  texture: true,
  clothing: false,
  bodyRig: false,
  faceRig: false,
  animation: false,
  export: true,
}

/* ── Step sets ── */
const BASE_STEPS: StepId[] = ['model', 'assemble', 'retopology', 'uv', 'material', 'texture', 'export']
const RIG_STEPS: StepId[] = ['model', 'assemble', 'clothing', 'retopology', 'uv', 'material', 'texture', 'bodyrig', 'facerig', 'animate', 'export']
const ANIM_STEPS: StepId[] = ['model', 'assemble', 'retopology', 'uv', 'material', 'texture', 'animate', 'export']

/* ══ DEFAULT HIERARCHIES ══ */

function characterHierarchy(): SceneNode[] {
  const root = 'chr_root'
  const meshGrp = 'chr_meshes'
  const skelGrp = 'chr_skeleton'
  const clothGrp = 'chr_clothing'
  const accGrp = 'chr_accessories'
  const boneRoot = 'chr_b_root'
  const pelvis = 'chr_b_pelvis'
  const spine1 = 'chr_b_spine1'
  const spine3 = 'chr_b_spine3'
  const chest = 'chr_b_chest'
  const neck = 'chr_b_neck'
  const headBone = 'chr_b_head'
  const clavL = 'chr_b_clav_l'
  const uarmL = 'chr_b_uarm_l'
  const larmL = 'chr_b_larm_l'
  const handL = 'chr_b_hand_l'
  const clavR = 'chr_b_clav_r'
  const uarmR = 'chr_b_uarm_r'
  const larmR = 'chr_b_larm_r'
  const handR = 'chr_b_hand_r'
  const thighL = 'chr_b_thigh_l'
  const calfL = 'chr_b_calf_l'
  const footL = 'chr_b_foot_l'
  const thighR = 'chr_b_thigh_r'
  const calfR = 'chr_b_calf_r'
  const footR = 'chr_b_foot_r'

  return [
    node(root, 'Character', 'group', null),
    node(meshGrp, 'Meshes', 'group', root),
    node('chr_body', 'Body', 'mesh', meshGrp),
    node('chr_head', 'Head', 'mesh', meshGrp),
    node('chr_hair', 'Hair', 'mesh', meshGrp),
    node('chr_eyes', 'Eyes', 'mesh', meshGrp),
    node('chr_teeth', 'Teeth', 'mesh', meshGrp),
    node('chr_hand_l_m', 'Hand_L', 'mesh', meshGrp),
    node('chr_hand_r_m', 'Hand_R', 'mesh', meshGrp),
    node('chr_foot_l_m', 'Foot_L', 'mesh', meshGrp),
    node('chr_foot_r_m', 'Foot_R', 'mesh', meshGrp),
    node(skelGrp, 'Skeleton', 'group', root),
    node(boneRoot, 'root', 'bone', skelGrp),
    node(pelvis, 'pelvis', 'bone', boneRoot),
    node(spine1, 'spine_01', 'bone', pelvis),
    node('chr_b_spine2', 'spine_02', 'bone', spine1),
    node(spine3, 'spine_03', 'bone', 'chr_b_spine2'),
    node(chest, 'chest', 'bone', spine3),
    node(neck, 'neck', 'bone', chest),
    node(headBone, 'head', 'bone', neck, false),
    node(clavL, 'clavicle_l', 'bone', spine3),
    node(uarmL, 'upperarm_l', 'bone', clavL),
    node(larmL, 'lowerarm_l', 'bone', uarmL),
    node(handL, 'hand_l', 'bone', larmL, false),
    node(clavR, 'clavicle_r', 'bone', spine3),
    node(uarmR, 'upperarm_r', 'bone', clavR),
    node(larmR, 'lowerarm_r', 'bone', uarmR),
    node(handR, 'hand_r', 'bone', larmR, false),
    node(thighL, 'thigh_l', 'bone', pelvis),
    node(calfL, 'calf_l', 'bone', thighL),
    node(footL, 'foot_l', 'bone', calfL, false),
    node(thighR, 'thigh_r', 'bone', pelvis),
    node(calfR, 'calf_r', 'bone', thighR),
    node(footR, 'foot_r', 'bone', calfR, false),
    node(clothGrp, 'Clothing', 'group', root),
    node('chr_shirt', 'Shirt', 'mesh', clothGrp),
    node('chr_pants', 'Pants', 'mesh', clothGrp),
    node(accGrp, 'Accessories', 'group', root, false),
  ]
}

function drinkHierarchy(): SceneNode[] {
  const root = 'drk_root'
  return [
    node(root, 'Drink', 'group', null),
    node('drk_container', 'Container', 'mesh', root),
    node('drk_liquid', 'Liquid', 'mesh', root),
    node('drk_ice_grp', 'Ice', 'group', root),
    node('drk_ice_01', 'Ice_01', 'mesh', 'drk_ice_grp', false),
    node('drk_ice_02', 'Ice_02', 'mesh', 'drk_ice_grp', false),
    node('drk_lid', 'Lid', 'mesh', root),
    node('drk_straw', 'Straw', 'mesh', root),
    node('drk_decoration', 'Decoration', 'group', root, false),
    node('drk_light_01', 'KeyLight', 'light', root, false),
    node('drk_cam_01', 'Camera_01', 'camera', root, false),
  ]
}

function vehicleHierarchy(): SceneNode[] {
  const root = 'veh_root'
  const wheels = 'veh_wheels'
  const interior = 'veh_interior'
  const lights = 'veh_lights'
  return [
    node(root, 'Vehicle', 'group', null),
    node('veh_body', 'Body', 'mesh', root),
    node('veh_glass', 'Glass', 'mesh', root),
    node(wheels, 'Wheels', 'group', root),
    node('veh_wheel_fl', 'Wheel_FL', 'mesh', wheels),
    node('veh_wheel_fr', 'Wheel_FR', 'mesh', wheels),
    node('veh_wheel_rl', 'Wheel_RL', 'mesh', wheels, false),
    node('veh_wheel_rr', 'Wheel_RR', 'mesh', wheels, false),
    node(interior, 'Interior', 'group', root),
    node('veh_seats', 'Seats', 'mesh', interior),
    node('veh_dashboard', 'Dashboard', 'mesh', interior),
    node('veh_steering', 'Steering Wheel', 'mesh', interior),
    node(lights, 'Lights', 'group', root),
    node('veh_headlight_l', 'Headlight_L', 'mesh', lights),
    node('veh_headlight_r', 'Headlight_R', 'mesh', lights),
    node('veh_taillight_l', 'Taillight_L', 'mesh', lights, false),
    node('veh_taillight_r', 'Taillight_R', 'mesh', lights, false),
    node('veh_engine', 'Engine', 'mesh', root, false),
  ]
}

function buildingHierarchy(): SceneNode[] {
  const root = 'bld_root'
  const walls = 'bld_walls'
  const floors = 'bld_floors'
  const doors = 'bld_doors'
  const windows = 'bld_windows'
  return [
    node(root, 'Building', 'group', null),
    node('bld_structure', 'Structure', 'mesh', root),
    node('bld_roof', 'Roof', 'mesh', root),
    node(floors, 'Floors', 'group', root),
    node('bld_floor_01', 'Floor_01', 'mesh', floors),
    node('bld_floor_02', 'Floor_02', 'mesh', floors, false),
    node(walls, 'Walls', 'group', root),
    node('bld_wall_n', 'Wall_N', 'mesh', walls),
    node('bld_wall_s', 'Wall_S', 'mesh', walls),
    node('bld_wall_e', 'Wall_E', 'mesh', walls),
    node('bld_wall_w', 'Wall_W', 'mesh', walls),
    node(doors, 'Doors', 'group', root),
    node('bld_door_main', 'Door_Main', 'mesh', doors),
    node(windows, 'Windows', 'group', root),
    node('bld_win_01', 'Window_01', 'mesh', windows),
    node('bld_win_02', 'Window_02', 'mesh', windows),
    node('bld_decoration', 'Decoration', 'group', root, false),
  ]
}

function genericHierarchy(rootLabel: string, rootId: string, parts: { id: string; label: string }[]): SceneNode[] {
  const root = rootId
  return [
    node(root, rootLabel, 'group', null),
    ...parts.map(p => node(p.id, p.label, 'mesh', root)),
    node(`${rootId}_lights`, 'Lights', 'group', root, false),
    node(`${rootId}_cam`, 'Camera', 'camera', root, false),
  ]
}

/* ══ TEMPLATES ══ */

const CHARACTER_TEMPLATE: BaseTemplate = {
  id: 'character',
  name: 'Character',
  icon: '🧍',
  categories: ['All', 'Body', 'Head', 'Hair', 'Eye', 'Mouth', 'Hand', 'Foot', 'Clothing', 'Accessory'],
  tools: { ...BASE_TOOLS, clothing: true, bodyRig: true, faceRig: true, animation: true },
  steps: RIG_STEPS,
  defaultHierarchy: characterHierarchy(),
  assemblySlots: [
    { id: 'body', label: 'Body', required: true, accepts: ['body'] },
    { id: 'head', label: 'Head', required: true, accepts: ['head'] },
    { id: 'hair', label: 'Hair', required: false, accepts: ['hair'] },
    { id: 'hand_l', label: 'Hand_L', required: false, accepts: ['hand'] },
    { id: 'hand_r', label: 'Hand_R', required: false, accepts: ['hand'] },
    { id: 'foot_l', label: 'Foot_L', required: false, accepts: ['foot'] },
    { id: 'foot_r', label: 'Foot_R', required: false, accepts: ['foot'] },
    { id: 'clothing', label: 'Clothing', required: false, accepts: ['clothing'] },
    { id: 'accessory', label: 'Accessory', required: false, accepts: ['accessory'] },
  ],
}

const DRINK_TEMPLATE: BaseTemplate = {
  id: 'drink',
  name: 'Drink',
  icon: '🥤',
  categories: ['All', 'Cup', 'Bottle', 'Can', 'Liquid', 'Ice', 'Lid', 'Straw', 'Decoration'],
  tools: BASE_TOOLS,
  steps: BASE_STEPS,
  defaultHierarchy: drinkHierarchy(),
  assemblySlots: [
    { id: 'container', label: 'Container', required: true, accepts: ['cup', 'bottle', 'can'] },
    { id: 'liquid', label: 'Liquid', required: false, accepts: ['liquid'] },
    { id: 'ice', label: 'Ice', required: false, accepts: ['ice'] },
    { id: 'lid', label: 'Lid', required: false, accepts: ['lid'] },
    { id: 'straw', label: 'Straw', required: false, accepts: ['straw'] },
    { id: 'decoration', label: 'Decoration', required: false, accepts: ['decoration'] },
  ],
}

const FOOD_TEMPLATE: BaseTemplate = {
  id: 'food',
  name: 'Food',
  icon: '🍎',
  categories: ['All', 'Base', 'Layer', 'Topping', 'Container', 'Garnish', 'Decoration'],
  tools: BASE_TOOLS,
  steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Food', 'food_root', [
    { id: 'food_base', label: 'Base' },
    { id: 'food_layer', label: 'Layer' },
    { id: 'food_topping', label: 'Topping' },
    { id: 'food_garnish', label: 'Garnish' },
  ]),
  assemblySlots: [
    { id: 'base', label: 'Base', required: true, accepts: ['base'] },
    { id: 'layer', label: 'Layer', required: false, accepts: ['layer'] },
    { id: 'topping', label: 'Topping', required: false, accepts: ['topping'] },
    { id: 'garnish', label: 'Garnish', required: false, accepts: ['garnish'] },
  ],
}

const VEHICLE_TEMPLATE: BaseTemplate = {
  id: 'vehicle',
  name: 'Vehicle',
  icon: '🚗',
  categories: ['All', 'Body', 'Wheel', 'Tire', 'Glass', 'Interior', 'Light', 'Engine', 'Accessory'],
  tools: { ...BASE_TOOLS, animation: true },
  steps: ANIM_STEPS,
  defaultHierarchy: vehicleHierarchy(),
  assemblySlots: [
    { id: 'body', label: 'Body', required: true, accepts: ['body'] },
    { id: 'glass', label: 'Glass', required: false, accepts: ['glass'] },
    { id: 'wheel_fl', label: 'Wheel_FL', required: false, accepts: ['wheel', 'tire'] },
    { id: 'wheel_fr', label: 'Wheel_FR', required: false, accepts: ['wheel', 'tire'] },
    { id: 'wheel_rl', label: 'Wheel_RL', required: false, accepts: ['wheel', 'tire'] },
    { id: 'wheel_rr', label: 'Wheel_RR', required: false, accepts: ['wheel', 'tire'] },
    { id: 'interior', label: 'Interior', required: false, accepts: ['interior'] },
    { id: 'engine', label: 'Engine', required: false, accepts: ['engine'] },
  ],
}

const BUILDING_TEMPLATE: BaseTemplate = {
  id: 'building',
  name: 'Building',
  icon: '🏠',
  categories: ['All', 'Structure', 'Wall', 'Floor', 'Roof', 'Door', 'Window', 'Stairs', 'Decoration'],
  tools: BASE_TOOLS,
  steps: BASE_STEPS,
  defaultHierarchy: buildingHierarchy(),
  assemblySlots: [
    { id: 'structure', label: 'Structure', required: true, accepts: ['structure'] },
    { id: 'roof', label: 'Roof', required: false, accepts: ['roof'] },
    { id: 'wall', label: 'Walls', required: false, accepts: ['wall'] },
    { id: 'floor', label: 'Floors', required: false, accepts: ['floor'] },
    { id: 'door', label: 'Door', required: false, accepts: ['door'] },
    { id: 'window', label: 'Window', required: false, accepts: ['window'] },
    { id: 'decoration', label: 'Decoration', required: false, accepts: ['decoration'] },
  ],
}

const FURNITURE_TEMPLATE: BaseTemplate = {
  id: 'furniture',
  name: 'Furniture',
  icon: '🪑',
  categories: ['All', 'Frame', 'Seat', 'Back', 'Leg', 'Cushion', 'Shelf', 'Drawer', 'Hardware'],
  tools: BASE_TOOLS,
  steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Furniture', 'fur_root', [
    { id: 'fur_frame', label: 'Frame' },
    { id: 'fur_seat', label: 'Seat' },
    { id: 'fur_back', label: 'Back' },
    { id: 'fur_legs', label: 'Legs' },
    { id: 'fur_cushion', label: 'Cushion' },
  ]),
  assemblySlots: [
    { id: 'frame', label: 'Frame', required: true, accepts: ['frame'] },
    { id: 'cushion', label: 'Cushion', required: false, accepts: ['cushion', 'seat'] },
    { id: 'hardware', label: 'Hardware', required: false, accepts: ['hardware'] },
  ],
}

const WEAPON_TEMPLATE: BaseTemplate = {
  id: 'weapon',
  name: 'Weapon',
  icon: '⚔️',
  categories: ['All', 'Blade', 'Handle', 'Guard', 'Pommel', 'Barrel', 'Stock', 'Accessory'],
  tools: BASE_TOOLS,
  steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Weapon', 'wpn_root', [
    { id: 'wpn_blade', label: 'Blade' },
    { id: 'wpn_handle', label: 'Handle' },
    { id: 'wpn_guard', label: 'Guard' },
    { id: 'wpn_pommel', label: 'Pommel' },
  ]),
  assemblySlots: [
    { id: 'blade', label: 'Blade', required: true, accepts: ['blade', 'barrel'] },
    { id: 'handle', label: 'Handle', required: true, accepts: ['handle', 'stock'] },
    { id: 'guard', label: 'Guard', required: false, accepts: ['guard'] },
    { id: 'accessory', label: 'Accessory', required: false, accepts: ['accessory'] },
  ],
}

const TOOL_TEMPLATE: BaseTemplate = {
  id: 'tool',
  name: 'Tool',
  icon: '🔧',
  categories: ['All', 'Head', 'Handle', 'Body', 'Mechanism', 'Fastener', 'Accessory'],
  tools: BASE_TOOLS,
  steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Tool', 'tool_root', [
    { id: 'tool_head', label: 'Head' },
    { id: 'tool_handle', label: 'Handle' },
    { id: 'tool_body', label: 'Body' },
  ]),
  assemblySlots: [
    { id: 'head', label: 'Head', required: true, accepts: ['head'] },
    { id: 'handle', label: 'Handle', required: true, accepts: ['handle'] },
    { id: 'mechanism', label: 'Mechanism', required: false, accepts: ['mechanism'] },
  ],
}

const PLANT_TEMPLATE: BaseTemplate = {
  id: 'plant',
  name: 'Plant',
  icon: '🌿',
  categories: ['All', 'Root', 'Trunk', 'Branch', 'Leaf', 'Flower', 'Fruit', 'Bark'],
  tools: BASE_TOOLS,
  steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Plant', 'plt_root', [
    { id: 'plt_trunk', label: 'Trunk' },
    { id: 'plt_branches', label: 'Branches' },
    { id: 'plt_leaves', label: 'Leaves' },
    { id: 'plt_flowers', label: 'Flowers' },
    { id: 'plt_roots', label: 'Roots' },
  ]),
  assemblySlots: [
    { id: 'trunk', label: 'Trunk', required: true, accepts: ['trunk'] },
    { id: 'branch', label: 'Branches', required: false, accepts: ['branch'] },
    { id: 'leaf', label: 'Leaves', required: false, accepts: ['leaf'] },
    { id: 'fruit', label: 'Fruit', required: false, accepts: ['fruit', 'flower'] },
  ],
}

const ANIMAL_TEMPLATE: BaseTemplate = {
  id: 'animal',
  name: 'Animal',
  icon: '🐾',
  categories: ['All', 'Body', 'Head', 'Limb', 'Tail', 'Wing', 'Fur', 'Scale'],
  tools: { ...BASE_TOOLS, bodyRig: true, animation: true },
  steps: ['model', 'assemble', 'retopology', 'uv', 'material', 'texture', 'bodyrig', 'animate', 'export'],
  defaultHierarchy: genericHierarchy('Animal', 'anm_root', [
    { id: 'anm_body', label: 'Body' },
    { id: 'anm_head', label: 'Head' },
    { id: 'anm_limbs', label: 'Limbs' },
    { id: 'anm_tail', label: 'Tail' },
  ]),
  assemblySlots: [
    { id: 'body', label: 'Body', required: true, accepts: ['body'] },
    { id: 'head', label: 'Head', required: true, accepts: ['head'] },
    { id: 'limb', label: 'Limbs', required: false, accepts: ['limb'] },
    { id: 'tail', label: 'Tail', required: false, accepts: ['tail', 'wing'] },
  ],
}

const ENVIRONMENT_TEMPLATE: BaseTemplate = {
  id: 'environment',
  name: 'Environment',
  icon: '🏔️',
  categories: ['All', 'Terrain', 'Rock', 'Water', 'Vegetation', 'Sky', 'Structure', 'Prop'],
  tools: BASE_TOOLS,
  steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Environment', 'env_root', [
    { id: 'env_terrain', label: 'Terrain' },
    { id: 'env_water', label: 'Water' },
    { id: 'env_vegetation', label: 'Vegetation' },
    { id: 'env_rocks', label: 'Rocks' },
    { id: 'env_sky', label: 'Sky' },
  ]),
  assemblySlots: [
    { id: 'terrain', label: 'Terrain', required: true, accepts: ['terrain'] },
    { id: 'water', label: 'Water', required: false, accepts: ['water'] },
    { id: 'vegetation', label: 'Vegetation', required: false, accepts: ['vegetation', 'plant'] },
    { id: 'sky', label: 'Sky', required: false, accepts: ['sky'] },
  ],
}

const PROP_TEMPLATE: BaseTemplate = {
  id: 'prop',
  name: 'Prop',
  icon: '📦',
  categories: ['All', 'Body', 'Detail', 'Mechanism', 'Decoration', 'Base'],
  tools: BASE_TOOLS,
  steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Prop', 'prp_root', [
    { id: 'prp_body', label: 'Body' },
    { id: 'prp_detail', label: 'Detail' },
    { id: 'prp_base', label: 'Base' },
  ]),
  assemblySlots: [
    { id: 'body', label: 'Body', required: true, accepts: ['body'] },
    { id: 'detail', label: 'Detail', required: false, accepts: ['detail', 'decoration'] },
    { id: 'base', label: 'Base', required: false, accepts: ['base'] },
  ],
}

const CUSTOM_TEMPLATE: BaseTemplate = {
  id: 'custom',
  name: 'Other / Custom',
  icon: '✨',
  categories: ['All'],
  tools: BASE_TOOLS,
  steps: BASE_STEPS,
  defaultHierarchy: [
    node('cus_root', 'Custom Model', 'group', null),
    node('cus_main', 'Main Mesh', 'mesh', 'cus_root'),
  ],
  assemblySlots: [
    { id: 'main', label: 'Main', required: true, accepts: [] },
  ],
}

/* ══ REGISTRY ══ */

export const ALL_TEMPLATES: BaseTemplate[] = [
  CHARACTER_TEMPLATE, DRINK_TEMPLATE, FOOD_TEMPLATE, VEHICLE_TEMPLATE,
  BUILDING_TEMPLATE, FURNITURE_TEMPLATE, WEAPON_TEMPLATE, TOOL_TEMPLATE,
  PLANT_TEMPLATE, ANIMAL_TEMPLATE, ENVIRONMENT_TEMPLATE, PROP_TEMPLATE,
  CUSTOM_TEMPLATE,
]

export function getTemplate(id: TemplateId): BaseTemplate {
  return ALL_TEMPLATES.find(t => t.id === id) ?? CHARACTER_TEMPLATE
}
