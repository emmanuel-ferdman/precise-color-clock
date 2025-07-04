export type ColorMode = "hex" | "hsl" | "hwb" | "lab" | "lch" | "oklab" | "oklch" | "rgb";

export type ColorFormat = {
  docs: string;
  format: (values: number[]) => string;
  label: string;
};
