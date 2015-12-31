import {
    getLeague as getLeagueService
} from './services/dota';

import {League} from './constants/dota';

const DotaActions = {
    getLeague(patch) {
        if (this.flux.stores.DotaStore.hasLineupsForPatch(patch)) {
            // Ensure that this is called asynchronously
            // so that the component has time to update
            // its state.
            setTimeout(() => {
                this.dispatch(League.FETCH_EXISTS);
            }, 0);
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
