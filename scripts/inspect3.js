var fs = require('fs');
var html = fs.readFileSync('/tmp/zetterburn.html', 'utf8');

// Find the "Down Tilt" section and print surrounding HTML
var idx = html.indexOf('Down Tilt');
if (idx === -1) { console.log('Not found'); process.exit(); }

// Print 3000 chars around it
var start = Math.max(0, idx - 200);
var end = Math.min(html.length, idx + 3000);
console.log(html.substring(start, end));
