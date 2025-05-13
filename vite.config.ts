
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Import componentTagger directly for development mode
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const base = process.env.BASE_URL || '/700-ai-startup-ideas/';

  return {
    base: base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
