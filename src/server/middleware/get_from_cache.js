/**
 * Checks the cache for the given tournament
 */
module.exports = function(tournamentName) {
    try {
        var tournament = require('../cache/' + tournamentName + '.json');
        return tournament;
    } catch (e) {
        // we don't want to throw if the tournament is not in the cache
        return null;
    }
};
