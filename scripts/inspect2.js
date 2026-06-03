var cheerio = require('cheerio');
var fs = require('fs');
var html = fs.readFileSync('/tmp/zetterburn.html', 'utf8');
var $ = cheerio.load(html);

// Find all tables with Shield Safety and their nearest preceding h3
var count = 0;
$('table').each(function(i, tbl) {
  var headers = $(tbl).find('th').map(function(_, th) { return $(th).text().trim(); }).toArray();
  if (headers.some(function(h) { return h.includes('Shield Safety'); })) {
    count++;
    var prevH3 = $(tbl).prevAll('h3').first().text().trim();
    var rows = $(tbl).find('tbody tr').length;
    // Print first row cells
    var firstRow = $(tbl).find('tbody tr').first().find('td').map(function(_, td) { return $(td).text().trim().substring(0, 30); }).toArray();
    console.log('Move: ' + prevH3 + ' | rows: ' + rows + ' | first row: ' + firstRow.join(' | '));
  }
});
console.log('Total Shield Safety tables:', count);

// Also check the DOM structure around a specific h3
console.log('\n=== DOM around "Down Tilt" h3 ===');
var dtH3 = $('h3').filter(function(_, el) { return $(el).text().trim() === 'Down Tilt'; }).first();
if (dtH3.length) {
  // Get next siblings until next h3
  var el = dtH3[0].next;
  var count2 = 0;
  while (el && count2 < 20) {
    if (el.type === 'tag') {
      console.log(el.name + ' class="' + (el.attribs.class || '') + '"');
    }
    el = el.next;
    count2++;
  }
}
