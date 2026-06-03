var analysis = require('../src/analysis.js');
var fs = require('fs');
var path = require('path');

function loadChar(slug) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/characters/' + slug + '.json'), 'utf8'));
}

var zetter  = loadChar('Zetterburn');
var clairen = loadChar('Clairen');

// 1. Safest options for Zetterburn
console.log('=== Zetterburn Safest Options on Shield ===');
analysis.getSafestOptions(zetter).forEach(function(e) {
  console.log('  ' + e.move + ' [' + e.hitbox + ']: ' + e.shieldRaw);
});

// 2. Zetterburn OOS options (top 5)
console.log('\n=== Zetterburn Best OOS Options (top 5) ===');
analysis.getOOSOptions(zetter).slice(0, 5).forEach(function(e) {
  console.log('  ' + e.move + ': startup=' + e.startup + ', OOS=' + e.oosStartup + 'f');
});

// 3. Full matchup: Clairen attacks, Zetterburn defends
console.log('\n=== Matchup: Clairen attacking vs Zetterburn on shield ===');
var matchup = analysis.analyzeMatchup(clairen, zetter);
console.log('Shield release frames:', matchup.shieldRelease);

var safe = matchup.breakdown.filter(function(r) { return r.isSafe; });
var risky = matchup.breakdown.filter(function(r) { return r.isRisky; });
var punishable = matchup.breakdown.filter(function(r) { return r.isPunishable; });

console.log('\nSafe on shield (' + safe.length + '):');
safe.forEach(function(r) { console.log('  ' + r.move + ' [' + r.hitbox + ']: ' + r.shieldRaw); });

console.log('\nRisky (' + risky.length + '):');
risky.forEach(function(r) { console.log('  ' + r.move + ' [' + r.hitbox + ']: ' + r.shieldRaw); });

console.log('\nPunishable (' + punishable.length + ') — sample with punishes:');
punishable.slice(0, 5).forEach(function(r) {
  var punishNames = r.punishes.map(function(p) { return p.move + '(' + p.oosStartup + 'f)'; }).join(', ');
  console.log('  ' + r.move + ' [' + r.hitbox + '] ' + r.shieldRaw
    + ' → punishes: ' + (punishNames || 'none'));
});

// 4. Tumble % for Down Tilt vs Zetterburn
console.log('\n=== Clairen Down Tilt tumble % vs Zetterburn ===');
var dt = clairen.moves.find(function(m) { return m.move === 'Down Tilt'; });
if (dt) {
  dt.hitboxes.forEach(function(h) {
    var pct = analysis.getTumbleVsOpponent(h, 'Zetterburn');
    console.log('  ' + h.hitbox + ': tumble vs Zetterburn = ' + pct + '%');
  });
}
