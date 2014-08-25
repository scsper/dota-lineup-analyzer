/** @jsx React.DOM */

var LineupsDisplay = React.createClass({
    getInitialState: function() {
        return {
            lineups: []
        };
    },

    componentDidMount: function() {
        bean.on(lineupStore, 'changed', this._lineupStoreChanged);
    },

    componentWillUnmount: function() {
        bean.off(lineupStore, 'changed', this._lineupStoreChanged);
    },

    render: function() {
        return (
            <div className="lineups">
                {
                    this.state.lineups.map(function(lineup) {
                        return <Lineup lineup={lineup}/>
                    }, this)
                }
            </div>
        );
    },

    _lineupStoreChanged: function() {
        this.setState({
            lineups: lineupStore.get()
        });
    }
});
