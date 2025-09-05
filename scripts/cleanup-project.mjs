import fs from 'fs';

// Список временных/служебных скриптов, которые можно удалить после импорта
const toDelete = [
  'parse-all-cases.js',
  'enhanced-parser.js',
  'verify-cases.js',
  'scripts/parse-cases.mjs',
  'scripts/add-all-cases-validated.mjs',
  'scripts/enhance-links.mjs',
  'scripts/merge-missing-links.mjs'
];

for (const p of toDelete) {
  if (fs.existsSync(p)) {
    try {
      fs.rmSync(p, { force: true });
      console.log(`Удалён: ${p}`);
    } catch (e) {
      console.warn(`Не удалось удалить ${p}:`, e.message);
    }
  }
}

console.log('Очистка завершена. Проверьте, что функционал не затронут.');



