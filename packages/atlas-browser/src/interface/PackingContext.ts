import { Rect } from "@oasis-engine/tool-atlas-algorithm";
import { PackingOption } from "../interface/PackingOption";
import { PackingItem } from "./PackingItem";
import { PackingOutput } from "./PackingOutput";

export interface PackingContext {
  images: PackingItem[];
  option: PackingOption;
  rects?: Rect[];
  exportWidth?: number;
  exportHeight?: number;
  outPut?: PackingOutput;
}
