import {getLeagueMatches} from '../api';
import Match from './match.js';

/**
 * Contains the logic to retrieve and store information associated with a league
 *
 * @param {Number} leagueId The id of the league we want to retrieve.
 */
var League = function(leagueId) {
    this.id = leagueId;
    this.matches = [];
    this.totalMatches = -1;

    // TODO: we have to check that there are no "remaining_matches"
    getLeagueMatches(leagueId).then(response => {
        const result = response.body.result;
        const rawMatches = result.matches;

        this.totalMatches = rawMatches.length;

        rawMatches.forEach(rawMatch => {
            const id = rawMatch.match_id;
            const players = rawMatch.players;
            const match = new Match(id, players);

            this.matches.push(match);
        });
    });
};

League.prototype.isDoneUpdating = function() {
    let updatedMatches = 0;

    // make sure that we have completed the request to get all of the matches
    if (this.totalMatches > 0) {
        // make sure we have all of the matches
        if (this.matches.length === this.totalMatches) {
            this.matches.forEach(match => {
                if (match.radiant && match.dire) {
                    updatedMatches++;
                } else {
                    /* eslint-disable no-console */
                    console.log(match.id);
                    /* eslint-enable no-console */
                }
            });
        }
    }

    if (updatedMatches === this.totalMatches) {
        /* eslint-disable no-console */
        console.log('completed ' + updatedMatches + ' out of ' + this.totalMatches);
        /* eslint-enable no-console */

        return true;
    }

    /* eslint-disable no-console */
    console.log('completed ' + updatedMatches + ' out of ' + this.totalMatches);
    /* eslint-enable no-console */
    return false;
};

League.prototype.serialize = function() {
    let matches = [];

    this.matches.forEach(match => {
        matches.push(match.serialize());
    });

    return {
        id: this.id,
        matches: matches
    };
};

module.exports = League;
