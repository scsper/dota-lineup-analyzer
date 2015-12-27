import React from 'react';
import HeroCache from '../cache/hero';
import Hero from './hero.jsx';

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

    renderHeroes(picks) {
        return picks.map(hero => <Hero key={hero.hero_id} heroId={ '' + hero.hero_id}/>);
    },

    getWinner() {
        if (this.props.match.winner) {
            return 'Dire won';
        }

        return 'Radiant won';
    },

    mergePickAndBans(picks, bans) {
        // array.sort will sort them in place, so we have to clone the arrays first
        // we don't want to sort the arrays in place, because that will modify the reference of the store.
        let sortedPicks = picks.map(pick => pick).sort((a, b) => a.order - b.order);
        let sortedBans = bans.map(ban => ban).sort((a, b) => a.order - b.order);

        // dota draft order
        return [
            sortedBans[0],
            sortedBans[1],
            sortedPicks[0],
            sortedPicks[1],
            sortedBans[2],
            sortedBans[3],
            sortedPicks[2],
            sortedPicks[3],
            sortedBans[4],
            sortedPicks[4]
        ];
    },

    render() {
        const {match} = this.props;
        const {radiant, dire} = match;

        return (
            <li  className={'match'}>
                <h2>{`${radiant.name} (radiant) vs. ${dire.name} (dire)`}</h2>
                <div>
                    <h3>{`radiant picks:`}</h3>
                    <ul className={'lineup'}>
                        {this.renderHeroes(radiant.picks)}
                    </ul>
                    <h3>{`dire picks:`}</h3>
                    <ul className={'lineup'}>
                        {this.renderHeroes(dire.picks)}
                    </ul>
                    <h3>{`radiant bans:`}</h3>
                    <ul className={'lineup'}>
                        {this.renderHeroes(radiant.bans)}
                    </ul>
                    <h3>{`dire bans:`}</h3>
                    <ul className={'lineup'}>
                        {this.renderHeroes(dire.bans)}
                    </ul>
                </div>
                <h4>{this.getWinner()}</h4>
            </li>
        );
    }
});

export default Match;
