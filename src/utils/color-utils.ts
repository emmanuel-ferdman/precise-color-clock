import { parse, converter } from "culori";

import { COLOR_MODES } from "@/config/color-modes";
import { COLOR_BRIGHTNESS_THRESHOLD } from "@/config/constants";
import { ColorMode } from "@/types/color";

/**
 * Convert all time points (HH:MM:SS) to RGB values based on the specified color mode.
 *
 * @param mode - The color mode to use.
 * @returns A flat array of RGB values [r1, g1, b1, r2, g2, b2, ...] for all time points.
 */
export function getTimeColorsAsRgbArray(mode: ColorMode): number[] {
  const modeConfig = COLOR_MODES[mode];
  if (!modeConfig) return [];

  const toRgb = converter("rgb");
  const rgbArray = [];

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m++) {
      for (let s = 0; s < 60; s++) {
        const colorStr = modeConfig.format([h, m, s]);
        const parsed = parse(colorStr || "#000");
        const rgb = toRgb(parsed);
        if (rgb) {
          rgbArray.push(rgb.r, rgb.g, rgb.b);
        } else {
          console.warn(`Failed to parse color: ${colorStr}`);
          rgbArray.push(0, 0, 0); // fallback to black
        }
      }
    }
  }

  return rgbArray;
}

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
