
export type MtSimpleSoundSpec = string;

export interface MtSoundDefs {
  [key: string]: MtSimpleSoundSpec;
  /**tools only*/
  breaks: MtSimpleSoundSpec;
  place: MtSimpleSoundSpec;

  footstep: MtSimpleSoundSpec;
  dig: MtSimpleSoundSpec;
  dug: MtSimpleSoundSpec;
  place_failed: MtSimpleSoundSpec;
}
