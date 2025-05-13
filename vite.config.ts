
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
      // Dynamic import of the module with proper TypeScript handling
      const lovableTaggerModule = await import("lovable-tagger") as any;
      
      // Check if the module itself is a function or if it has a default export
      const taggerFunction = typeof lovableTaggerModule === 'function' 
        ? lovableTaggerModule 
        : lovableTaggerModule.default;
      
      // Add to plugins only if we found a valid function
      if (typeof taggerFunction === 'function') {
        plugins.push(taggerFunction());
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
