import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS class names conditionally.
 * Uses `clsx` for conditional logic and `tailwind-merge` to resolve conflicts.
 *
 * @param inputs - Any number of class values (strings, arrays, objects).
 * @returns A single merged className string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
