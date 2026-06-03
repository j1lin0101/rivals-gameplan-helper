var cheerio = require('cheerio');
var fs = require('fs');
var html = fs.readFileSync('/tmp/zetterburn.html', 'utf8');
var $ = cheerio.load(html);

// Check the Grab heading structure
var grabH3 = $('.mw-heading3').filter(function(_, el) {
  return $(el).text().trim() === 'Grab';
}).first();

console.log('Grab h3 found:', grabH3.length > 0);
if (grabH3.length) {
  var container = grabH3.nextAll('.attack-container').first();
  console.log('attack-container found:', container.length > 0);
  container.find('table').each(function(i, tbl) {
    var headers = $(tbl).find('tr').first().find('th').map(function(_, th) {
      return $(th).clone().find('.tooltiptext').remove().end().text().trim().substring(0, 25);
    }).toArray();
    var dataRow = $(tbl).find('tbody tr').last().find('td').map(function(_, td) {
      return $(td).clone().find('.tooltiptext').remove().end().text().trim().substring(0, 20);
    }).toArray();
    console.log('Table #' + i + ' headers:', headers.join(' | '));
    console.log('  data:', dataRow.join(' | '));
  });
}
