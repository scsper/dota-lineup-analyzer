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

    handleLeagueSuccess(tournaments, patch) {
        Object.keys(tournaments).forEach(leagueId => {
            let matches = tournaments[leagueId].matches;

            matches.forEach(match => {
                if (match.radiant.picks) {
                    this.lineupCollection.add(match.radiant.picks, match.id);
                }

                if (match.dire.picks) {
                    this.lineupCollection.add(match.dire.picks, match.id);
                }
            });
        });

        this.getLineupCombinations();
    },

    getLineupCombinations() {
        let _this = this;
        let sortedCombinations = this.lineupCollection.get(4).sort((a, b) => b.count - a.count);
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
