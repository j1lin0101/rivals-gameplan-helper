var cheerio = require('cheerio');
var fs = require('fs');
var html = fs.readFileSync('/tmp/zetterburn.html', 'utf8');
var $ = cheerio.load(html);

// Check startup table structure for a few moves
var moves = ['Jab', 'Up Strong', 'Grab', 'Up Special - Fire Lion', 'Neutral Air'];
moves.forEach(function(moveName) {
  var h3 = $('.mw-heading3').filter(function(_, el) {
    return $(el).text().trim() === moveName;
  }).first();
  if (!h3.length) { console.log(moveName + ': NOT FOUND'); return; }

  var container = h3.nextAll('.attack-container').first();
  var startupTable = container.find('table').first();
  var headers = startupTable.find('tr').first().find('th').map(function(_, th) {
    return $(th).clone().find('.tooltiptext').remove().end().text().trim();
  }).toArray();
  var rows = startupTable.find('tbody tr');
  var dataRow = rows.last().find('td').map(function(_, td) {
    return $(td).clone().find('.tooltiptext').remove().end().text().trim();
  }).toArray();

  console.log(moveName);
  console.log('  headers:', headers.join(' | '));
  console.log('  data:   ', dataRow.join(' | '));
});
