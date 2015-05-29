var _ = require('lodash'),
    API = require('../api'),
    Winner = require('../constants/winner.js'),
    Team = require('./team.js'),
    Match;
/**
 * Contains the logic to retrieve and store information associated with a match
 *
 * @param {Number} matchId The id of the match we want to retrieve
 * @param {Array} players <INSERT_DOCUMENTATION_HERE>
 */
Match = function (matchId, players) {
    var _this = this;

    this.winner = Winner.UNKNOWN;
    this.radiant = {};
    this.dire = {};

    API.getMatchDetails(matchId).then(function (response) {
        var result = response.body.result,
            pickBans = _this._getPicksAndBans(players, result.picks_bans);

        _this.radiant = new Team(result.radiant_team_id, result.radiant_name, pickBans.radiant);
        _this.dire = new Team(result.dire_team_id, result.dire_name, pickBans.dire);
    });
};

Match.prototype._getPicksAndBans = function (players, picksAndBans) {
    // radiant picks are the first five players
    var radiantHeroId = players[0].hero_id, // slice uses exclusive ranges
        radiantTeamId = _.filter(picksAndBans, { hero_id: radiantHeroId })[0].team,
        radiantPicksBans = _.filter(picksAndBans, { team: radiantTeamId }),
        direPicksBans = _.filter(picksAndBans, { team: ~~!radiantTeamId });

    return {
        radiant: radiantPicksBans,
        dire: direPicksBans
    };
};

module.exports = Match;
