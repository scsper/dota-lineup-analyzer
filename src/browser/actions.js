import {getLeague as getLeagueService} from './services/dota';
import {League} from './constants/dota';

const DotaActions = {
    getLeague() {
        let tournamentName = 'frankfurt_major_2015';

        getLeagueService(tournamentName).then(response => {
            this.dispatch(League.FETCH_SUCCEEDED, response);
        });
    }
};

module.exports = DotaActions;
