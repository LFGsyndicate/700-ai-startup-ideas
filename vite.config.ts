
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const base = isProduction ? '/700-ai-startup-ideas/' : '/';

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
