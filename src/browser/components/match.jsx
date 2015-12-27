import React from 'react';
import HeroCache from '../cache/hero';
import Hero from './hero.jsx';
import classNames from 'classnames';

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
        const direWin = this.props.match.winner;
        const radiantWin = !this.props.match.winner;

        return (
            <li  className={'match'}>
                <h2>{`${radiant.name} vs. ${dire.name}`}</h2>
                    <div className={classNames('radiant', 'pickContainer', { 'winner' : radiantWin})}>
                        <div className={'nameContainer'} >
                            <h3 className={'teamName'}>{radiant.name} </h3>
                            <p> {'Radiant'} </p>
                        </div>
                        <ul className={'lineup'}>
                            {this.renderHeroes(radiant.picks.concat(radiant.bans))}
                        </ul>
                    </div>
                    <div className={classNames('dire', 'pickContainer', { 'winner' : direWin})}>
                        <div className={'nameContainer'}>
                            <h3 className={'teamName'}>{dire.name}</h3>
                            <p> {'Dire'} </p>
                        </div>
                        <ul className={'lineup'}>
                            {this.renderHeroes(dire.picks.concat(dire.bans))}
                        </ul>
                    </div>
            </li>
        );
    }
});

export default Match;
