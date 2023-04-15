
import type { MtObjRef } from "./object";

export type MtPlayer = MtObjRef;

export interface MtPlayerJoinCallback {
  (this: void, player: MtPlayer): void;
}

export interface MtPlayerLeaveCallback {
  (this: void, player: MtPlayer, timedout: boolean): void;
}

export interface PlayerAPI {

}

declare global {
  const player_api: PlayerAPI;
}
