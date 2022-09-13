/**
 * 打包的阶段产物
 */
export interface PackingOutput {
  code?: number;
  msg?: string;
  info?: {
    imageFiles?: Array<ArrayBuffer>;
    atlasFile?: string;
  };
}
