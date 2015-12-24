import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import Fluxxor from 'fluxxor';
import DotaStore from './stores/dota';
import DotaActions from './actions';

window.onload = function() {
    const stores = {
        DotaStore: new DotaStore({
            heroes: window.heroes,
            patchToLeagues: window.patchToLeagues,
            tournamentsForCurrentPatch: window.tournamentsForCurrentPatch,
            currentPatch: window.currentPatch
        })
    };

    const flux = new Fluxxor.Flux(stores, DotaActions);

    ReactDOM.render(
        <App flux={flux}/>,
        document.getElementById('container')
    );
};
