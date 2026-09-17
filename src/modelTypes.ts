export type ModelTypeId =
  | 'character' | 'drink' | 'food' | 'vehicle' | 'building'
  | 'furniture' | 'weapon' | 'tool' | 'plant' | 'animal'
  | 'environment' | 'prop' | 'custom'

export type ModelType = {
  id: ModelTypeId
  name: string
  icon: string
  categories: string[]
  // step ids available for this model type
  steps: StepId[]
}

export type StepId =
  | 'model' | 'assemble' | 'clothing' | 'retopology'
  | 'uv' | 'material' | 'texture' | 'bodyrig' | 'facerig'
  | 'animate' | 'export'

export const ALL_STEP_LABELS: Record<StepId, string> = {
  model: 'Model',
  assemble: 'Assemble',
  clothing: 'Clothing',
  retopology: 'Retopology',
  uv: 'UV',
  material: 'Material',
  texture: 'Texture',
  bodyrig: 'Body Rig',
  facerig: 'Face Rig',
  animate: 'Animate',
  export: 'Export',
}

const BASE_STEPS: StepId[] = ['model', 'assemble', 'retopology', 'uv', 'material', 'texture', 'export']
const RIG_STEPS: StepId[] = ['model', 'assemble', 'clothing', 'retopology', 'uv', 'material', 'texture', 'bodyrig', 'facerig', 'animate', 'export']
const VEHICLE_STEPS: StepId[] = ['model', 'assemble', 'retopology', 'uv', 'material', 'texture', 'animate', 'export']

export const MODEL_TYPES: ModelType[] = [
  {
    id: 'character', name: 'Character', icon: '🧍',
    categories: ['All', 'Body', 'Head', 'Hair', 'Eye', 'Mouth', 'Hand', 'Foot', 'Clothing', 'Accessory'],
    steps: RIG_STEPS,
  },
  {
    id: 'drink', name: 'Drink', icon: '🥤',
    categories: ['All', 'Cup', 'Bottle', 'Can', 'Liquid', 'Ice', 'Lid', 'Straw', 'Decoration'],
    steps: BASE_STEPS,
  },
  {
    id: 'food', name: 'Food', icon: '🍎',
    categories: ['All', 'Base', 'Layer', 'Topping', 'Container', 'Garnish', 'Decoration'],
    steps: BASE_STEPS,
  },
  {
    id: 'vehicle', name: 'Vehicle', icon: '🚗',
    categories: ['All', 'Body', 'Wheel', 'Tire', 'Glass', 'Interior', 'Light', 'Engine', 'Accessory'],
    steps: VEHICLE_STEPS,
  },
  {
    id: 'building', name: 'Building', icon: '🏠',
    categories: ['All', 'Structure', 'Wall', 'Floor', 'Roof', 'Door', 'Window', 'Stairs', 'Decoration'],
    steps: BASE_STEPS,
  },
  {
    id: 'furniture', name: 'Furniture', icon: '🪑',
    categories: ['All', 'Frame', 'Seat', 'Back', 'Leg', 'Cushion', 'Shelf', 'Drawer', 'Hardware'],
    steps: BASE_STEPS,
  },
  {
    id: 'weapon', name: 'Weapon', icon: '⚔️',
    categories: ['All', 'Blade', 'Handle', 'Guard', 'Pommel', 'Barrel', 'Stock', 'Accessory'],
    steps: BASE_STEPS,
  },
  {
    id: 'tool', name: 'Tool', icon: '🔧',
    categories: ['All', 'Head', 'Handle', 'Body', 'Mechanism', 'Fastener', 'Accessory'],
    steps: BASE_STEPS,
  },
  {
    id: 'plant', name: 'Plant', icon: '🌿',
    categories: ['All', 'Root', 'Trunk', 'Branch', 'Leaf', 'Flower', 'Fruit', 'Bark'],
    steps: BASE_STEPS,
  },
  {
    id: 'animal', name: 'Animal', icon: '🐾',
    categories: ['All', 'Body', 'Head', 'Limb', 'Tail', 'Wing', 'Fur', 'Scale'],
    steps: ['model', 'assemble', 'retopology', 'uv', 'material', 'texture', 'bodyrig', 'animate', 'export'],
  },
  {
    id: 'environment', name: 'Environment', icon: '🏔️',
    categories: ['All', 'Terrain', 'Rock', 'Water', 'Vegetation', 'Sky', 'Structure', 'Prop'],
    steps: BASE_STEPS,
  },
  {
    id: 'prop', name: 'Prop', icon: '📦',
    categories: ['All', 'Body', 'Detail', 'Mechanism', 'Decoration', 'Base'],
    steps: BASE_STEPS,
  },
  {
    id: 'custom', name: 'Other / Custom', icon: '✨',
    categories: ['All'],
    steps: BASE_STEPS,
  },
]

export function getModelType(id: ModelTypeId): ModelType {
  return MODEL_TYPES.find(t => t.id === id) ?? MODEL_TYPES[0]
}

// Sample asset data per model type category
export type ModelAsset = {
  id: string; name: string; label: string; category: string
  emoji: string; g1: string; g2: string
  triangles: string; vertices: string; format: string
  hasRig: boolean; hasSkin: boolean; unit: string; path: string
  materials: number; textures: number; fileSize: string
}

const CHARACTER_ASSETS: ModelAsset[] = [
  { id: 'base_body', name: 'Base Body', label: 'Base Body', category: 'body', emoji: '🧍', g1: '#c8a08060', g2: '#604030a0', triangles: '98,432', vertices: '98,432', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Body/BaseBody.fbx', materials: 4, textures: 4, fileSize: '12.4 MB' },
  { id: 'head', name: 'Head', label: 'Head', category: 'head', emoji: '🗣', g1: '#d0a08070', g2: '#804838a0', triangles: '52,340', vertices: '52,340', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Head/Head.fbx', materials: 4, textures: 4, fileSize: '8.2 MB' },
  { id: 'hair', name: 'Hair', label: 'Hair', category: 'hair', emoji: '💈', g1: '#20100890', g2: '#100808a0', triangles: '18,400', vertices: '18,400', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Head/Hair.fbx', materials: 2, textures: 2, fileSize: '3.1 MB' },
  { id: 'eye', name: 'Eye', label: 'Eye', category: 'eye', emoji: '👁', g1: '#3070c080', g2: '#1040a0a0', triangles: '8,200', vertices: '8,200', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Head/Eye.fbx', materials: 2, textures: 2, fileSize: '1.4 MB' },
  { id: 'mouth', name: 'Mouth', label: 'Mouth', category: 'mouth', emoji: '👄', g1: '#e0706080', g2: '#c04040a0', triangles: '5,800', vertices: '5,800', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Head/Mouth.fbx', materials: 2, textures: 2, fileSize: '1.2 MB' },
  { id: 'hand_l', name: 'Hand_L', label: 'Hand_L', category: 'hand', emoji: '✋', g1: '#c89070a0', g2: '#704030a0', triangles: '12,480', vertices: '6,245', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Body/Hand_L.fbx', materials: 2, textures: 2, fileSize: '2.8 MB' },
  { id: 'foot_l', name: 'Foot_L', label: 'Foot_L', category: 'foot', emoji: '🦶', g1: '#c09070a0', g2: '#6a4030a0', triangles: '9,600', vertices: '4,800', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Body/Foot_L.fbx', materials: 2, textures: 2, fileSize: '2.1 MB' },
  { id: 'clothing', name: 'Shirt', label: 'Shirt', category: 'clothing', emoji: '👕', g1: '#3040608a', g2: '#1830408a', triangles: '16,200', vertices: '8,100', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Clothing/Shirt.fbx', materials: 2, textures: 2, fileSize: '3.8 MB' },
  { id: 'pants', name: 'Pants', label: 'Pants', category: 'clothing', emoji: '👖', g1: '#283048a0', g2: '#141828a0', triangles: '14,400', vertices: '7,200', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Clothing/Pants.fbx', materials: 2, textures: 2, fileSize: '3.2 MB' },
  { id: 'accessory', name: 'Glasses', label: 'Glasses', category: 'accessory', emoji: '🕶', g1: '#30303060', g2: '#181818a0', triangles: '4,800', vertices: '2,400', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Accessory/Glasses.fbx', materials: 1, textures: 1, fileSize: '1.0 MB' },
]

const DRINK_ASSETS: ModelAsset[] = [
  { id: 'cup_body', name: 'Cup Body', label: 'Cup Body', category: 'cup', emoji: '☕', g1: '#c09060a0', g2: '#604828a0', triangles: '4,200', vertices: '2,100', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Drink/CupBody.fbx', materials: 2, textures: 2, fileSize: '1.2 MB' },
  { id: 'bottle', name: 'Bottle', label: 'Bottle', category: 'bottle', emoji: '🍾', g1: '#3060a080', g2: '#183060a0', triangles: '6,800', vertices: '3,400', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Drink/Bottle.fbx', materials: 2, textures: 2, fileSize: '1.8 MB' },
  { id: 'can', name: 'Can', label: 'Can', category: 'can', emoji: '🥫', g1: '#c0304080', g2: '#80182080', triangles: '3,600', vertices: '1,800', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Drink/Can.fbx', materials: 2, textures: 2, fileSize: '0.9 MB' },
  { id: 'liquid', name: 'Liquid', label: 'Liquid', category: 'liquid', emoji: '💧', g1: '#2060c080', g2: '#103080a0', triangles: '1,200', vertices: '600', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Drink/Liquid.fbx', materials: 1, textures: 1, fileSize: '0.4 MB' },
  { id: 'ice', name: 'Ice Cube', label: 'Ice Cube', category: 'ice', emoji: '🧊', g1: '#80c0e080', g2: '#4090c0a0', triangles: '800', vertices: '400', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Drink/Ice.fbx', materials: 1, textures: 1, fileSize: '0.2 MB' },
  { id: 'lid', name: 'Lid', label: 'Lid', category: 'lid', emoji: '🔵', g1: '#404040a0', g2: '#202020a0', triangles: '1,600', vertices: '800', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Drink/Lid.fbx', materials: 1, textures: 1, fileSize: '0.5 MB' },
  { id: 'straw', name: 'Straw', label: 'Straw', category: 'straw', emoji: '🥤', g1: '#e0304080', g2: '#c01828a0', triangles: '400', vertices: '200', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Drink/Straw.fbx', materials: 1, textures: 1, fileSize: '0.1 MB' },
]

const VEHICLE_ASSETS: ModelAsset[] = [
  { id: 'car_body', name: 'Car Body', label: 'Car Body', category: 'body', emoji: '🚗', g1: '#2050a080', g2: '#103060a0', triangles: '48,000', vertices: '24,000', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Vehicle/CarBody.fbx', materials: 6, textures: 6, fileSize: '14.2 MB' },
  { id: 'wheel', name: 'Wheel', label: 'Wheel', category: 'wheel', emoji: '⚙️', g1: '#303030a0', g2: '#181818a0', triangles: '6,400', vertices: '3,200', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Vehicle/Wheel.fbx', materials: 2, textures: 2, fileSize: '2.1 MB' },
  { id: 'tire', name: 'Tire', label: 'Tire', category: 'tire', emoji: '🔘', g1: '#181818a0', g2: '#080808a0', triangles: '4,800', vertices: '2,400', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Vehicle/Tire.fbx', materials: 1, textures: 1, fileSize: '1.4 MB' },
  { id: 'glass', name: 'Windshield', label: 'Windshield', category: 'glass', emoji: '🪟', g1: '#80c0e040', g2: '#4090c060', triangles: '2,400', vertices: '1,200', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Vehicle/Glass.fbx', materials: 1, textures: 2, fileSize: '0.8 MB' },
  { id: 'interior', name: 'Interior', label: 'Interior', category: 'interior', emoji: '🪑', g1: '#3a2820a0', g2: '#1e1410a0', triangles: '18,000', vertices: '9,000', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Vehicle/Interior.fbx', materials: 4, textures: 4, fileSize: '5.6 MB' },
  { id: 'light', name: 'Headlight', label: 'Headlight', category: 'light', emoji: '💡', g1: '#e0e0c080', g2: '#c0c090a0', triangles: '1,800', vertices: '900', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Vehicle/Headlight.fbx', materials: 2, textures: 2, fileSize: '0.6 MB' },
]

const BUILDING_ASSETS: ModelAsset[] = [
  { id: 'structure', name: 'Main Structure', label: 'Main Structure', category: 'structure', emoji: '🏗️', g1: '#808080a0', g2: '#404040a0', triangles: '32,000', vertices: '16,000', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Building/Structure.fbx', materials: 4, textures: 4, fileSize: '9.8 MB' },
  { id: 'wall', name: 'Wall Panel', label: 'Wall Panel', category: 'wall', emoji: '🧱', g1: '#c08060a0', g2: '#805040a0', triangles: '400', vertices: '200', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Building/Wall.fbx', materials: 1, textures: 2, fileSize: '0.3 MB' },
  { id: 'floor', name: 'Floor Tile', label: 'Floor Tile', category: 'floor', emoji: '⬜', g1: '#d0c0a080', g2: '#a09060a0', triangles: '200', vertices: '100', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Building/Floor.fbx', materials: 1, textures: 2, fileSize: '0.1 MB' },
  { id: 'roof', name: 'Roof Section', label: 'Roof Section', category: 'roof', emoji: '🏠', g1: '#804020a0', g2: '#401808a0', triangles: '800', vertices: '400', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Building/Roof.fbx', materials: 1, textures: 2, fileSize: '0.4 MB' },
  { id: 'door', name: 'Door', label: 'Door', category: 'door', emoji: '🚪', g1: '#704020a0', g2: '#381808a0', triangles: '1,200', vertices: '600', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Building/Door.fbx', materials: 2, textures: 2, fileSize: '0.6 MB' },
  { id: 'window', name: 'Window', label: 'Window', category: 'window', emoji: '🪟', g1: '#80c0e040', g2: '#4090c060', triangles: '800', vertices: '400', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Building/Window.fbx', materials: 1, textures: 2, fileSize: '0.4 MB' },
]

export const ASSETS_BY_TYPE: Record<ModelTypeId, ModelAsset[]> = {
  character: CHARACTER_ASSETS,
  drink: DRINK_ASSETS,
  food: [
    { id: 'food_base', name: 'Bun Base', label: 'Bun Base', category: 'base', emoji: '🍔', g1: '#c09040a0', g2: '#806020a0', triangles: '3,200', vertices: '1,600', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Food/Bun.fbx', materials: 2, textures: 2, fileSize: '0.8 MB' },
    { id: 'food_topping', name: 'Patty', label: 'Patty', category: 'topping', emoji: '🥩', g1: '#803020a0', g2: '#501810a0', triangles: '2,400', vertices: '1,200', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Food/Patty.fbx', materials: 1, textures: 2, fileSize: '0.6 MB' },
  ],
  vehicle: VEHICLE_ASSETS,
  building: BUILDING_ASSETS,
  furniture: [
    { id: 'frame', name: 'Chair Frame', label: 'Chair Frame', category: 'frame', emoji: '🪑', g1: '#604020a0', g2: '#302010a0', triangles: '8,400', vertices: '4,200', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Furniture/ChairFrame.fbx', materials: 2, textures: 2, fileSize: '2.4 MB' },
    { id: 'cushion', name: 'Cushion', label: 'Cushion', category: 'cushion', emoji: '🟥', g1: '#c03040a0', g2: '#801820a0', triangles: '2,000', vertices: '1,000', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Furniture/Cushion.fbx', materials: 1, textures: 2, fileSize: '0.6 MB' },
  ],
  weapon: [
    { id: 'blade', name: 'Blade', label: 'Blade', category: 'blade', emoji: '⚔️', g1: '#c0c0c0a0', g2: '#808080a0', triangles: '4,800', vertices: '2,400', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Weapon/Blade.fbx', materials: 2, textures: 2, fileSize: '1.4 MB' },
    { id: 'handle', name: 'Handle', label: 'Handle', category: 'handle', emoji: '🫰', g1: '#804020a0', g2: '#402010a0', triangles: '2,400', vertices: '1,200', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Weapon/Handle.fbx', materials: 1, textures: 2, fileSize: '0.7 MB' },
  ],
  tool: [
    { id: 'tool_head', name: 'Hammer Head', label: 'Hammer Head', category: 'head', emoji: '🔨', g1: '#808080a0', g2: '#404040a0', triangles: '3,200', vertices: '1,600', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Tool/HammerHead.fbx', materials: 1, textures: 2, fileSize: '0.9 MB' },
    { id: 'tool_handle', name: 'Tool Handle', label: 'Tool Handle', category: 'handle', emoji: '🪵', g1: '#a06030a0', g2: '#603018a0', triangles: '1,200', vertices: '600', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Tool/Handle.fbx', materials: 1, textures: 1, fileSize: '0.3 MB' },
  ],
  plant: [
    { id: 'trunk', name: 'Tree Trunk', label: 'Tree Trunk', category: 'trunk', emoji: '🌳', g1: '#604020a0', g2: '#301808a0', triangles: '6,400', vertices: '3,200', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Plant/Trunk.fbx', materials: 2, textures: 2, fileSize: '1.8 MB' },
    { id: 'leaf', name: 'Leaf Cluster', label: 'Leaf Cluster', category: 'leaf', emoji: '🍃', g1: '#308040a0', g2: '#184820a0', triangles: '4,800', vertices: '2,400', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Plant/Leaf.fbx', materials: 1, textures: 2, fileSize: '1.2 MB' },
  ],
  animal: [
    { id: 'animal_body', name: 'Animal Body', label: 'Animal Body', category: 'body', emoji: '🐾', g1: '#c09060a0', g2: '#804030a0', triangles: '22,000', vertices: '11,000', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Animal/Body.fbx', materials: 3, textures: 3, fileSize: '6.5 MB' },
    { id: 'animal_head', name: 'Animal Head', label: 'Animal Head', category: 'head', emoji: '🐱', g1: '#d0a07080', g2: '#905040a0', triangles: '12,000', vertices: '6,000', format: 'FBX', hasRig: true, hasSkin: true, unit: 'Meter (1.0)', path: '/Assets/Animal/Head.fbx', materials: 2, textures: 2, fileSize: '3.8 MB' },
  ],
  environment: [
    { id: 'terrain', name: 'Terrain', label: 'Terrain', category: 'terrain', emoji: '🏔️', g1: '#608040a0', g2: '#304020a0', triangles: '48,000', vertices: '24,000', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Environment/Terrain.fbx', materials: 4, textures: 8, fileSize: '16.2 MB' },
    { id: 'rock', name: 'Rock Formation', label: 'Rock Formation', category: 'rock', emoji: '🪨', g1: '#707060a0', g2: '#404038a0', triangles: '8,400', vertices: '4,200', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Environment/Rock.fbx', materials: 2, textures: 2, fileSize: '2.4 MB' },
  ],
  prop: [
    { id: 'prop_base', name: 'Crate', label: 'Crate', category: 'body', emoji: '📦', g1: '#806040a0', g2: '#403020a0', triangles: '1,200', vertices: '600', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Prop/Crate.fbx', materials: 1, textures: 2, fileSize: '0.4 MB' },
    { id: 'prop_detail', name: 'Barrel', label: 'Barrel', category: 'body', emoji: '🛢️', g1: '#704020a0', g2: '#381810a0', triangles: '2,400', vertices: '1,200', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Prop/Barrel.fbx', materials: 1, textures: 2, fileSize: '0.7 MB' },
  ],
  custom: [
    { id: 'custom_01', name: 'Custom Part 01', label: 'Custom Part 01', category: 'all', emoji: '✨', g1: '#9030c080', g2: '#601890a0', triangles: '4,000', vertices: '2,000', format: 'FBX', hasRig: false, hasSkin: false, unit: 'Meter (1.0)', path: '/Assets/Custom/Part01.fbx', materials: 1, textures: 1, fileSize: '1.0 MB' },
  ],
}
