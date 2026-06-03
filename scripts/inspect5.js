var cheerio = require('cheerio');
var fs = require('fs');
var html = fs.readFileSync('/tmp/zetterburn.html', 'utf8');
var $ = cheerio.load(html);

// Look inside the attack-container for Down Tilt
var downTiltH3 = $('.mw-heading3').filter(function(_, el) {
  return $(el).text().trim() === 'Down Tilt';
}).first();

var container = downTiltH3.nextAll('.attack-container').first();
console.log('attack-container found:', container.length > 0);

// List all tables inside
container.find('table').each(function(i, tbl) {
  var headers = $(tbl).find('th').map(function(_, th) { return $(th).text().trim().substring(0, 30); }).toArray();
  console.log('\nTable #' + i + ' headers:', headers.join(' | '));
  $(tbl).find('tbody tr').each(function(j, row) {
    var cells = $(row).find('td').map(function(_, td) { return $(td).text().trim().substring(0, 30); }).toArray();
    console.log('  row ' + j + ':', cells.join(' | '));
  });
});

// Check for "nerds" / stats sections
console.log('\n=== Details/collapsible elements ===');
container.find('details, [class*="nerd"], [class*="collapse"], [class*="expand"]').each(function(i, el) {
  console.log(i, el.name, 'class:', (el.attribs.class || '').substring(0, 60));
  console.log('  text preview:', $(el).text().trim().substring(0, 100));
});
