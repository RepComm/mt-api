
import type { MtColorSpec } from "./color";
import type { MtPointedThing } from "./entity";
import { MtInvRef } from "./inventory";
import type { MetaDataRef, MtItemDef, MtItemStack } from "./item";
import type { MtPlayer } from "./player";
import type { MtSoundDefs } from "./sound";
import type { MtVec3 } from "./vector";

export type MtNodeName = string;

export type MtNodePlacementPrediction = string;

export interface OnPlaceCallback {
  (this: void, itemstack: MtItemStack, placer: MtPlayer | undefined, pointed_thing: MtPointedThing): MtItemStack | undefined;
}

export interface OnDropCallback {
  (this: void, itemstack: MtItemStack, dropper: MtPlayer | undefined, pos: MtVec3): void;
}

export interface OnUseCallback {
  (this: void, itemstack: MtItemStack, user: MtPlayer | undefined, pointed_thing: MtPointedThing): MtItemStack | undefined;
}

export interface MtNode {
  name: MtNodeName;
  param1: number;
  param2: number;
}

export interface MtDigParams {

}

export interface AfterUseCallback {
  (this: void, itemstack: MtItemStack, user: MtPlayer | undefined, node: MtNode, digparams: MtDigParams): void;
}

export type MtCollisionBox = Array<number>;

export interface MTABMAction {
  (this: void, pos: MtVec3, node: MtNode, active_object_count: number, active_object_count_wider: number): void;
}

export interface MtABMDef {
  /**
   * Descriptive label for profiling purposes (optional).
   * Definitions with identical labels will be listed as one
   */
  label: string;

  /**In the following two fields, also group:groupname will work*/
  nodenames: Array<string>;
  /**
   * Any of these
   * If left out or empty, any neighbor will do
  */
  neighbors: Array<string>;

  /**Operation interval in seconds*/
  interval: number;

  /**Chance of trigger per-node per-interval is 1.0 / this*/
  chance: number;

  /**
   * If true, catch-up behaviour is enabled
   * The chance value is temporarily reduced when returning to
   * an area to simulate time lost by the area being unattended.
   * Note chance value can often be reduced to 1
   */
  catch_up: boolean;
  action: MTABMAction;
}

export interface MtLBMAction {
  (this: void, pos: MtVec3, node: MtNode): void;
}

export interface MtLBMDef {
  /**
   * Descriptive label for profiling purposes (optional).
   * Definitions with identical labels will be listed as one.
   */
  label: string;
  name: string;
  /**
   * List of node names to trigger the LBM on
   * Also non-registered nodes will work
   * Groups (as of group:groupname) will work as well
  */
  nodenames: Array<string>;

  /**
   * Whether to run the LBM's action every time a block gets loaded,
   * and not just for blocks that were saved last time before LBMs were
   * introduced to the world
   */
  run_at_every_load: boolean;
  action: MtLBMAction;
}

export interface MtTileAnimVerticalFramesDef extends MtTileAnimDef<"vertical_frames"> {
  /**Width of a frame in pixels*/
  aspect_w: number;
  /**Height of a frame in pixels*/
  aspect_h: number;
  /**Specify full loop length*/
  length: number;
}
export interface MtTileAnimSheet2dDef extends MtTileAnimDef<"sheet_2d"> {
  /**width in num of frames*/
  frames_w: number;
  /**height in num of frames*/
  frames_h: number;
  /**length of single frame*/
  frame_length: number;
}
export interface MtTileAnimTypeMap {
  vertical_frames: MtTileAnimVerticalFramesDef;
  sheet_2d: MtTileAnimSheet2dDef;
}

export interface MtTileAnimDef<T extends keyof MtTileAnimTypeMap> {
  type: T;
}

export interface MtTileDef<K extends keyof MtTileAnimTypeMap> {
  /**texture file name*/
  name: string;
  animation?: MtTileAnimTypeMap[K];
  backface_culling?: boolean;
  tileable_vertical?: boolean;
  tileable_horizontal?: boolean;
  color?: MtColorSpec;
  /**@deprecated: use name instead*/
  image?: string;
}

export type MtNodeParamType = "none" | "light";
export type MtNodeParamType2 = "facedir"; //TODO - see what is allowed

export type MtNodeLiquidType = "none" | "source" | "flowing";

export type MtNodeBoxType = "regular" | "leveled" | "fixed" | "wallmounted" | "connected";

export type MtNodeBoxData = Array<number>;
export type MtNodeBoxesData = MtNodeBoxData|Array<MtNodeBoxData>;

export interface MtNodeBoxTypeMap {
  regular: MtNodeBoxRegular;
  leveled: MtNodeBoxLeveled;
  fixed: MtNodeBoxFixed;
  wallmounted: MtNodeBoxWallMounted;
  connected: MtNodeBoxConnected;
}

export interface MtNodeBox<T extends keyof MtNodeBoxTypeMap> {
  type: T; //TODO - finish
}
export interface MtNodeBoxRegular extends MtNodeBox<"regular"> {
  //TODO - lua_api not clear on this
}
/**TODO - lua_api not clear on this at all*/
export interface MtNodeBoxLeveled extends MtNodeBox<"leveled"> {
}
export interface MtNodeBoxFixed extends MtNodeBox<"fixed"> {
  fixed: MtNodeBoxesData;
}
export interface MtNodeBoxWallMounted extends MtNodeBox<"wallmounted"> {
  wall_top: MtNodeBoxData;
  wall_bottom: MtNodeBoxData;
  wall_side: MtNodeBoxData;
}
export interface MtNodeBoxConnected extends MtNodeBox<"connected"> {
  fixed: MtNodeBoxesData;
  connect_top?: MtNodeBoxesData;
  connect_bottom?: MtNodeBoxesData;
  connect_front?: MtNodeBoxesData;
  connect_left?: MtNodeBoxesData;
  connect_back?: MtNodeBoxesData;
  connect_right?: MtNodeBoxesData;
}

export type MtNodeSide = "top" | "bottom" | "front" | "left" | "back" | "right";
export type MtNodeSides = Array<MtNodeSide>;

export interface MtNodeOnConstructCallback {
  (this: void, pos: MtVec3): void;
}
export interface MtNodeOnDestructCallback {
  (this: void, pos: MtVec3): void;
}

export interface MtNodeAfterDestructCallback {
  (this: void, pos: MtVec3, oldnode: MtNode): void;
}

export interface MtNodeOnFloodCallback {
  (this: void, pos: MtVec3, oldnode: MtNode, newnode: MtNode): void;
}

export interface MtNodeOnPlaceCallback {
  (this: void, pos: MtVec3, placer: MtPlayer | undefined, itemstack: MtItemStack, pointed_thing: MtPointedThing): void;
}

export interface MtNodeMetaRef extends MetaDataRef {
  get_inventory(): MtInvRef;
}

export interface MtNodeAfterDigCallback {
  (this: void, pos: MtVec3, oldnode: MtNode, oldmetadata: MtNodeMetaRef, digger: MtPlayer | undefined): void;
}

export interface MtNodeCanDigCallback {
  (this: void, pos: MtVec3, player?: MtPlayer): boolean;
}

export interface MtNodeOnPunchCallback {
  (this: void, pos: MtVec3, node: MtNode, puncher: MtPlayer | undefined, pointed_thing: MtPointedThing): void;
}
export interface MtNodeOnRightClickCallback {
  (this: void, pos: MtVec3, node: MtNode, clicker: MtPlayer | undefined, itemstack: MtItemStack, pointed_thing: MtPointedThing): void;
}

export interface MtNodeOnDigCallback {
  (this: void, pos: MtVec3, node: MtNode, digger: MtPlayer | undefined): void;
}

export interface MtNodeOnTimerCallback {
  (this: void, pos: MtVec3, elapsed: number): void;
}

export interface MtNodeFields {
  //fields = { name1 = value1, name2 = value2, ...}
  [key: string]: string;
}

export interface MtNodeOnReceiveFields {
  (this: void, pos: MtVec3, formname: string, fields: MtNodeFields, sender: MtPlayer | undefined): void;
}

export interface MtNodeAllowMetadataInventoryMoveCallback {
  (this: void, pos: MtVec3, from_list: any, from_index: number, to_list: any, to_index: number, count: number, player: MtPlayer | undefined): number;
}

export interface MtNodeAllowMetadataInventoryPutCallback {
  (this: void, pos: MtVec3, listname: string, index: number, stack: MtItemStack, player: MtPlayer | undefined): boolean;
}

export interface MtNodeAllowMetadataInventoryTakeCallback {
  (this: void, pos: MtVec3, listname: string, index: number, stack: MtItemStack, player: MtPlayer): boolean;
}

export interface MtNodeOnMetadataInventoryMove {
  (this: void, pos: MtVec3, from_list: any, from_index: number, to_list: any, to_index: number, count: number, player: MtPlayer | undefined): void;
}

export interface MtNodeOnMetadataInventoryPut {
  (this: void, pos: MtVec3, listname: string, index: number, stack: MtItemStack, player: MtPlayer | undefined): void;
}

export interface MtNodeOnMetadataInventoryTake {
  (this: void, pos: MtVec3, listname: string, index: number, stack: MtItemStack, player: MtPlayer | undefined): void;
}

export interface MtNodeOnBlast {
  (this: void, pos: MtVec3, intensity: number): void;
}

export interface MtNodeDropDef {
  /**Maximum number of items to drop*/
  max_items: number;

  /**Choose max_items randomly from this list*/
  items: Array<{
    /**Items to drop*/
    items: Array<string>,
    /**Probability of dropping is 1 / rarity*/
    rarity: number,
  }>
}

export type MtNodeDrawtype =
  "normal" |
  "airlike" |
  "liquid" |
  "flowingliquid" |
  "glasslike" |
  "glasslike_framed" |
  "glasslike_framed_optional" |
  "allfaces" |
  "allfaces_optional" |
  "torchlike" |
  "signlike" |
  "plantlike" |
  "firelike" |
  "fencelike" |
  "raillike" |
  "nodebox" |
  "mesh";

export interface MtNodeDef<NodeBoxType extends MtNodeBoxType> extends MtItemDef {
  drawtype?: MtNodeDrawtype;
  /**
   * Supported for drawtypes "plantlike", "signlike", "torchlike",
   * "firelike", "mesh".
   * For plantlike and firelike, the image will start at the bottom of the
   * node, for the other drawtypes the image will be centered on the node.
   * Note that positioning for "torchlike" may still change. ]]
   */
  visual_scale?: number;
  /**Textures of node; +Y, -Y, +X, -X, +Z, -Z
   * List can be shortened to needed length
  */
  tiles?: string[]|MtTileDef<keyof MtTileAnimTypeMap>[];
  /**
   * Same as `tiles`, but these textures are drawn on top of the
   * base tiles.You can use this to colorize only specific parts of
   * your texture.If the texture name is an empty string, that
   * overlay is not drawn.Since such tiles are drawn twice, it
   * is not recommended to use overlays on very common nodes.
   */
  overlay_tiles?: string[]|MtTileDef<keyof MtTileAnimTypeMap>[];

  /**
   * Special textures of node; used rarely(old field name: special_materials)
   * List can be shortened to needed length
   */
  special_tiles?: string[]|MtTileDef<keyof MtTileAnimTypeMap>[];
  /**
   * The node's original color will be multiplied with this color.
   * If the node has a palette, then this setting only has an effect
   * in the inventory and on the wield item. ]]
   */
  color?: MtColorSpec;

  /**Use texture's alpha channel*/
  use_texture_alpha?: boolean;
  /**
   * The node's `param2` is used to select a pixel from the image
   * (pixels are arranged from left to right and from top to bottom).
   * The node's color will be multiplied with the selected pixel's
   * color.Tiles can override this behavior.
   * Only when`paramtype2` supports palettes. ]]
   */
  palette?: string;

  /**
   * If player is inside node, see "ColorSpec"
   * "green#0F"
   */
  post_effect_color?: MtColorSpec;

  /** paramtype = "light" allows light to propagate from or through the node with light value
   * falling by 1 per node.This line is essential for a light source node to spread its light
   */
  paramtype?: MtNodeParamType;
  paramtype2?: MtNodeParamType2;

  /**Force value for param2 when player places node*/
  place_param2?: boolean;

  /**If false, the cave generator will not carve through this*/
  is_ground_content?: boolean;

  /**If true, sunlight will go infinitely through this*/
  sunlight_propagates?: boolean;

  /**If true, objects collide with node*/
  walkable?: boolean;

  /**If true, can be pointed at*/
  pointable?: boolean;

  /**If false, can never be dug*/
  diggable?: boolean;

  /**If true, can be climbed on(ladder)*/
  climbable?: boolean;

  /**If true, placed nodes can replace this node*/
  buildable_to?: boolean;

  /**If true, liquids flow into and replace this node*/
  floodable?: boolean;

  liquidtype?: MtNodeLiquidType;

  /**Flowing version of source liquid*/
  liquid_alternative_flowing?: string;

  /**Source version of flowing liquid*/
  liquid_alternative_source?: string;

  /**Higher viscosity = slower flow(max. 7)*/
  liquid_viscosity?: number;

  /**If true, a new liquid source can be created by placing two or more sources nearby*/
  liquid_renewable?: boolean;

  /**
   * Block contains level in param2.Value is default level, used for snow.
   * Don't forget to use "leveled" type nodebox
   */
  leveled?: number;

  /**number of flowing nodes around source(max. 8)*/
  liquid_range?: number;

  /**Player will take this amount of damage if no bubbles are left*/
  drowning?: number;
  /**
   * Amount of light emitted by node.
   * To set the maximum(currently 14), use the value 'minetest.LIGHT_MAX'.
   * A value outside the range 0 to minetest.LIGHT_MAX causes undefined behavior
   */
  light_source?: number;

  /**If player is inside node, this damage is caused*/
  damage_per_second?: number;

  node_box?: MtNodeBoxTypeMap[keyof MtNodeBoxTypeMap];
  /**
   * Used for nodebox nodes with the type == "connected"
   * Specifies to what neighboring nodes connections will be drawn
   * e.g. `{"group:fence", "default:wood"}` or `"default:stone"`
   */
  connects_to?: Array<string>;

  /**Tells connected nodebox nodes to connect only to these sides of this node*/
  connect_sides?: MtNodeSides;

  mesh?: string;

  /**If drawtype "nodebox" is used and selection_box is nil, then node_box is used*/
  selection_box?: MtNodeBoxTypeMap["fixed"]; //TODO - see if more types allowed
  collision_box?: MtNodeBoxTypeMap["fixed"]; //TODO - see if more types allowed

  /**Support maps made in and before January 2012*/
  legacy_facedir_simple?: boolean;

  /**Support maps made in and before January 2012*/
  legacy_wallmounted?: boolean;

  sounds?: MtSoundDefs;

  /**Name of dropped node when dug.Default is the node itself*/
  drop?: string | MtNodeDropDef;

  /**
   * Node constructor; called after adding node
   * Can set up metadata and stuff like that
   * Not called for bulk node placement(i.e.schematics and VoxelManip)
   * default: nil
   */
  on_construct?: MtNodeOnConstructCallback;

  /**Node destructor; called before removing node
   * Not called for bulk node placement(i.e.schematics and VoxelManip)
   * default: nil
   */
  on_destruct?: MtNodeOnDestructCallback;

  /**Node destructor; called after removing node
   * Not called for bulk node placement(i.e.schematics and VoxelManip)
   * default: nil
   */
  after_destruct?: MtNodeAfterDestructCallback;

  /**Called when a liquid(newnode) is about to flood oldnode, if
   * it has`floodable = true` in the nodedef.Not called for bulk
   * node placement(i.e.schematics and VoxelManip) or air nodes.If
   * return true the node is not flooded, but on_flood callback will
   * most likely be called over and over again every liquid update
   * interval.Default: nil
   */
  on_flood?: MtNodeOnFloodCallback;

  /**Called after constructing node when node was placed using
   * minetest.item_place_node / minetest.place_node
   * If return true no item is taken from itemstack
   * default: nil
   */
  after_place_node?: MtNodeOnPlaceCallback;

  /**oldmetadata is in table format
   * Called after destructing node when node was dug using
   * minetest.node_dig / minetest.dig_node
   * default: nil
   */
  after_dig_node?: MtNodeAfterDigCallback;

  /**returns true if node can be dug, or false if not
   * default: nil
   */
  can_dig?: MtNodeCanDigCallback;

  /**default: minetest.node_punch
   * By default: Calls minetest.register_on_punchnode callbacks
   */
  on_punch?: MtNodeOnPunchCallback;

  /**default: nil
   * if defined, itemstack will hold clicker's wielded item
   * Shall return the leftover itemstack
   * Note: pointed_thing can be nil, if a mod calls this function
   */
  on_rightclick?: MtNodeOnRightClickCallback;

  /**default: minetest.node_dig
   * By default: checks privileges, wears out tool and removes node
   */
  on_dig?: MtNodeOnDigCallback;

  /**default: nil
   * called by NodeTimers, see minetest.get_node_timer and NodeTimerRef
   * elapsed is the total time passed since the timer was started
   * return true to run the timer for another cycle with the same timeout value
   */
  on_timer?: MtNodeOnTimerCallback;

  /**
   * Called when an UI form(e.g.sign text input) returns data
   * default: nil
  */
  on_receive_fields?: MtNodeOnReceiveFields;

  /**
   * Called when a player wants to move items inside the inventory
   * Return value: number of items allowed to move
   */
  allow_metadata_inventory_move?: MtNodeAllowMetadataInventoryMoveCallback;

  /**
   * Called when a player wants to put something into the inventory
   * Return value: number of items allowed to put
   * Return value: -1: Allow and don't modify item count in inventory
   */
  allow_metadata_inventory_put?: MtNodeAllowMetadataInventoryPutCallback;


  /**Called when a player wants to take something out of the inventory
   * Return value: number of items allowed to take
   * Return value: -1: Allow and don't modify item count in inventor
   */
  allow_metadata_inventory_take?: MtNodeAllowMetadataInventoryTakeCallback;

  on_metadata_inventory_move?: MtNodeOnMetadataInventoryMove;

  on_metadata_inventory_put?: MtNodeOnMetadataInventoryPut;

  /**
   * Called after the actual action has happened, according to what was allowed.
   * No return value
   */
  on_metadata_inventory_take?: MtNodeOnMetadataInventoryTake;

  /**
   * intensity: 1.0 = mid range of regular TNT
   * If defined, called when an explosion touches the node, instead of
   * removing the node
   */
  on_blast?: MtNodeOnBlast;
}
