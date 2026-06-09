import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const res = await fetch('https://dragdown.wiki/wiki/Zetterburn', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
});
const html = await res.text();
const $ = cheerio.load(html);

$('.mw-heading3').each(function(_, h) {
  const name = $(h).find('h3').text().trim();
  if (!name.includes('Neutral Special')) return;

  const container = $(h).nextAll('.attack-container').first();
  const nerds = container.find('[data-expandtext]').first();
  console.log('move:', name, '| nerds section found:', nerds.length > 0);

  // List all tabber panels in nerds section
  nerds.find('.tabber__panel').each(function(_, el) {
    const id = $(el).attr('id') || '(no id)';
    const n = $(el).find('.tumble-cell').length;
    console.log('  panel id:', id, '| tumble-cells:', n);
  });

  // List hitbox rows
  const hTable = container.find('table').filter(function(_, t) {
    return $(t).find('th').toArray().some(th => $(th).text().includes('Shield'));
  }).first();
  console.log('  hitbox table found:', hTable.length > 0);
  hTable.find('tbody tr').each(function(_, row) {
    const c = $(row).find('td').map(function(_, td) {
      return $(td).clone().find('.tooltiptext').remove().end().text().trim();
    }).toArray();
    if (c[0]) console.log('  hitbox row[0]:', c[0]);
  });
});
