import { node } from './helpers'
import { BASE_TOOLS, RIG_STEPS, type BaseTemplate } from './template.types'

function characterHierarchy() {
  const root = 'chr_root', meshGrp = 'chr_meshes', skelGrp = 'chr_skeleton'
  const clothGrp = 'chr_clothing', accGrp = 'chr_accessories'
  const boneRoot = 'chr_b_root', pelvis = 'chr_b_pelvis'
  const spine1 = 'chr_b_spine1', spine2 = 'chr_b_spine2', spine3 = 'chr_b_spine3'
  const chest = 'chr_b_chest', neck = 'chr_b_neck', head = 'chr_b_head'
  const clavL = 'chr_b_clav_l', uarmL = 'chr_b_uarm_l', larmL = 'chr_b_larm_l', handL = 'chr_b_hand_l'
  const clavR = 'chr_b_clav_r', uarmR = 'chr_b_uarm_r', larmR = 'chr_b_larm_r', handR = 'chr_b_hand_r'
  const thighL = 'chr_b_thigh_l', calfL = 'chr_b_calf_l', footL = 'chr_b_foot_l'
  const thighR = 'chr_b_thigh_r', calfR = 'chr_b_calf_r', footR = 'chr_b_foot_r'

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
    node(spine2, 'spine_02', 'bone', spine1),
    node(spine3, 'spine_03', 'bone', spine2),
    node(chest, 'chest', 'bone', spine3),
    node(neck, 'neck', 'bone', chest),
    node(head, 'head', 'bone', neck, false),
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

export const CHARACTER_TEMPLATE: BaseTemplate = {
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
