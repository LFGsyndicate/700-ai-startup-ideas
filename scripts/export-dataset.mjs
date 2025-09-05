import fs from 'fs';

const types = fs.readFileSync('src/types/index.ts', 'utf8');
const data = fs.readFileSync('src/lib/knowledge-parser.ts', 'utf8');

function extractIdeas(ts) {
  const lines = ts.split(/\r?\n/);
  const results = [];
  for (const line of lines) {
    if (!line.includes('addSampleIdeas(')) continue;
    const m = line.match(/addSampleIdeas\(allIdeas,\s*"([^"]+)",\s*"([^"]*)",\s*(AgentArchetype\.[A-Za-z]+),\s*(Industry\.[A-Za-z]+),\s*"([^"]+)"/);
    if (!m) continue;
    results.push({
      company: m[1],
      description: m[2],
      archetype: m[3].replace('AgentArchetype.', ''),
      industry: m[4].replace('Industry.', ''),
      link: m[5]
    });
  }
  return results;
}

const ideas = extractIdeas(data);
fs.writeFileSync('public/dataset.json', JSON.stringify({ ideas }, null, 2));
const csv = ['company,description,archetype,industry,link', ...ideas.map(i => {
  const safe = (s) => '"' + String(s).replace(/"/g, '""') + '"';
  return [safe(i.company), safe(i.description), i.archetype, i.industry, i.link].join(',');
})].join('\n');
fs.writeFileSync('public/dataset.csv', csv);
console.log(`Экспортировано идей: ${ideas.length}`);


