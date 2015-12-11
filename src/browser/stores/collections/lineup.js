const DELIMTER = '_';

export default class LineupCollection {
    constructor() {
        // key: lineup combination sorted by hero id
        // value: array of match ids
        this.lineupCombinations = {};
    }

    add(lineup, matchId) {
        let lineupCombinations = [];

        // sort the lineup by hero id to ensure that we end up with consistent keys
        // if we do not sort the lineup by id, we could end up with something like
        // 1_4_7 and 1_7_4.  these should be filed under the same key.
        let sortedLineup = lineup.sort((a, b) => a.hero_id - b.hero_id);

        this._getCombinations(sortedLineup, 0, '', lineupCombinations);

        lineupCombinations.forEach(lineupCombination => {
            let key = lineupCombination;
            if (!this.lineupCombinations.hasOwnProperty(key)) {
                this.lineupCombinations[key] = [];
            }

            this.lineupCombinations[key].push(matchId);
        });
    }

    _getCombinations(lineup, start, storedValues, combinations) {
        if (start === lineup.length) {
            return;
        }

        if (storedValues !== '' && storedValues[storedValues.length - 1] !== DELIMTER) {
            storedValues += DELIMTER;
        }

        if (!lineup[start].hero_id) {
            throw new Error('the hero id for the following lineup is missing: ' + JSON.stringify(lineup, null, 2));
        }
        combinations.push(storedValues + lineup[start].hero_id);

        this._getCombinations(lineup, start + 1, storedValues + lineup[start].hero_id, combinations);
        this._getCombinations(lineup, start + 1, storedValues, combinations);
    }

    get(heroLength) {
        let combinationsToReturn = [];

        Object.keys(this.lineupCombinations).forEach(key => {
            let heroIds = key.split(DELIMTER);

            if (heroIds.length === heroLength) {
                combinationsToReturn.push({
                    heroIds: heroIds,
                    matches: this.lineupCombinations[key],
                    count: this.lineupCombinations[key].length
                });
            }
        });

        return combinationsToReturn;
    }
}
