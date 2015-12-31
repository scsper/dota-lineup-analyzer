const DELIMTER = '_';

export default class LineupCollection {
    constructor() {
        // key: league id
        // value: Object with:
            // key: lineup combination sorted by hero id
            // value: array of match ids
        this.lineupCombinationsByLeague = {};

        // key: patch
        // value: Object with:
            // key: lineup combination sorted by hero id
            // value: array of match ids
        this.lineupCombinationsByPatch = {};
    }

    add(lineup, matchId, leagueId, patch) {
        if (!this.lineupCombinationsByLeague[leagueId]) {
            this.lineupCombinationsByLeague[leagueId] = {};
        }

        if (!this.lineupCombinationsByPatch[patch]) {
            this.lineupCombinationsByPatch[patch] = {};
        }

        let lineupCombinations = [];

        // sort the lineup by hero id to ensure that we end up with consistent keys
        // if we do not sort the lineup by id, we could end up with something like
        // 1_4_7 and 1_7_4.  these should be filed under the same key.
        let sortedLineup = lineup.sort((a, b) => a.hero_id - b.hero_id);

        this._getCombinations(sortedLineup, 0, '', lineupCombinations);

        lineupCombinations.forEach(lineupCombination => {
            let key = lineupCombination;

            if (!this.lineupCombinationsByPatch[patch].hasOwnProperty(key)) {
                this.lineupCombinationsByPatch[patch][key] = [];
            }

            if (!this.lineupCombinationsByLeague[leagueId].hasOwnProperty(key)) {
                this.lineupCombinationsByLeague[leagueId][key] = [];
            }

            this.lineupCombinationsByPatch[patch][key].push(matchId);
            this.lineupCombinationsByLeague[leagueId][key].push(matchId);
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

    getForLeague(leagueId, heroLength) {
        if (!this.lineupCombinationsByLeague.hasOwnProperty(leagueId)) {
            throw new Error('There are no lineups for league: ' + leagueId);
        }

        return this._get(this.lineupCombinationsByLeague[leagueId], heroLength);
    }

    getForPatch(patch, heroLength) {
        if (!this.lineupCombinationsByPatch.hasOwnProperty(patch)) {
            throw new Error('There are no lineups for patch: ' + patch);
        }

        return this._get(this.lineupCombinationsByPatch[patch], heroLength);
    }

    _get(lineupCombinations, heroLength) {
        let combinationsToReturn = [];

        Object.keys(lineupCombinations).forEach(key => {
            let heroIds = key.split(DELIMTER);

            if (heroIds.length === heroLength) {
                combinationsToReturn.push({
                    id: key,
                    heroIds: heroIds,
                    matches: lineupCombinations[key],
                    count: lineupCombinations[key].length
                });
            }
        });

        return combinationsToReturn;
    }

    hasLineupsForPatch(patch) {
        return this.lineupCombinationsByPatch.hasOwnProperty(patch);
    }
}
