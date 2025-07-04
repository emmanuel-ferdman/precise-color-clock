import { parse, converter } from "culori";

import { COLOR_BRIGHTNESS_THRESHOLD } from "@/config/constants";

/**
 * Determine if a color is light based on its brightness.
 * This function uses the HSV (Hue, Saturation, Value) model to assess brightness.
 *
 * @param color - The color string to check (hex, rgb, hsl, etc.).
 * @returns True if the color is light, false otherwise.
 */
export function isColorLight(color: string): boolean {
  const parsed = parse(color);
  if (!parsed) return false;

  const toHsv = converter("hsv");
  const hsv = toHsv(parsed);
  if (!hsv) return false;

  const brightness = hsv.v * 100;
  return brightness > COLOR_BRIGHTNESS_THRESHOLD;
}
