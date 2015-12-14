import {
    getLeague as getLeagueService
} from './services/dota';

import {League} from './constants/dota';

const DotaActions = {
    getLeague(patch) {
        getLeagueService(patch).then(response => {
            console.log(response);
            this.dispatch(League.FETCH_SUCCEEDED, response, patch);
        });
    }
};

module.exports = DotaActions;
