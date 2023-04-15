
import type { MtEntityDef, MtEntityStaticData, MtPointedThing } from "./entity";
import type { CraftRecipeCommon, CraftRecipeTypeMap, MtItemDef } from "./item";
import type { MtNode } from "./node";
import type { MtObjRef } from "./object";
import type { MtPlayer, MtPlayerJoinCallback, MtPlayerLeaveCallback } from "./player";
import type { MtVec3 } from "./vector";

export { };

export type MtInsecEnv = typeof globalThis;

export type Raycast = LuaIterable<MtPointedThing>;

export interface MinetestGlobal {
  register_on_joinplayer(this: void, cb: MtPlayerJoinCallback): void;
  register_on_leaveplayer(this: void, cb: MtPlayerLeaveCallback): void;
  register_on_shutdown (this: void, cb: ()=> void): void;
  chat_send_player(this: void, playerName: string, message: string): void;
  chat_send_all(this: void, message: string): void;
  
  request_insecure_environment(this: void): MtInsecEnv;
  get_modpath(this: void, modname: string): string;
  get_current_modname(this: void): string;

  register_craftitem(this: void, name: string, itemDef: MtItemDef): void;
  register_tool(this: void, name: string, itemDef: MtItemDef): void;
  register_node(this: void, name: string, itemDef: MtItemDef): void;
  register_craft<K extends keyof CraftRecipeTypeMap>(this: void, recipe: CraftRecipeTypeMap[K]): void;
  clear_craft(this: void, recipe: CraftRecipeCommon<any>): void;

  add_entity(this: void, pos: MtVec3, name: string, staticdata?: MtEntityStaticData): MtObjRef;
  register_entity(this: void, name: string, enDef: Partial<MtEntityDef>): void;
  register_globalstep(this: void, cb: (this: void, dtime: number) => void): void;
  get_player_by_name (this: void, name: string): MtPlayer|undefined;
  get_node_or_nil (this: void, pos: MtVec3): MtNode|undefined;
  get_node (this: void, pos: MtVec3): MtNode;

  after(this: void, time: number, func: ()=> void): void;
  get_gametime (this: void): number;

  raycast(this: void, from: MtVec3, to: MtVec3, objects?: boolean, liquids?: boolean): Raycast;

  luaentities: {[key: string]: MtObjRef};
  object_refs: {[key: string]: MtObjRef};
}

declare global {


  const minetest: MinetestGlobal;

}


