/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */

import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import Fluxxor from 'fluxxor';
import DotaStore from './stores/dota';
import DotaActions from './actions';
import HeroCache from './cache/hero';

window.onload = function() {
    const stores = {
        DotaStore: new DotaStore({
            patchToLeagues: window.patchToLeagues,
            tournamentsForCurrentPatch: window.tournamentsForCurrentPatch,
            currentPatch: window.currentPatch,
            leagueIdsToLeagueNames: window.leagueIdsToLeagueNames
        })
    };

    const flux = new Fluxxor.Flux(stores, DotaActions);

    HeroCache.initialize(window.heroes);

    ReactDOM.render(
        <App flux={flux}/>,
        document.getElementById('container')
    );
};
