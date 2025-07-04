import { ColorMode, ColorFormat } from "@/types/color";

export const COLOR_MODES: Record<ColorMode, ColorFormat> = {
  hex: {
    label: "HEX",
    format: ([h, m, s]) =>
      `#${h.toString().padStart(2, "0")}${m.toString().padStart(2, "0")}${s.toString().padStart(2, "0")}`,
    docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color",
  },
};
