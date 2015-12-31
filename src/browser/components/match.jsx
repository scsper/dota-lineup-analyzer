import React from 'react';
import HeroCache from '../cache/hero';
import Hero from './hero.jsx';
import classNames from 'classnames';

const Match = React.createClass({
    propTypes: {
        match: React.PropTypes.object.isRequired,
        activeCombo: React.PropTypes.object.isRequired,
        showBans: React.PropTypes.bool.isRequired
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

    renderHeroes(picks, bans) {
        // array.sort will sort them in place, so we have to clone the arrays first
        // we don't want to sort the arrays in place, because that will modify the reference of the store.
        let sortedPicks = picks.map(pick => pick).sort((a, b) => a.order - b.order);
        let sortedBans = bans.map(ban => ban).sort((a, b) => a.order - b.order);
        let heroList;

        heroList = this.props.showBans ? this.mergePickAndBans(sortedPicks, sortedBans) : picks;

        return heroList.map(hero => <Hero key={hero.hero_id} hero={hero} activeCombo={this.props.activeCombo}/>);
    },

    mergePickAndBans(picks, bans) {
        // dota draft order
        return [
            bans[0],
            bans[1],
            picks[0],
            picks[1],
            bans[2],
            bans[3],
            picks[2],
            picks[3],
            bans[4],
            picks[4]
        ];
    },

    render() {
        const {match} = this.props;
        const {radiant, dire} = match;
        const direWin = (this.props.match.winner === 1) ;
        const radiantWin = (this.props.match.winner === 2);
        let showBans = this.props.showBans;

        return (
            <li className={classNames('match',  {'showBans' : showBans})}>
                <h2>{`${radiant.name} vs. ${dire.name}`}</h2>
                <div className={classNames('radiant', 'pick-container', {'winner' : radiantWin})}>
                    <div className={'teamname-container'} >
                        <h3 className={'teamName'}>{radiant.name} </h3>
                        <p> {'RADIANT'} </p>
                    </div>
                    <ul className={'lineup'}>
                        {this.renderHeroes(radiant.picks, radiant.bans)}
                    </ul>
                </div>
                <div className={classNames('dire', 'pick-container', {'winner' : direWin})}>
                    <div className={'teamname-container'}>
                        <h3 className={'teamName'}>{dire.name}</h3>
                        <p> {'DIRE'} </p>
                    </div>
                    <ul className={'lineup'}>
                        {this.renderHeroes(dire.picks, dire.bans)}
                    </ul>
                </div>
            </li>
        );
    }
});

export default Match;
