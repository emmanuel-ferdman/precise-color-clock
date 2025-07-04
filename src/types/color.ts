export type ColorMode = "hex";

export type ColorFormat = {
  docs: string;
  format: (values: number[]) => string;
  label: string;
};
