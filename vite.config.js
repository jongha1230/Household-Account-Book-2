import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["@tanstack/react-query", "@tanstack/react-query-devtools"],
    },
  },
  resolve: {
    alias: {
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@redux": fileURLToPath(new URL("./src/redux", import.meta.url)),
    },
  },
});
