import _ from 'lodash';
import {getMatchDetails} from '../api';
import Winner from '../constants/winner';
import Team from './team';

/**
 * Contains the logic to retrieve and store information associated with a match
 *
 * @param {Number} matchId The id of the match we want to retrieve
 * @param {Array} players <INSERT_DOCUMENTATION_HERE>
 */
var Match = function (matchId, players) {
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
    const MAX_RETRIES = 3;

    getMatchDetails(this.id).then(response => {
        const result = response.body.result;
        let pickBans;

        this.winner = this._getWinner(result);

        /**
         * TODO fix this nasty hack
         * we need to find a better way to determine who is radiant and dire.
         * this is here because sometimes the api does not contain the hero_id.
         * i put the check out here because i'm lazy and it's late.
         */
        if (!result.picks_bans || !this.players[0].hero_id) {
            // check why some matches don't have picks_bans
            // 1509053112 is an example
            this.radiant = {};
            this.dire = {};
        } else {
            pickBans = this._getPicksAndBans(this.players, result.picks_bans);
            this.radiant = new Team(result.radiant_team_id, result.radiant_name, pickBans.radiant);
            this.dire = new Team(result.dire_team_id, result.dire_name, pickBans.dire);
        }
    }).catch(error => {
        // this should be moved to the api layer.
        // but, until i get time to write a proper api layer,
        // it's too messy to move in.
        console.log(`Error fetching match ${this.id}: status code: ${error.statusCode} message: ${error.statusMessage}`);

        if (this.retries < MAX_RETRIES) {
            this.retries++;
            this._getMatchDetails();
        } else {
            throw new Error('Max number of retries made for match id ' + this.id);
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
    let radiantHeroId = players[0].hero_id;
    let radiantTeamId = _.filter(picksAndBans, { hero_id: radiantHeroId })[0].team;
    let radiantPicksBans = _.filter(picksAndBans, { team: radiantTeamId });
    let direPicksBans = _.filter(picksAndBans, { team: ~~!radiantTeamId });

    return {
        radiant: radiantPicksBans,
        dire: direPicksBans
    };
};

module.exports = Match;
