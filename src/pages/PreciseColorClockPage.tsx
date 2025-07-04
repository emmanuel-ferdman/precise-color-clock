import { useState } from "react";

import { RiFullscreenLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { COLOR_MODES } from "@/config/color-modes";
import { useColorClock } from "@/hooks/use-color-clock";
import { useInactivityTimer } from "@/hooks/use-inactivity-timer";
import { ColorMode } from "@/types/color";
import { toggleFullscreen } from "@/utils/browser-utils";
import { isColorLight } from "@/utils/color-utils";

function PreciseColorClockPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showControls] = useInactivityTimer();
  const [showTime, setShowTime] = useState(true);
  const { time, color, colorMode, setColorMode } = useColorClock();
  const isLightBg = isColorLight(color);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative transition-colors duration-700"
      style={{ backgroundColor: color }}
    >
      {/* Set of controlers */}
      <div
        className={`fixed top-4 right-4 flex gap-2 transition-opacity duration-300 ${
          showControls || dropdownOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Toggle show time button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowTime(!showTime)}
          className="font-mono"
          aria-label={showTime ? "Hide time" : "Show time"}
        >
          {showTime ? <RiEyeLine className="h-4 w-4" /> : <RiEyeOffLine className="h-4 w-4" />}
        </Button>

        {/* Dropdown menu for color mode */}
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="font-mono" aria-label="Select color mode">
              {colorMode.toUpperCase()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.entries(COLOR_MODES).map(([name, mode]) => (
              <DropdownMenuItem
                key={name}
                onClick={() => setColorMode(name as ColorMode)}
                className={`font-mono ${colorMode === name ? "bg-accent text-accent-foreground font-bold" : ""}`}
                aria-label={`Set color mode to ${mode.label}`}
              >
                {mode.label}
                {colorMode === name && <span className="ml-2">✔</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Fullscreen toggle button */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullscreen}
          aria-label="Enter fullscreen"
        >
          <RiFullscreenLine className="h-4 w-4" />
        </Button>
      </div>

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
