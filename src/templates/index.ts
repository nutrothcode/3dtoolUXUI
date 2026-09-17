export type { BaseTemplate, TemplateTools, AssemblySlot, TemplateId } from './template.types'
export { BASE_TOOLS, BASE_STEPS, RIG_STEPS, ANIM_STEPS } from './template.types'

export { CHARACTER_TEMPLATE } from './character'
export { DRINK_TEMPLATE } from './drink'
export { VEHICLE_TEMPLATE } from './vehicle'
export { BUILDING_TEMPLATE } from './building'
export {
  FOOD_TEMPLATE, FURNITURE_TEMPLATE, WEAPON_TEMPLATE, TOOL_TEMPLATE,
  PLANT_TEMPLATE, ANIMAL_TEMPLATE, ENVIRONMENT_TEMPLATE, PROP_TEMPLATE, CUSTOM_TEMPLATE,
} from './generic'

import type { BaseTemplate, TemplateId } from './template.types'
import { CHARACTER_TEMPLATE } from './character'
import { DRINK_TEMPLATE } from './drink'
import { VEHICLE_TEMPLATE } from './vehicle'
import { BUILDING_TEMPLATE } from './building'
import {
  FOOD_TEMPLATE, FURNITURE_TEMPLATE, WEAPON_TEMPLATE, TOOL_TEMPLATE,
  PLANT_TEMPLATE, ANIMAL_TEMPLATE, ENVIRONMENT_TEMPLATE, PROP_TEMPLATE, CUSTOM_TEMPLATE,
} from './generic'

export const ALL_TEMPLATES: BaseTemplate[] = [
  CHARACTER_TEMPLATE, DRINK_TEMPLATE, FOOD_TEMPLATE, VEHICLE_TEMPLATE,
  BUILDING_TEMPLATE, FURNITURE_TEMPLATE, WEAPON_TEMPLATE, TOOL_TEMPLATE,
  PLANT_TEMPLATE, ANIMAL_TEMPLATE, ENVIRONMENT_TEMPLATE, PROP_TEMPLATE,
  CUSTOM_TEMPLATE,
]

export function getTemplate(id: TemplateId): BaseTemplate {
  return ALL_TEMPLATES.find(t => t.id === id) ?? CHARACTER_TEMPLATE
}
