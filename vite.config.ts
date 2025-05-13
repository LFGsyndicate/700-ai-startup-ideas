
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// УДАЛИТЕ статический импорт: import componentTagger from "lovable-tagger";

export default defineConfig(async ({ mode }) => { // Обратите внимание: функция теперь async
  const isProduction = mode === 'production';
  const base = process.env.BASE_URL || '/700-ai-startup-ideas/';

  const plugins = [
    react(),
  ];

  // Условно и динамически импортируем lovable-tagger только в режиме разработки
  if (!isProduction) {
    try {
      // Динамически импортируем модуль
      const lovableTaggerModule = await import("lovable-tagger");
      // Получаем экспорт по умолчанию (это функция плагина)
      const componentTagger = lovableTaggerModule.default;

      if (typeof componentTagger === 'function') {
        plugins.push(componentTagger()); // Вызываем функцию, чтобы получить экземпляр плагина
      } else {
        console.warn("lovable-tagger был импортирован, но не предоставил функцию экспорта по умолчанию.");
      }
    } catch (error) {
      console.warn("Не удалось загрузить lovable-tagger для разработки. Продолжаем без него.", error);
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
