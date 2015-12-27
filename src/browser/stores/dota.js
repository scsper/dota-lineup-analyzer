import Fluxxor from 'fluxxor';
import {League} from '../constants/dota';
import LineupCollection from './collections/lineup';
import MatchCollection from './collections/match';
import PatchCollection from './collections/patch';

const DotaStore = Fluxxor.createStore({
    initialize({patchToLeagues, tournamentsForCurrentPatch, currentPatch}) {
        this.bindActions(
            League.FETCH_SUCCEEDED, this.handleLeagueSuccess
        );

        this.lineupCollection = new LineupCollection();
        this.patchCollection = new PatchCollection(patchToLeagues);
        this.matchCollection = new MatchCollection();
        this.currentPatch = currentPatch;

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

    getLineupCombinations(id, heroLength, leagueOrPatch) {
        let _this = this;

        let sortedCombinations = new LineupCollection();
        if (leagueOrPatch === "league") {
            sortedCombinations = this.lineupCollection.getForLeague(id, heroLength);            
        }
        else if (leagueOrPatch === "patch") {
            sortedCombinations = this.lineupCollection.getForPatch(id, heroLength)         
        }
        else {
            throw new Error('getLineupCombinations called with impromper argument (should have "league" or "patch")');
        }
	sortedCombinations.sort((a, b) => b.count - a.count);    

        let sortedCombinationsWithHeroNames = [];

        sortedCombinations.forEach(combo => {
            if (combo.count < 2) {
                return;
            }

            let matches = combo.matches.map(match => _this.matchCollection.get(match));

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
        return this.getLineupCombinations(leagueId, heroLength, "league");
    },

    getLineupCombinationsForPatch(patchId, heroLength) {
        return this.getLineupCombinations(patchId, heroLength, "patch");
    },

    getPatchList() {
        return this.patchCollection.getList();
    },

    getMatches(matchIds) {
        return matchIds.map(matchId => this.matchCollection.get(matchId));
    }
});

export default DotaStore;
