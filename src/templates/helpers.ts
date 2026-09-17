import type { SceneNode, SceneNodeType } from '../core/SceneStore'

export function node(
  id: string, label: string, type: SceneNodeType,
  parentId: string | null, open = true,
): SceneNode {
  return { id, label, type, parentId, open, visible: true, locked: false }
}

export function genericHierarchy(rootLabel: string, rootId: string, parts: { id: string; label: string }[]): SceneNode[] {
  return [
    node(rootId, rootLabel, 'group', null),
    ...parts.map(p => node(p.id, p.label, 'mesh', rootId)),
    node(`${rootId}_lights`, 'Lights', 'group', rootId, false),
    node(`${rootId}_cam`, 'Camera', 'camera', rootId, false),
  ]
}
