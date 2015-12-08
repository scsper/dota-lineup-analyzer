import Fluxxor from 'fluxxor';
import {League} from '../constants/dota';

const DotaStore = Fluxxor.createStore({
    initialize() {
        this.bindActions(
            League.FETCH_SUCCEEDED, this.handleLeagueSuccess
        );
    },

    handleLeagueSuccess(response) {
        console.log(response);
    }
});

export default DotaStore;
