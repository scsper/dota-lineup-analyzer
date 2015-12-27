import React from 'react';
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
            currentPatch: window.currentPatch
        })
    };

    const flux = new Fluxxor.Flux(stores, DotaActions);

    HeroCache.initialize(window.heroes);

    ReactDOM.render(
        <App flux={flux}/>,
        document.getElementById('container')
    );
};
