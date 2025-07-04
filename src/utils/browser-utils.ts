/**
 * Checks if the browser is currently in fullscreen mode.
 *
 * @returns True if in fullscreen mode, false otherwise.
 */
export const isFullscreen = (): boolean => {
  return !!document.fullscreenElement;
};

/**
 * Toggles fullscreen mode for the document.
 * Enters fullscreen if not already in fullscreen, exits if currently in fullscreen.
 */
export const toggleFullscreen = (): void => {
  if (!isFullscreen()) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.warn("Could not enter fullscreen mode:", err);
    });
  } else {
    document.exitFullscreen().catch((err) => {
      console.warn("Could not exit fullscreen mode:", err);
    });
  }
};
