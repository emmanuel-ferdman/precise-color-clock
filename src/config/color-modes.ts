import { ColorMode, ColorFormat } from "@/types/color";

export const COLOR_MODES: Record<ColorMode, ColorFormat> = {
  hex: {
    label: "HEX",
    format: ([h, m, s]) =>
      `#${h.toString().padStart(2, "0")}${m.toString().padStart(2, "0")}${s.toString().padStart(2, "0")}`,
    docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color",
  },
  hsl: {
    label: "HSL",
    format: ([h, m, s]) => `hsl(${h}, ${m}%, ${s}%)`,
    docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl",
  },
  hwb: {
    label: "HWB",
    format: ([h, m, s]) => `hwb(${h} ${m}% ${s}%)`,
    docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb",
  },
  lab: {
    label: "LAB",
    format: ([h, m, s]) => `lab(${h}% ${m} ${s})`,
    docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab",
  },
  lch: {
    label: "LCH",
    format: ([h, m, s]) => `lch(${h}% ${m} ${s})`,
    docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lch",
  },
  oklab: {
    label: "OKLAB",
    format: ([h, m, s]) => `oklab(${h}% ${m}% ${s}%)`,
    docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklab",
  },
  oklch: {
    label: "OKLCH",
    format: ([h, m, s]) => `oklch(${h}% ${m}% ${s}deg)`,
    docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch",
  },
  rgb: {
    label: "RGB",
    format: ([h, m, s]) => `rgb(${h}, ${m}, ${s})`,
    docs: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb",
  },
};
