import React from 'react';
import Fluxxor from 'fluxxor';
import DotaActions from '../actions';

import Lineup from './lineup.jsx';
import Match from './match.jsx';

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

    handleLineupClick(combo, event) {
        this.setState({
            activeCombo: combo
        });
    },

    renderLineupCombinations() {
        return this.state.sortedCombinations.map(combo =>
            <Lineup key={combo.id} combo={combo} onClick={this.handleLineupClick} />);
    },

    renderMatches() {
        if (!this.state.activeCombo) {
            return null;
        }

        return this.state.activeCombo.matches.map(match => <Match key={match.id} match={match} />);
    },

    render() {
        return (
            <div>
                <ul>
                    {this.renderLineupCombinations()}
                </ul>

                <ul>
                    {this.renderMatches()}
                </ul>
            </div>
        );
    }
});

export default App;
