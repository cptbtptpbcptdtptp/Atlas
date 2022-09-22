import { Rect } from "@oasis-engine/tool-atlas-algorithm";

/**
 * 打包的阶段产物
 */
export interface PackingOutput {
  code?: number;
  msg?: string;
  usage?: number;
  packItem?: Rect[];
  packedItem?: Rect[];
  info?: {
    imageFiles?: Array<ArrayBuffer>;
    atlasFile?: string;
  };
}
