/** @jsx React.DOM */

var LineupsSearch = React.createClass({
    getInitialState: function() {
        return {value: ''};
    },

    handleChange: function(event) {
        this.setState({value: event.target.value});
    },

    handleClick: function(event) {
        event.preventDefault(); // don't send a request to the server; we're using ajax
        LineupActionCreator.search(this.state.value);
    },

    render: function() {
        var value = this.state.value;

        return (
            <form className="search" role="form" value={value} onChange={this.handleChange}>
                <input type="text" className="form-control" placeholder="Enter heroes"></input>
                <button type="submit" className="btn btn-default" onClick={this.handleClick}>Submit</button>
            </form>
        );
    }
});
