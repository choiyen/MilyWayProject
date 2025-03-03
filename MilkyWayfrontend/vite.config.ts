import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  server: {
    port: 8080,
    host: "localhost",
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)), // @ alias 설정
    },
  },
});
