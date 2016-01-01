/**
 * Checks the cache for the given tournament
 */
export function getFromCache(tournamentName) {
    try {
        // accessing this from compiled/
        const tournament = require('../../src/server/cache/' + tournamentName + '.json');

        return tournament;
    } catch (e) {
        // we don't want to throw if the tournament is not in the cache
        return null;
    }
};
