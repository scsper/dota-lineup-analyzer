import React from 'react';
import Fluxxor from 'fluxxor';
import DotaActions from '../actions';

import Lineup from './lineup.jsx';
import Match from './match.jsx';
import Picker from './picker.jsx';

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
            activePatch: window.currentPatch, // not sure if I want to access window from here
            activeLeagueId: null
        };
    },

    getStateFromFlux() {
        let flux = this.getFlux();
        let dotaStore = flux.store('DotaStore');
        let heroComboNumber = this.state && this.state.heroComboNumber || DEFAULT_HERO_COMBO_NUMBER;
        let activePatch = this.state && this.state.activePatch || window.currentPatch;

        return {
            patches: dotaStore.getPatchList(),
            sortedCombinations: dotaStore.getLineupCombinationsForPatch(activePatch, heroComboNumber),
            leagues: dotaStore.getLeagues(activePatch)
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
            sortedCombinations: this.getFlux().store('DotaStore').getLineupCombinationsForPatch(
                this.state.activePatch, heroComboNumber)
        });
    },

    handlePatchChange(event) {
        let activePatch = event.target.value;

        this.getFlux().actions.getLeague(activePatch);

        this.setState({
            activePatch,
            activeCombo: null,
            activeLeagueId: null,
            leagues: this.getFlux().store('DotaStore').getLeagues(activePatch)
        });
    },

    handleLeagueChange(event) {
        const dotaStore = this.getFlux().store('DotaStore');
        let activeLeagueId = event.target.value;
        let sortedCombinations;

        if (activeLeagueId !== 'none') {
            // the user selected a specific league
            sortedCombinations = dotaStore.getLineupCombinationsForLeague(activeLeagueId, this.state.heroComboNumber);
        } else {
            // the user chose to deselect all leagues.
            activeLeagueId = null;
            sortedCombinations = dotaStore.getLineupCombinationsForPatch(this.state.activePatch,
                this.state.heroComboNumber);
        }

        this.setState({
            activeLeagueId,
            sortedCombinations
        });
    },

    renderLineupCombinations() {
        let activeComboId = this.state.activeCombo && this.state.activeCombo.id;

        return this.state.sortedCombinations.map(combo =>
            <Lineup
                key={combo.id}
                isSelected={activeComboId === combo.id}
                combo={combo}
                onClick={this.handleLineupClick}
                activeCombo={this.state.activeCombo}
            />
        );
    },

    renderMatches() {
        if (!this.state.activeCombo) {
            return null;
        }

        return this.state.activeCombo.matches.map(match =>
            <Match
                key={match.id}
                match={match}
                activeCombo={this.state.activeCombo}
            />
        );
    },

    render() {
        const heroComboOptions = [1,2,3,4,5];
        const heroComboOptionsName = "Number of heroes";
        const patchOptionsName = "Patch";

        return (
            <div className={'main-container'}>
                <div className={'comboSearchSection sidebar'}>
                    <div className={'searchOptions'}>
                        <Picker
                            options={heroComboOptions.map(option => {
                                return {value: option, displayName: option};
                            })}
                            name={heroComboOptionsName}
                            onChange={this.handleHeroComboNumberChange}
                            defaultOption={this.state.heroComboNumber}
                        />

                        <Picker
                            options={this.state.patches.map(patch => {
                                return {value: patch, displayName: patch};
                            })}
                            name={patchOptionsName}
                            onChange={this.handlePatchChange}
                            defaultOption={this.state.activePatch}
                        />

                        <Picker
                            options={this.state.leagues.map(league => {
                                return {
                                    value: league.id,
                                    displayName: league.displayName
                                };
                            })}
                            name={'League'}
                            onChange={this.handleLeagueChange}
                            defaultOption={this.state.activeLeagueId}
                            renderNone={true}
                        />
                    </div>

                    <ul className={'combo-results'} >
                        {this.renderLineupCombinations()}
                    </ul>
                </div>
                <div className={'main'}>
                    <ul className={'match-results'}>
                        {this.renderMatches()}
                    </ul>
                </div>
            </div>
        );
    }
});

export default App;
