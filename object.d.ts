
import type { MtColorSpec } from "./color";
import type { MtCollisionBox } from "./node";
import type { MtVec2, MtVec3 } from "./vector";

export interface MtPressedKeys {
  jump: boolean;
  right: boolean;
  left: boolean;
  LMB: boolean;
  RMB: boolean;
  sneak: boolean;
  aux1: boolean;
  down: boolean;
  up: boolean;
}

export interface MtPhysicsOverride {
  speed: number;
  jump: number;
  gravity: number;
  sneak: boolean;
  sneak_glitch: boolean;
  new_move: boolean;
}

export interface MtObjRef {
  object: MtObjRef;
  name: string;
  
  set_bone_position(bone: string, position: MtVec3, rotation: MtVec3): void;
  get_bone_position (bone: string): [MtVec3, MtVec3];
  get_pos(): MtVec3;
  set_pos(v: MtVec3): void;
  get_player_name(): string;
  is_player(): boolean;
  /**@deprecated: use get_velocity()*/
  get_player_velocity(): MtVec3|undefined;
  get_look_dir(): MtVec3;
  get_look_vertical(): number;
  get_look_horizontal(): number;
  set_look_vertical(rads: number): void;
  set_look_horizontal(rads: number): void;
  get_breath(): number;
  set_breath(b: number): void;
  set_attribute(k: string, v: string): void;
  get_attribute(k: string): string;
  get_player_control (): MtPressedKeys;
  set_physics_override (config: MtPhysicsOverride): void;
  get_physics_override (): MtPhysicsOverride;
  set_local_animation(
    standIdle: MtVec2,
    walk: MtVec2,
    dig: MtVec2,
    walkDig: MtVec2,
    frame_speed: number
  ): void;
  get_local_animation(): [MtVec2,MtVec2,MtVec2,MtVec2,number];
  /**Third person max values: {x=-10/10,y=-10,15,z=-5/5}*/
  set_eye_offset(fp: MtVec3, tp: MtVec3): void;
  get_eye_offsets (): [MtVec3, MtVec3];


  set_attach(parent: MtObjRef, bone?: string, position?: MtVec3, rotation?: MtVec3): void;
  get_attach(): LuaMultiReturn<[MtObjRef, string, MtVec3, MtVec3]>;
  set_detach (): void;

  remove (): void;

  set_velocity(v: MtVec3): void;
  get_velocity(): MtVec3;
  set_acceleration(a: MtVec3): void;
  get_acceleration(): MtVec3;
  set_yaw(radians: number): void;
  get_yaw(): number;
  set_texture_mod(mod: string): void;
  get_texture_mod(): string;
  set_sprite(p: MtVec2, num_frames: number, framelength: number, select_horiz_by_yawpitch: boolean): void;
  //Select sprite from spritesheet with optional animation and DM-style texture selection based on yaw relative to camera
  /**@deprecated: Will be removed in a future version - use .name*/
  get_entity_name(): string;
  get_luaentity(): MtObjRef;

}

export interface MtObjProperties {
  hp_max: number;
  physical: boolean;
  //collide with other objects if physical=true
  collide_with_objects: boolean;
  weight: number;
  collisionbox: MtCollisionBox;
  visual: "cube" | "sprite" | "upright_sprite" | "mesh" | "wielditem";
  visual_size: MtVec2;
  mesh: string;
  textures: string | Array<string>;
  colors: string | Array<string>;
  spritediv: MtVec2;
  initial_sprite_basepos: MtVec2;
  is_visible: boolean,
  makes_footstep_sound: boolean;
  automatic_rotate: boolean;
  stepheight: number
  /** automatically set yaw to movement direction; offset in degrees; false to disable*/
  automatic_face_movement_dir: number;

  /**limit automatic rotation to this value in degrees per second. values < 0 no limit*/
  automatic_face_movement_max_rotation_per_sec: number;
  /**false to disable backface_culling for model*/
  backface_culling: boolean;
  /**by default empty, for players their name is shown if empty*/
  nametag: string;
  nametag_color: MtColorSpec;
  /**by default empty, text to be shown when pointed at object*/
  infotext: string;
}
