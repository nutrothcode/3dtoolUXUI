import { node } from './helpers'
import { BASE_TOOLS, BASE_STEPS, type BaseTemplate } from './template.types'

function buildingHierarchy() {
  const root = 'bld_root', walls = 'bld_walls', floors = 'bld_floors'
  const doors = 'bld_doors', windows = 'bld_windows'
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

export const BUILDING_TEMPLATE: BaseTemplate = {
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
