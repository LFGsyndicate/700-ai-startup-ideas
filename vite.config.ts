// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import componentTagger from "lovable-tagger"; // Ваш кастомный плагин

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  // Для GitHub Pages base должен быть именем вашего репозитория.
  // Мы передадим это через BASE_URL в GitHub Actions.
  const base = process.env.BASE_URL || (isProduction ? '/700-ai-startup-ideas/' : '/');

  return {
    base: base, // <--- КРИТИЧЕСКИ ВАЖНО!
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      // Если componentTagger - это плагин только для разработки,
      // лучше включать его условно, чтобы он не влиял на продакшн сборку.
      // Если он нужен и в проде, уберите `!isProduction &&`.
      !isProduction && componentTagger(),
    ].filter(Boolean), // Удаляет falsey значения из массива плагинов (если componentTagger не включен)
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Опционально, если вы хотите, чтобы папка сборки называлась 'docs'
    // (некоторые предпочитают для GitHub Pages, но с Actions это не обязательно)
    // build: {
    //   outDir: 'docs'
    // }
  };
});
