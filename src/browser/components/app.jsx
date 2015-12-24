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
            patches: dotaStore.getPatchList()
        };
    },

    componentDidMount() {
        this.getFlux().actions.getLeague(this.state.patches[1]);
    },

    render() {
        return (
            <div>Hello world!</div>
        );
    }
});

export default App;
