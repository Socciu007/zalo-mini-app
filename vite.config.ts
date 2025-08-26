import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: "./",
    base: "",
    plugins: [tsconfigPaths(), react()],
    build: {
      target: "esnext",
      outDir: "dist",
      rollupOptions: {
        output: {
          manualChunks(id) {
            return id.includes("node_modules") ? "vendor" : undefined;
          }
        }
      },
      chunkSizeWarningLimit: 1000
    }
  });
};