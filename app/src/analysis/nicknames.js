/**
 * Move nicknames by character.
 * Key: character name (matches data file)
 * Value: object mapping move name → nickname
 *
 * Add entries here as needed throughout development.
 */
const NICKNAMES = {
  'Zetterburn': {
    'Neutral Special - Fire Pulse': 'Shine',
  },
};

/**
 * Returns the nickname for a move, or falls back to the original move name.
 */
function getNickname(characterName, moveName) {
  const charNicks = NICKNAMES[characterName];
  if (charNicks && charNicks[moveName]) return charNicks[moveName];
  return moveName;
}

/**
 * Returns the display name for a move:
 *   1. Nickname if one exists
 *   2. Otherwise strip " - Subtitle" from specials (e.g. "Neutral Special - Fire Pulse" → "Neutral Special")
 */
function getDisplayName(characterName, moveName) {
  const charNicks = NICKNAMES[characterName];
  if (charNicks && charNicks[moveName]) return charNicks[moveName];
  // Strip subtitle from direction + Special/Strong/Air moves
  return moveName.replace(/\s*-\s*.+$/, '');
}

export { NICKNAMES, getNickname, getDisplayName };
