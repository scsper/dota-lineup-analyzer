import Fluxxor from 'fluxxor';
import {League} from '../constants/dota';
import HeroCollection from './collections/hero';
import LineupCollection from './collections/lineup';
import PatchCollection from './collections/patch';

const DotaStore = Fluxxor.createStore({
    initialize({heroes, patchToLeagues}) {
        this.bindActions(
            League.FETCH_SUCCEEDED, this.handleLeagueSuccess
        );

        this.heroCollection = new HeroCollection(heroes);
        this.lineupCollection = new LineupCollection();
        this.patchCollection = new PatchCollection(patchToLeagues);
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
            });
        });

        // this.getLineupCombinationsForLeague(2922, 5);
        // console.log('entering league');
        // this.getLineupCombinationsForLeague(2922, 4);
        // this.getLineupCombinationsForLeague(2922, 3);
        this.getLineupCombinationsForLeague(4088, 5);
    },

    getLineupCombinationsForLeague(leagueId, heroLength) {
        let _this = this;
        let sortedCombinations = this.lineupCollection.getForLeague(leagueId, heroLength)
            .sort((a, b) => b.count - a.count);

        sortedCombinations.forEach(combo => {
            if (combo.count < 2) return;
            let printStr = '[';
            let heroIdsStr = '';

            combo.heroIds.forEach(heroId => {
                heroIdsStr += heroId + '_';
                printStr += ' ' + _this.heroCollection.get(heroId);
            });

            printStr += ' ]: ' + combo.count;
            // console.log(heroIdsStr);
            console.log(printStr);
            // console.log(combo.matches);
        });
    },

    getPatchList() {
        return this.patchCollection.getList();
    }
});

export default DotaStore;
