import { MaxRectsMethod } from "@zyw-atlas/atlas-algorithm";

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
