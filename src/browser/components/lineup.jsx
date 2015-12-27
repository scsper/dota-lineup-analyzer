import React from 'react';

const Lineup = React.createClass({
    propTypes: {
        combo: React.PropTypes.object.isRequired,
        onClick: React.PropTypes.func.isRequired
    },

    render() {
        const {combo} = this.props;

        return (
            <li onClick={this.props.onClick.bind(null, combo)}>
                {`[${combo.lineup}]: ${combo.count}`}
            </li>
        );
    }
});

export default Lineup;
