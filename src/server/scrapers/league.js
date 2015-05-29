var API = require('../api'),
    Match = require('./match.js'),
    League;

/**
 * Contains the logic to retrieve and store information associated with a league
 *
 * @param {Number} leagueId The id of the league we want to retrieve.
 */
League = function (leagueId) {
    var _this = this;

    this.matches = [];

    API.getLeagueMatches(leagueId).then(function (response) {
        var result = response.body.result,
            rawMatches = result.matches;

        rawMatches.forEach(function (rawMatch) {
            var id = rawMatch.match_id,
                players = rawMatch.players,
                match = new Match(id, players);

            _this.matches.push(match);
        });
    });
};

module.exports = League;
