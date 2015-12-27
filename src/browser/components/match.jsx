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
        console.log(picks);
        return picks.map(hero => <Hero key={hero.hero_id} hero={hero}/>);
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
        const direWin = (this.props.match.winner === 1) ;
        const radiantWin = (this.props.match.winner === 2);

        return (
            <li  className={'match'}>
                <h2>{`${radiant.name} vs. ${dire.name}`}</h2>
                <div className={classNames('radiant', 'pickContainer', { 'winner' : radiantWin})}>
                    <div className={'nameContainer'} >
                        <h3 className={'teamName'}>{radiant.name} </h3>
                        <p> {'RADIANT'} </p>
                    </div>
                    <ul className={'lineup'}>
                        {this.renderHeroes(this.mergePickAndBans(radiant.picks, radiant.bans))}
                    </ul>
                </div>
                <div className={classNames('dire', 'pickContainer', { 'winner' : direWin})}>
                    <div className={'nameContainer'}>
                        <h3 className={'teamName'}>{dire.name}</h3>
                        <p> {'DIRE'} </p>
                    </div>
                    <ul className={'lineup'}>
                        {this.renderHeroes(this.mergePickAndBans(dire.picks, dire.bans))}
                    </ul>
                </div>
            </li>
        );
    }
});

export default Match;
