import React from 'react';

const Lineup = React.createClass({
    propTypes: {
        combo: React.PropTypes.object.isRequired
    },

    render() {
        const {combo} = this.props;

        return (
            <li>
                {`[${combo.lineup}]: ${combo.count}`}
            </li>
        );
    }
});

export default Lineup;
