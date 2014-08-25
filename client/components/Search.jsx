/** @jsx React.DOM */

var Search = React.createClass({
    render: function() {
        return (
            <form className="search" role="form">
                <input type="text" className="form-control" placeholder="Enter heroes"></input>
            </form>
        );
    }
});
