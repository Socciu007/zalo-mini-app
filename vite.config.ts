// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import zaloMiniApp from 'zmp-vite-plugin';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), zaloMiniApp()],
  base: "./",
  build: {
    manifest: true,
    outDir: "www",
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].module.js",
        chunkFileNames: "assets/[name].[hash].module.js",
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});