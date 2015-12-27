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
        console.log(picks);
        return picks.map(hero => <Hero key={hero.hero_id} heroId={ '' + hero.hero_id}/>);
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
