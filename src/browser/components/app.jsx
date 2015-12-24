import React from 'react';
import Fluxxor from 'fluxxor';
import DotaActions from '../actions';

const StoreWatchMixin = Fluxxor.StoreWatchMixin;
const FluxMixin = Fluxxor.FluxMixin(React);

const App = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('DotaStore')],

    getInitialState() {
        // for some reason, I have to return an empty object (because of fluxxor)
        return {};
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
            let renderedLineup = (
                <li key={combo.lineup}>
                    {`[${combo.lineup}]: ${combo.count}`}
                </li>
            );

            renderedLineups.push(renderedLineup);
        });

        return renderedLineups;
    },

    render() {
        return (
            <ul>
                {this.renderLineupCombinations()}
            </ul>
        );
    }
});

export default App;
