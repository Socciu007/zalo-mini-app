// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "./",
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].module.js",
        chunkFileNames: "assets/[name].[hash].module.js",
      },
    },
  },
});