import type { SceneNode } from '../core/SceneStore'
import type { ModelTypeId, StepId } from '../modelTypes'

export type TemplateId = ModelTypeId

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

export const BASE_TOOLS: TemplateTools = {
  assemble: true, retopology: true, uv: true, material: true, texture: true,
  clothing: false, bodyRig: false, faceRig: false, animation: false, export: true,
}

export const BASE_STEPS: StepId[] = ['model', 'assemble', 'retopology', 'uv', 'material', 'texture', 'export']
export const RIG_STEPS: StepId[] = ['model', 'assemble', 'clothing', 'retopology', 'uv', 'material', 'texture', 'bodyrig', 'facerig', 'animate', 'export']
export const ANIM_STEPS: StepId[] = ['model', 'assemble', 'retopology', 'uv', 'material', 'texture', 'animate', 'export']
