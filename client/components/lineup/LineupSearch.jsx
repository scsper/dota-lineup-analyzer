/** @jsx React.DOM */

var LineupSearch = React.createClass({
    handleClick: function() {
        LineupActionCreator.test();
    },

    render: function() {
        return (
            <form className="search" role="form" onClick={this.handleClick}>
                <input type="text" className="form-control" placeholder="Enter heroes"></input>
            </form>
        );
    }
});
