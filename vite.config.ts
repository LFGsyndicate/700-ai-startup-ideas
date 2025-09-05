
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const isVercel = process.env.VERCEL === '1';
  const base = isVercel ? '/' : (process.env.BASE_URL || '/');

  return {
    base: base,
    server: {
      host: true, // слушать на 0.0.0.0 для Windows
      port: 5173,
    },
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
