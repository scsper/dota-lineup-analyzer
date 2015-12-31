import Fluxxor from 'fluxxor';
import {League, DisplayTypes} from '../constants/dota';
import LineupCollection from './collections/lineup';
import MatchCollection from './collections/match';
import PatchCollection from './collections/patch';

const DotaStore = Fluxxor.createStore({
    initialize({patchToLeagues, tournamentsForCurrentPatch, currentPatch, leagueIdsToLeagueNames}) {
        this.bindActions(
            League.FETCH_SUCCEEDED, this.handleLeagueSuccess
        );

        this.lineupCollection = new LineupCollection();
        this.patchCollection = new PatchCollection(patchToLeagues);
        this.matchCollection = new MatchCollection();
        this.currentPatch = currentPatch;
        this.patchIdsToLeagueIds = patchToLeagues;
        this.leagueIdsToLeagueNames = leagueIdsToLeagueNames;
        this.patchReleaseDates = {
            '6.86': 1450252800 // December 16, 2015 at midnight PST
        };

        this.handleLeagueSuccess(tournamentsForCurrentPatch, currentPatch);
    },

    /**
     * @param {Object} tournaments An object with the form:
     * {
     *   <leagueId>: {
     *     id: <leagueId>
     *     matches: [<match>]
     *   }
     * }
     * @param {String} patch The patch id, e.g. '6.85b'
     */
    handleLeagueSuccess(tournaments, patch) {
        Object.keys(tournaments).forEach(leagueId => {
            let matches = tournaments[leagueId].matches;

            matches.forEach(match => {
                // TODO: Check for the startTime being greater than the next patch.  If it is greater than the next
                // patch, then we don't want to include it.
                if (match.startTime < this.patchReleaseDates[patch]) {
                    return;
                }

                if (match.radiant.picks) {
                    this.lineupCollection.add(match.radiant.picks, match.id, leagueId, patch);
                }

                if (match.dire.picks) {
                    this.lineupCollection.add(match.dire.picks, match.id, leagueId, patch);
                }

                this.matchCollection.add(match);
            });
        });
    },

    getLineupCombinations(id, heroLength, displayType) {
        let sortedCombinationsWithHeroNames = [];
        let sortedCombinations = new LineupCollection();

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

            //debug winrate
            //console.log(this.getWinrate(combo));
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

    getWinrate(combination) {   
        let winCounter = 0;
        let matchCounter = 0;

        const matches = this.getMatches(combination.matches);

        //just need id of one hero, if one hero is there then whole combo too
        const targetHeroId = combination.heroIds[0];
        
        //tally up the wins
        matches.forEach(match => {
            matchCounter++;

            //check if combo appears on radi or dire, assume radi
            let radiOrDire = 1;
            for(let i=0; i<match.dire.picks.length; i++) {
                if(targetHeroId == match.dire.picks[i].hero_id) {
                    radiOrDire = 2;
                    break;
                }
            }

            //if concordant team won, increment win counter
            if(radiOrDire == match.winner) {
                winCounter++;
            }
        });

        //calculate winrate as #wins/#matches
        return winCounter/matchCounter;
    }
});

export default DotaStore;
