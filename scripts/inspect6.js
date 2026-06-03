var cheerio = require('cheerio');
var fs = require('fs');
var html = fs.readFileSync('/tmp/zetterburn.html', 'utf8');
var $ = cheerio.load(html);

// Inspect the per-character tumble collapsible for Down Tilt
var downTiltH3 = $('.mw-heading3').filter(function(_, el) {
  return $(el).text().trim() === 'Down Tilt';
}).first();

var container = downTiltH3.nextAll('.attack-container').first();
var nerds = container.find('.mw-collapsible').first();

console.log('Nerds collapsible HTML (first 3000 chars):');
console.log($.html(nerds).substring(0, 3000));
