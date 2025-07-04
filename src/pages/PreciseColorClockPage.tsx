import { useState } from "react";

import { useColorClock } from "@/hooks/use-color-clock";
import { isColorLight } from "@/utils/color-utils";

function PreciseColorClockPage() {
  const [showTime, setShowTime] = useState(true);
  const { time, color, colorMode, setColorMode } = useColorClock();
  const isLightBg = isColorLight(color);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative transition-colors duration-700"
      style={{ backgroundColor: color }}
    >
      {/* Main content with time and color display */}
      <div className="text-white space-y-4">
        <div className="h-[130px] sm:h-[160px] md:h-[200px] lg:h-[240px] xl:h-[280px] relative flex items-center justify-center">
          <div
            className={`absolute transition-all duration-500 ease-in-out transform ${
              showTime ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <h1
              className={`font-mono text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-wider text-center transition-colors duration-700 ${isLightBg ? "text-black" : "text-white"}`}
            >
              {time}
            </h1>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out transform ${
              showTime
                ? "translate-y-[37px] sm:translate-y-[46px] md:translate-y-[57px] lg:translate-y-[69px] xl:translate-y-[80px] scale-30"
                : "translate-y-0 scale-100"
            }`}
          >
            <h1
              className={`font-mono text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-bold tracking-wider text-center transition-colors duration-700 ${!showTime ? "" : "opacity-80"} ${isLightBg ? "text-black" : "text-white"}`}
            >
              {color}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreciseColorClockPage;
