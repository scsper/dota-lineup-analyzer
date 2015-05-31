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

    this.id = matchId;
    this.winner = Winner.UNKNOWN;
    this.radiant = null;
    this.dire = null;

    this.players = players;
    this.retries = 0;

    this._getMatchDetails();
};

Match.prototype.serialize = function() {
    return {
        id: this.id,
        winner: this.winner,
        radiant: this.radiant,
        dire: this.dire
    };
};

Match.prototype._getMatchDetails = function () {
    var _this = this,
        MAX_RETRIES = 3;

    API.getMatchDetails(_this.id).then(function (response) {
        var result = response.body.result,
            pickBans;

        _this.winner = _this._getWinner(result);

        if (!result.picks_bans) {
            // check why some matches don't have picks_bans
            // 1509053112 is an example
            _this.radiant = {};
            _this.dire = {};
        } else {
            pickBans = _this._getPicksAndBans(_this.players, result.picks_bans);
            _this.radiant = new Team(result.radiant_team_id, result.radiant_name, pickBans.radiant);
            _this.dire = new Team(result.dire_team_id, result.dire_name, pickBans.dire);
        }
    }).catch(function (error) {
        if (_this.retries < MAX_RETRIES) {
            _this.retries++;
            _this._getMatchDetails();
        } else {
            throw new Error('Max number of retries made for match id ' + _this.id);
        }
    });
};

Match.prototype._getWinner = function (result) {
    if (result.radiant_win) {
        return Winner.RADIANT;
    } else {
        return Winner.DIRE;
    }
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
