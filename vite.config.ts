// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import componentTagger from "lovable-tagger"; // Ваш кастомный плагин

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  // Для GitHub Pages base должен быть именем вашего репозитория
  // Если вы используете GitHub Actions, можно передавать это как переменную окружения
  const base = process.env.BASE_URL || (isProduction ? '/700-ai-startup-ideas/' : '/');

  return {
    base: base, // <--- ВАЖНО!
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      !isProduction && componentTagger(), // Плагин только для разработки
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
