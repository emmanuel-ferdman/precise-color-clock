import { useState, useEffect } from "react";

import { COLOR_MODES } from "@/config/color-modes";
import { ColorMode } from "@/types/color";

/**
 * Provides the current time and its color representation in a selected color mode.
 *
 * @param defaultMode The initial color mode (default: "hex").
 * @returns An object with time, color, colorMode, and setColorMode properties.
 */
export const useColorClock = (defaultMode: ColorMode = "hex") => {
  const [time, setTime] = useState("");
  const [color, setColor] = useState("");
  const [colorMode, setColorMode] = useState<ColorMode>(defaultMode);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      const s = now.getSeconds().toString().padStart(2, "0");
      const t = `${h}:${m}:${s}`;
      setTime(t);
      const values = [h, m, s].map(Number);
      const modeConfig = COLOR_MODES[colorMode];
      setColor(modeConfig.format(values));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [colorMode]);

  return { time, color, colorMode, setColorMode };
};
