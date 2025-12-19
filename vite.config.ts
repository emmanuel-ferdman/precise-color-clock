import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

import path from "path";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    tailwindcss(),
    react(),
    eslint({
      failOnError: false,
      failOnWarning: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          three: ["three"],
          icons: ["react-icons"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-slot"],
          utils: ["culori", "clsx", "tailwind-merge"],
        },
      },
    },
  },
}));
