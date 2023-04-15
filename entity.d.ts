
import type { MtToolCapabilities } from "./item";
import { MtNodeBox } from "./node";
import type { MtObjRef, MtObjProperties } from "./object";
import type { MtVec3 } from "./vector";

export interface MtPointedThing {
  type: "nothing" | "node" | "object";
  under?: MtVec3;
  above?: MtVec3;
  ref?: MtObjRef;
}

export type MtEntityStaticData = string;

export interface MtEntityOnActivate {
  (this: MtObjRef, staticdata: MtEntityStaticData, dtime_s: number): void;
}
export interface MtEntityOnStep {
  (this: MtObjRef, dtime: number): void;
}
export interface MtEntityOnPunch {
  (this: MtObjRef, puncher: MtObjRef | undefined, time_from_last_punch: number, tool_capabilities: MtToolCapabilities, dir: MtVec3): void;
}
export interface MtEntityOnRightClick {
  (this: MtObjRef, clicker: MtObjRef | undefined): void;
}
export interface MtEntityGetStaticDataCallback {
  (this: MtObjRef): MtEntityStaticData;
}

export interface MtEntityDef extends MtObjProperties {
  /** @deprecated 
   * Everything in object properties is read directly from here
   */
  initial_properties: Partial<MtObjProperties>;

  on_activate: MtEntityOnActivate;
  on_step: MtEntityOnStep;
  on_punch: MtEntityOnPunch;
  on_rightclick: MtEntityOnRightClick;
  /**
   * Called sometimes; the string returned is passed to on_activate when
   * the entity is re-activated from static state
  */
  get_staticdata: MtEntityGetStaticDataCallback;

  [_custom: string]: any;

  /**
   * Also you can define arbitrary member variables here (see item definition for
  -- more info)
  */
}

