import { useState, useEffect, useRef } from "react";

/**
 * Tracks user inactivity based on mouse movement and clicks.
 *
 * @param timeout Inactivity duration in ms (default: 2000).
 * @returns An object with isActive (boolean) and setIsActive (function).
 */
export function useInactivityTimer(timeout = 2000) {
  const [isActive, setIsActive] = useState(true);
  const lastInteractionRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize on mount (inside effect to avoid impure render)
    lastInteractionRef.current = Date.now();

    const handleInteraction = () => {
      setIsActive(true);
      lastInteractionRef.current = Date.now();
    };

    const timer = setInterval(() => {
      if (
        lastInteractionRef.current !== null &&
        Date.now() - lastInteractionRef.current > timeout
      ) {
        setIsActive(false);
      }
    }, 1000);

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("click", handleInteraction);

    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, [timeout]);

  return [isActive, setIsActive] as const;
}
