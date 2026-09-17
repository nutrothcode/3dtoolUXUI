import { node } from './helpers'
import { BASE_TOOLS, ANIM_STEPS, type BaseTemplate } from './template.types'

function vehicleHierarchy() {
  const root = 'veh_root', wheels = 'veh_wheels', interior = 'veh_interior', lights = 'veh_lights'
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

export const VEHICLE_TEMPLATE: BaseTemplate = {
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
