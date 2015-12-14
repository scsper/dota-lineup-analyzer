export default class PatchCollection {
    constructor(patchToLeagues) {
        // key: patch id e.g. '6.85b'
        // value: list of league ids associated with that patch
        this.patchToLeagues = {};

        // key: league id e.g. 4231
        // value: patch id e.g. '6.85b'
        this.leagueToPatch = {};

        // a list of patches, e.g [6.85b, 6.85, 6.84]
        this.patches = [];

        Object.keys(patchToLeagues).forEach(patch => {
            let leagueIds = patchToLeagues[patch];

            this.patchToLeagues[patch] = leagueIds;

            leagueIds.forEach(leagueId => {
                this.leagueToPatch[leagueId] = patch;
            });

            this.patches.push(patch);
        });
    }

    getList() {
        return this.patches;
    }
}
