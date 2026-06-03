var cheerio = require('cheerio');
var fs = require('fs');
var html = fs.readFileSync('/tmp/zetterburn.html', 'utf8');
var $ = cheerio.load(html);

// The h3 is inside div.mw-heading.mw-heading3
// Let's find all .mw-heading3 and see what follows them
console.log('=== mw-heading3 divs ===');
$('.mw-heading3').slice(0, 5).each(function(i, el) {
  var moveName = $(el).text().trim();
  console.log('\nMove:', moveName);

  // Get all next siblings until next heading
  var next = $(el).next();
  var depth = 0;
  while (next.length && !next.hasClass('mw-heading') && depth < 10) {
    console.log('  sibling:', next[0].name, 'class:', (next.attr('class') || '').substring(0, 60));
    // Check if there's a table inside
    var tbl = next.find('table');
    if (tbl.length) {
      var headers = tbl.first().find('th').map(function(_, th) { return $(th).text().trim().substring(0, 20); }).toArray();
      console.log('    TABLE headers:', headers.join(' | '));
      var rows = tbl.first().find('tbody tr');
      console.log('    TABLE rows:', rows.length);
      if (rows.length > 0) {
        var cells = rows.first().find('td').map(function(_, td) { return $(td).text().trim().substring(0, 25); }).toArray();
        console.log('    First row:', cells.join(' | '));
      }
    }
    next = next.next();
    depth++;
  }
});
