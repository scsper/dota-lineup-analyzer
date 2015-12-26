import React from 'react';
import Fluxxor from 'fluxxor';
import DotaActions from '../actions';

import Lineup from './lineup.jsx';

const StoreWatchMixin = Fluxxor.StoreWatchMixin;
const FluxMixin = Fluxxor.FluxMixin(React);

const App = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('DotaStore')],

    getInitialState() {
        // for some reason, I have to return an empty object (because of fluxxor)
        return {
            activeCombo: null
        };
    },

    getStateFromFlux() {
        let flux = this.getFlux();
        let dotaStore = flux.store('DotaStore');

        return {
            patches: dotaStore.getPatchList(),
            sortedCombinations: dotaStore.getLineupCombinationsForLeague(4088, 4)
        };
    },

    renderLineupCombinations() {
        let renderedLineups = [];

        this.state.sortedCombinations.forEach(combo => {
            renderedLineups.push(<Lineup key={combo.id} combo={combo} />);
        });

        return renderedLineups;
    },

    render() {
        return (
            <div>
                <ul>
                    {this.renderLineupCombinations()}
                </ul>
            </div>

        );
    }
});

export default App;
