import { MaxRectsMethod } from "@oasis-engine/tool-atlas-algorithm";

export interface PackingOption {
  width?: number;
  height?: number;
  padding?: number;
  allowRotate?: boolean;
  square?: boolean;
  pot?: boolean;
  output?: string;
  method?: MaxRectsMethod;
}
