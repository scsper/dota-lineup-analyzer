import {getLeague as getLeagueService} from '../services/dota';
import {League} from '../constants/dota';

const DotaActions = {
    getLeague() {
        let leagueId = 2733;

        getLeagueService(leagueId).then(response => {
            this.dispatch(League.FETCH_SUCCEEDED, response.result);
        });
    }
};

module.exports = DotaActions;
