import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/PixelFolio/",

  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (
            id.includes("@react-three/fiber") ||
            id.includes("@react-three/drei")
          ) {
            return "r3f-drei";
          }
          if (id.includes("three")) {
            return "three-core";
          }
          if (id.includes("react") || id.includes("scheduler")) {
            return "react-vendor";
          }
          return "vendor";
        },
      },
    },
  },
});
