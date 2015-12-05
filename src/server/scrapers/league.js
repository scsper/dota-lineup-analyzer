import {getLeagueMatches} from '../api';
import Match from './match.js';

/**
 * Contains the logic to retrieve and store information associated with a league
 *
 * @param {Number} leagueId The id of the league we want to retrieve.
 */
var League = function (leagueId) {
    var _this = this;

    this.id = leagueId;
    this.matches = [];
    this.totalMatches = -1;

    // TODO: we have to check that there are no "remaining_matches"
    API.getLeagueMatches(leagueId).then(function (response) {
        var result = response.body.result,
            rawMatches = result.matches;

        _this.totalMatches = rawMatches.length;

        rawMatches.forEach(function (rawMatch) {
            var id = rawMatch.match_id,
                players = rawMatch.players
                match = new Match(id, players);

            _this.matches.push(match);
        });
    });
};

League.prototype.isDoneUpdating = function () {
    var updatedMatches = 0;

    // make sure that we have completed the request to get all of the matches
    if (this.totalMatches > 0) {
        // make sure we have all of the matches
        if (this.matches.length === this.totalMatches) {
            this.matches.forEach(function (match) {
                if (match.radiant && match.dire) {
                    updatedMatches++;
                } else {
                    console.log(match.id);
                }
            });
        }
    }

    if (updatedMatches === this.totalMatches) {
        console.log('completed ' + updatedMatches + ' out of ' + this.totalMatches);
        return true;
    }

    console.log('completed ' + updatedMatches + ' out of ' + this.totalMatches);
    return false;
};

League.prototype.serialize = function () {
    var matches = [];

    this.matches.forEach(function (match) {
        matches.push(match.serialize());
    });

    return {
        id: this.id,
        matches: matches
    };
};

module.exports = League;
