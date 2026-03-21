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
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "vendor", test: /node_modules[\\/]react(-dom)?[\\/]/, priority: 20 },
            { name: "three", test: /node_modules[\\/]three[\\/]/, priority: 15 },
            { name: "icons", test: /node_modules[\\/]react-icons[\\/]/, priority: 15 },
            { name: "ui", test: /node_modules[\\/]@radix-ui[\\/]/, priority: 15 },
            {
              name: "utils",
              test: /node_modules[\\/](culori|clsx|tailwind-merge)[\\/]/,
              priority: 15,
            },
          ],
        },
      },
    },
  },
}));
