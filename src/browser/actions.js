import {
    getLeague as getLeagueService
} from './services/dota';

import {League} from './constants/dota';

const DotaActions = {
    getLeague(patch) {
        if (this.flux.stores.DotaStore.hasLineupsForPatch(patch)) {
            this.dispatch(League.FETCH_EXISTS);
        } else {
            getLeagueService(patch).then(response => {
                this.dispatch(League.FETCH_SUCCEEDED, {
                    leagues: response,
                    patch: patch
                });
            });
        }
    }
};

module.exports = DotaActions;
