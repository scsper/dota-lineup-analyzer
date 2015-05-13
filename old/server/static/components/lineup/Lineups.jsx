/** @jsx React.DOM */

var Lineups = React.createClass({
    render: function() {
        return (
            <div className="lineup">
                <LineupsSearch />
                <LineupsDisplay />
            </div>
        );
    }
});
