import React from 'react';
import HeroCache from '../cache/hero';

const Match = React.createClass({
    propTypes: {
        match: React.PropTypes.object.isRequired
    },

    getPickString(picks) {
        let pickStr = '[';

        picks.forEach((pick, index) => {
            pickStr += HeroCache.get(pick.hero_id);

            if (index !== 4) {
                pickStr += ', ';
            }
        });

        pickStr += ']'

        return pickStr;
    },

    getWinner() {
        if (this.props.match.winner) {
            return 'Dire won';
        }

        return 'Radiant won';
    },

    render() {
        const {match} = this.props;
        const {radiant, dire} = match;

        return (
            <li>
                <h2>{`${radiant.name} (radiant) vs. ${dire.name} (dire)`}</h2>
                <div>
                    <div>{`radiant picks: ${this.getPickString(radiant.picks)}`}</div>
                    <div>{`dire picks: ${this.getPickString(dire.picks)}`}</div>
                    <div>{`radiant bans: ${this.getPickString(radiant.bans)}`}</div>
                    <div>{`dire bans: ${this.getPickString(dire.bans)}`}</div>
                </div>
                <h4>{this.getWinner()}</h4>
            </li>
        );
    }
});

export default Match;
