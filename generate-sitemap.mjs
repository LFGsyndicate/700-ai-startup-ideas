import { writeFileSync, readFileSync } from 'fs';


const BASE_URL = 'https://lfgsyndicate.github.io/700-ai-startup-ideas';

function extractEnumValues(tsContent, enumName) {
  const start = tsContent.indexOf(`export enum ${enumName}`);
  if (start === -1) return [];
  const slice = tsContent.slice(start);
  const match = slice.match(/export\s+enum\s+\w+\s*\{([\s\S]*?)\}/);
  if (!match) return [];
  const body = match[1];
  // В TS enum со строковыми значениями используется '='
  const re = /=\s*"([^"]+)"/g;
  const values = [];
  let m;
  while ((m = re.exec(body))) values.push(m[1]);
  return values;
}

function generateSitemap() {
  const typesContent = readFileSync('src/types/index.ts', 'utf8');
  const archetypes = extractEnumValues(typesContent, 'AgentArchetype');
  const industries = extractEnumValues(typesContent, 'Industry');

  const urls = [
    { loc: `${BASE_URL}/`, changefreq: 'daily', priority: 1.0 },
    { loc: `${BASE_URL}/#/archetypes`, changefreq: 'weekly', priority: 0.8 },
    { loc: `${BASE_URL}/#/industries`, changefreq: 'weekly', priority: 0.8 },
  ];

  // Добавляем хэш-маршруты для SPA
  archetypes.forEach(archetype => {
    urls.push({ loc: `${BASE_URL}/#/archetypes/${encodeURIComponent(archetype)}`, changefreq: 'weekly', priority: 0.7 });
  });
  industries.forEach(industry => {
    urls.push({ loc: `${BASE_URL}/#/industries/${encodeURIComponent(industry)}`, changefreq: 'weekly', priority: 0.7 });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      url =>
        `  <url>\n    <loc>${url.loc}</loc>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`
    )
    .join('\n')}\n</urlset>\n`;

  writeFileSync('public/sitemap.xml', sitemap);
  console.log(`Sitemap создан: ${urls.length} URL`);
}

generateSitemap();
