/** @jsx React.DOM */

var Lineup = React.createClass({
    render: function() {
        var lineup = this.props.lineup;

        console.log(this.props);

        return (
            <div>
                <span>[{lineup[0]}, </span>
                <span>{lineup[1]}, </span>
                <span>{lineup[2]}, </span>
                <span>{lineup[3]}, </span>
                <span>{lineup[4]}]</span>
            </div>
        );
    }
});
