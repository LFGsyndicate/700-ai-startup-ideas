
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(async ({ mode }) => {
  const isProduction = mode === 'production';
  const base = process.env.BASE_URL || '/700-ai-startup-ideas/';

  const plugins = [
    react(),
  ];

  // Conditionally import lovable-tagger only in development mode
  if (!isProduction) {
    try {
      // Dynamic import of the module
      const lovableTaggerModule = await import("lovable-tagger");
      // Check what's actually available in the module
      const componentTagger = lovableTaggerModule.default || lovableTaggerModule;
      
      // If it's a function, add it to plugins
      if (typeof componentTagger === 'function') {
        plugins.push(componentTagger());
      } else {
        console.warn("lovable-tagger was imported but did not provide a usable plugin function.");
      }
    } catch (error) {
      console.warn("Failed to load lovable-tagger for development. Continuing without it.", error);
    }
  }

  return {
    base: base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
