import React from 'react';
import Fluxxor from 'fluxxor';
import DotaActions from '../actions';

const FluxMixin = Fluxxor.FluxMixin(React);

const App = React.createClass({
    mixins: [FluxMixin],
    componentDidMount() {
        this.getFlux().actions.getLeague();
    },

    render() {
        return (
            <div>Hello world!</div>
        );
    }
});

export default App;
