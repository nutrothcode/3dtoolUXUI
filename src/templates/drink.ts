import { node } from './helpers'
import { BASE_TOOLS, BASE_STEPS, type BaseTemplate } from './template.types'

function drinkHierarchy() {
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

export const DRINK_TEMPLATE: BaseTemplate = {
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
