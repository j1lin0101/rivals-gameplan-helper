const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('/tmp/zetterburn.html', 'utf8');
const $ = cheerio.load(html);

console.log('=== h2 headings ===');
$('h2').each(function(i, el) { console.log(i, $(el).text().trim().substring(0, 80)); });

console.log('\n=== h3 headings (first 30) ===');
$('h3').slice(0, 30).each(function(i, el) { console.log(i, $(el).text().trim().substring(0, 80)); });

console.log('\n=== Tables with Shield Safety header ===');
var count = 0;
$('table').each(function(i, tbl) {
  var headers = $(tbl).find('th').map(function(_, th) { return $(th).text().trim(); }).toArray();
  if (headers.some(function(h) { return h.includes('Shield Safety'); })) {
    count++;
    var prevH = $(tbl).prevAll('h2,h3,h4').first().text().trim();
    console.log('Table #' + i + ' | prev heading: ' + prevH + ' | headers: ' + headers.join(' | '));
  }
});
console.log('Total tables with Shield Safety:', count);
