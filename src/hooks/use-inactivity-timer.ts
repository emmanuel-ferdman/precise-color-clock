import { useState, useEffect } from "react";

/**
 * Tracks user inactivity based on mouse movement and clicks.
 *
 * @param timeout Inactivity duration in ms (default: 2000).
 * @returns An object with isActive (boolean) and setIsActive (function).
 */
export function useInactivityTimer(timeout = 2000) {
  const [isActive, setIsActive] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  useEffect(() => {
    const handleInteraction = () => {
      setIsActive(true);
      setLastInteraction(Date.now());
    };

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("click", handleInteraction);

    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() - lastInteraction > timeout) {
        setIsActive(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastInteraction, timeout]);

  return [isActive, setIsActive] as const;
}
