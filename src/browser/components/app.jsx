import React from 'react';
import Fluxxor from 'fluxxor';
import DotaActions from '../actions';

import Lineup from './lineup.jsx';
import Match from './match.jsx';
import HeroComboPicker from './hero_combo_picker.jsx';

const StoreWatchMixin = Fluxxor.StoreWatchMixin;
const FluxMixin = Fluxxor.FluxMixin(React);

const DEFAULT_HERO_COMBO_NUMBER = 4;

const App = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('DotaStore')],

    getInitialState() {
        // for some reason, I have to return an empty object (because of fluxxor)
        return {
            activeCombo: null,
            heroComboNumber: DEFAULT_HERO_COMBO_NUMBER,
        };
    },

    getStateFromFlux() {
        let flux = this.getFlux();
        let dotaStore = flux.store('DotaStore');
        let heroComboNumber = this.state && this.state.heroComboNumber || DEFAULT_HERO_COMBO_NUMBER;

        return {
            patches: dotaStore.getPatchList(),
            sortedCombinations: dotaStore.getLineupCombinationsForLeague(4088, heroComboNumber)
        };
    },

    handleLineupClick(combo, event) {
        this.setState({
            activeCombo: combo
        });
    },

    handleHeroComboNumberChange(event) {
        let heroComboNumber = parseInt(event.target.value, 10);

        // we want to get a new set of combinations every time the combo number is changed.
        this.setState({
            heroComboNumber,
            sortedCombinations: this.getFlux().store('DotaStore').getLineupCombinationsForLeague(4088, heroComboNumber)
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
                <HeroComboPicker
                    onChange={this.handleHeroComboNumberChange}
                    heroComboNumber={this.state.heroComboNumber}
                />

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
