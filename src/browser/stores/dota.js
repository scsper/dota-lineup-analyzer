import Fluxxor from 'fluxxor';
import {League, DisplayTypes} from '../constants/dota';
import LineupCollection from './collections/lineup';
import MatchCollection from './collections/match';
import PatchCollection from './collections/patch';

const DotaStore = Fluxxor.createStore({
    initialize({patchToLeagues, tournamentsForCurrentPatch, currentPatch, leagueIdsToLeagueNames}) {
        this.bindActions(
            League.FETCH_SUCCEEDED, this.handleLeagueSuccess,
            League.FETCH_EXISTS, this.handleLeagueExists
        );

        this.lineupCollection = new LineupCollection();
        this.patchCollection = new PatchCollection(patchToLeagues);
        this.matchCollection = new MatchCollection();
        this.currentPatch = currentPatch;
        this.patchIdsToLeagueIds = patchToLeagues;
        this.leagueIdsToLeagueNames = leagueIdsToLeagueNames;
        this.patchReleaseDates = {
            '6.85b': {
                time: 1443164400, // September 25, 2015 at midnight PST
                nextPatch: '6.86'
            },
            '6.86': {
                time: 1450252800, // December 16, 2015 at midnight PST
                nextPatch: ''
            }
        };

        this._normalizeLeagues(tournamentsForCurrentPatch, currentPatch);
    },

    /**
     * @param {Object} leagues An object with the form:
     * {
     *   <leagueId>: {
     *     id: <leagueId>
     *     matches: [<match>]
     *   }
     * }
     * @param {String} patch The patch id, e.g. '6.85b'
     */
    _normalizeLeagues(leagues, patch) {
        Object.keys(leagues).forEach(leagueId => {
            const matches = leagues[leagueId].matches;

            matches.forEach(match => {
                // TODO: Check for the startTime being greater than the next patch.  If it is greater than the next
                // patch, then we don't want to include it.
                if (!this._isMatchPlayedInPatch(match, patch)) {
                    return;
                }

                if (match.radiant.picks) {
                    this.lineupCollection.add(match.radiant.picks, match.id, leagueId, patch);
                }

                if (match.dire.picks) {
                    this.lineupCollection.add(match.dire.picks, match.id, leagueId, patch);
                }

                this.matchCollection.add(match, leagueId);
            });
        });
    },

    /**
     * Returns whether the match was played within a certain patch time or not.
     * Certain tournaments (especially online ones) span multiple patches.  So, we need to check on a match
     * level whether or not it was played in a certain patch.
     *
     * @param {Object} match The match in question
     * @param {String} patch The patch tested against
     *
     * @return {Boolean} TRUE if it was played in the patch, FALSE if not.
     */
    _isMatchPlayedInPatch(match, patch) {
        let nextPatch = this.patchReleaseDates[patch].nextPatch;

        if (nextPatch === '') {
            return match.startTime > this.patchReleaseDates[patch].time;
        }

        return match.startTime > this.patchReleaseDates[patch].time &&
            match.startTime < this.patchReleaseDates[nextPatch].time;
    },

    /**
     * @see _normalizeLeagues
     */
    handleLeagueSuccess({leagues, patch}) {
        if (!this.hasLineupsForPatch(patch)) {
            this._normalizeLeagues(leagues, patch);
        }

        this.emit('change');
    },

    handleLeagueExists() {
        this.emit('change');
    },

    getLineupCombinations(id, heroLength, displayType) {
        let sortedCombinationsWithHeroNames = [];
        let sortedCombinations;

        if (displayType === DisplayTypes.LEAGUE) {
            sortedCombinations = this.lineupCollection.getForLeague(id, heroLength);
        } else if (displayType === DisplayTypes.PATCH) {
            sortedCombinations = this.lineupCollection.getForPatch(id, heroLength);
        } else {
            throw new Error('getLineupCombinations called with impromper argument (should have "league" or "patch")');
        }

        sortedCombinations.sort((a, b) => b.count - a.count);

        sortedCombinations.forEach(combo => {
            if (combo.count < 2) {
                return;
            }

            let matches = combo.matches.map(match => this.matchCollection.get(match));

            sortedCombinationsWithHeroNames.push({
                id: combo.id,
                lineup: combo.heroIds,
                count: combo.count,
                matches: matches
            });
        });

        return sortedCombinationsWithHeroNames;
    },

    getLineupCombinationsForLeague(leagueId, heroLength) {
        return this.getLineupCombinations(leagueId, heroLength, DisplayTypes.LEAGUE);
    },

    getLineupCombinationsForPatch(patchId, heroLength) {
        return this.getLineupCombinations(patchId, heroLength, DisplayTypes.PATCH);
    },

    getPatchList() {
        return this.patchCollection.getList();
    },

    getMatches(matchIds) {
        return matchIds.map(matchId => this.matchCollection.get(matchId));
    },

    getLeagues(patchId) {
        const leagueIds = this.patchIdsToLeagueIds[patchId];

        return leagueIds.map(id => this.leagueIdsToLeagueNames[id]);
    },

    getAllLeagues() {
        return this.leagueIdsToLeagueNames;
    },

    getWinrate(combination) {
        // just need id of one hero, if one hero is there then whole combo too
        const targetHeroId = combination.heroIds[0];
        const matches = this.getMatches(combination.matches);
        let winCounter = 0; // tally up the wins

        matches.forEach(match => {
            let comboFactionId = 0

            // check if combo appears on radi or dire
            if (match.radiant.picks.some(pick => targetHeroId === pick.hero_id)) {
                comboFactionId = 1;
            } else {
                comboFactionId = 2;
            }

            // if concordant team won, increment win counter
            if (comboFactionId === match.winner) {
                winCounter++;
            }
        });

        return winCounter / matches.length;
    },

    hasLineupsForPatch(patchId) {
        return this.lineupCollection.hasLineupsForPatch(patchId);
    }
});

export default DotaStore;
