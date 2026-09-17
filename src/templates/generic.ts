import { genericHierarchy, node } from './helpers'
import { BASE_TOOLS, BASE_STEPS, ANIM_STEPS, type BaseTemplate } from './template.types'
import type { StepId } from '../modelTypes'

export const FOOD_TEMPLATE: BaseTemplate = {
  id: 'food', name: 'Food', icon: '🍎',
  categories: ['All', 'Base', 'Layer', 'Topping', 'Container', 'Garnish', 'Decoration'],
  tools: BASE_TOOLS, steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Food', 'food_root', [
    { id: 'food_base', label: 'Base' }, { id: 'food_layer', label: 'Layer' },
    { id: 'food_topping', label: 'Topping' }, { id: 'food_garnish', label: 'Garnish' },
  ]),
  assemblySlots: [
    { id: 'base', label: 'Base', required: true, accepts: ['base'] },
    { id: 'layer', label: 'Layer', required: false, accepts: ['layer'] },
    { id: 'topping', label: 'Topping', required: false, accepts: ['topping'] },
    { id: 'garnish', label: 'Garnish', required: false, accepts: ['garnish'] },
  ],
}

export const FURNITURE_TEMPLATE: BaseTemplate = {
  id: 'furniture', name: 'Furniture', icon: '🪑',
  categories: ['All', 'Frame', 'Seat', 'Back', 'Leg', 'Cushion', 'Shelf', 'Drawer', 'Hardware'],
  tools: BASE_TOOLS, steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Furniture', 'fur_root', [
    { id: 'fur_frame', label: 'Frame' }, { id: 'fur_seat', label: 'Seat' },
    { id: 'fur_back', label: 'Back' }, { id: 'fur_legs', label: 'Legs' },
    { id: 'fur_cushion', label: 'Cushion' },
  ]),
  assemblySlots: [
    { id: 'frame', label: 'Frame', required: true, accepts: ['frame'] },
    { id: 'cushion', label: 'Cushion', required: false, accepts: ['cushion', 'seat'] },
    { id: 'hardware', label: 'Hardware', required: false, accepts: ['hardware'] },
  ],
}

export const WEAPON_TEMPLATE: BaseTemplate = {
  id: 'weapon', name: 'Weapon', icon: '⚔️',
  categories: ['All', 'Blade', 'Handle', 'Guard', 'Pommel', 'Barrel', 'Stock', 'Accessory'],
  tools: BASE_TOOLS, steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Weapon', 'wpn_root', [
    { id: 'wpn_blade', label: 'Blade' }, { id: 'wpn_handle', label: 'Handle' },
    { id: 'wpn_guard', label: 'Guard' }, { id: 'wpn_pommel', label: 'Pommel' },
  ]),
  assemblySlots: [
    { id: 'blade', label: 'Blade', required: true, accepts: ['blade', 'barrel'] },
    { id: 'handle', label: 'Handle', required: true, accepts: ['handle', 'stock'] },
    { id: 'guard', label: 'Guard', required: false, accepts: ['guard'] },
    { id: 'accessory', label: 'Accessory', required: false, accepts: ['accessory'] },
  ],
}

export const TOOL_TEMPLATE: BaseTemplate = {
  id: 'tool', name: 'Tool', icon: '🔧',
  categories: ['All', 'Head', 'Handle', 'Body', 'Mechanism', 'Fastener', 'Accessory'],
  tools: BASE_TOOLS, steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Tool', 'tool_root', [
    { id: 'tool_head', label: 'Head' }, { id: 'tool_handle', label: 'Handle' },
    { id: 'tool_body', label: 'Body' },
  ]),
  assemblySlots: [
    { id: 'head', label: 'Head', required: true, accepts: ['head'] },
    { id: 'handle', label: 'Handle', required: true, accepts: ['handle'] },
    { id: 'mechanism', label: 'Mechanism', required: false, accepts: ['mechanism'] },
  ],
}

export const PLANT_TEMPLATE: BaseTemplate = {
  id: 'plant', name: 'Plant', icon: '🌿',
  categories: ['All', 'Root', 'Trunk', 'Branch', 'Leaf', 'Flower', 'Fruit', 'Bark'],
  tools: BASE_TOOLS, steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Plant', 'plt_root', [
    { id: 'plt_trunk', label: 'Trunk' }, { id: 'plt_branches', label: 'Branches' },
    { id: 'plt_leaves', label: 'Leaves' }, { id: 'plt_flowers', label: 'Flowers' },
    { id: 'plt_roots', label: 'Roots' },
  ]),
  assemblySlots: [
    { id: 'trunk', label: 'Trunk', required: true, accepts: ['trunk'] },
    { id: 'branch', label: 'Branches', required: false, accepts: ['branch'] },
    { id: 'leaf', label: 'Leaves', required: false, accepts: ['leaf'] },
    { id: 'fruit', label: 'Fruit', required: false, accepts: ['fruit', 'flower'] },
  ],
}

const ANIMAL_STEPS: StepId[] = ['model', 'assemble', 'retopology', 'uv', 'material', 'texture', 'bodyrig', 'animate', 'export']

export const ANIMAL_TEMPLATE: BaseTemplate = {
  id: 'animal', name: 'Animal', icon: '🐾',
  categories: ['All', 'Body', 'Head', 'Limb', 'Tail', 'Wing', 'Fur', 'Scale'],
  tools: { ...BASE_TOOLS, bodyRig: true, animation: true },
  steps: ANIMAL_STEPS,
  defaultHierarchy: genericHierarchy('Animal', 'anm_root', [
    { id: 'anm_body', label: 'Body' }, { id: 'anm_head', label: 'Head' },
    { id: 'anm_limbs', label: 'Limbs' }, { id: 'anm_tail', label: 'Tail' },
  ]),
  assemblySlots: [
    { id: 'body', label: 'Body', required: true, accepts: ['body'] },
    { id: 'head', label: 'Head', required: true, accepts: ['head'] },
    { id: 'limb', label: 'Limbs', required: false, accepts: ['limb'] },
    { id: 'tail', label: 'Tail', required: false, accepts: ['tail', 'wing'] },
  ],
}

export const ENVIRONMENT_TEMPLATE: BaseTemplate = {
  id: 'environment', name: 'Environment', icon: '🏔️',
  categories: ['All', 'Terrain', 'Rock', 'Water', 'Vegetation', 'Sky', 'Structure', 'Prop'],
  tools: BASE_TOOLS, steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Environment', 'env_root', [
    { id: 'env_terrain', label: 'Terrain' }, { id: 'env_water', label: 'Water' },
    { id: 'env_vegetation', label: 'Vegetation' }, { id: 'env_rocks', label: 'Rocks' },
    { id: 'env_sky', label: 'Sky' },
  ]),
  assemblySlots: [
    { id: 'terrain', label: 'Terrain', required: true, accepts: ['terrain'] },
    { id: 'water', label: 'Water', required: false, accepts: ['water'] },
    { id: 'vegetation', label: 'Vegetation', required: false, accepts: ['vegetation', 'plant'] },
    { id: 'sky', label: 'Sky', required: false, accepts: ['sky'] },
  ],
}

export const PROP_TEMPLATE: BaseTemplate = {
  id: 'prop', name: 'Prop', icon: '📦',
  categories: ['All', 'Body', 'Detail', 'Mechanism', 'Decoration', 'Base'],
  tools: BASE_TOOLS, steps: BASE_STEPS,
  defaultHierarchy: genericHierarchy('Prop', 'prp_root', [
    { id: 'prp_body', label: 'Body' }, { id: 'prp_detail', label: 'Detail' },
    { id: 'prp_base', label: 'Base' },
  ]),
  assemblySlots: [
    { id: 'body', label: 'Body', required: true, accepts: ['body'] },
    { id: 'detail', label: 'Detail', required: false, accepts: ['detail', 'decoration'] },
    { id: 'base', label: 'Base', required: false, accepts: ['base'] },
  ],
}

export const CUSTOM_TEMPLATE: BaseTemplate = {
  id: 'custom', name: 'Other / Custom', icon: '✨',
  categories: ['All'],
  tools: BASE_TOOLS, steps: BASE_STEPS,
  defaultHierarchy: [
    node('cus_root', 'Custom Model', 'group', null),
    node('cus_main', 'Main Mesh', 'mesh', 'cus_root'),
  ],
  assemblySlots: [
    { id: 'main', label: 'Main', required: true, accepts: [] },
  ],
}
