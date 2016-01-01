import React from 'react';
import Hero from './hero.jsx';
import classNames from 'classnames';
import Winner from '../../server/constants/winner';

const Lineup = React.createClass({
    propTypes: {
        combo: React.PropTypes.object.isRequired,
        onClick: React.PropTypes.func.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        activeCombo: React.PropTypes.object
    },

    renderHeroes() {
        return this.props.combo.lineup.map(heroId => <Hero key={heroId} hero={ { hero_id : heroId}} activeCombo={this.props.activeCombo}/>);
    },

    getWinrate(combination) {
        // just need id of one hero, if one hero is there then whole combo too
        const targetHeroId = combination.lineup[0];
        let winCounter = 0; // tally up the wins

        combination.matches.forEach(match => {
            let comboFactionId = Winner.UNKNOWN;

            // check if combo appears on radi or dire
            if (match.radiant.picks.some(pick => targetHeroId === pick.hero_id)) {
                comboFactionId = Winner.RADIANT;
            } else {
                comboFactionId = Winner.DIRE;
            }

            // if concordant team won, increment win counter
            if (comboFactionId === match.winner) {
                winCounter++;
            }
        });

        return Math.round((winCounter / combination.matches.length) * 100);
    },

    render() {
        const {combo, isSelected} = this.props;

        return (
            <li className={classNames('lineupCombo', {'selected' : isSelected })} onClick={this.props.onClick.bind(null, combo)}>
                <h3 className={'combo-count'}>{`${combo.count}`}</h3>
                <ul className={'lineup'}>
                    {this.renderHeroes()}
                </ul>
                <p>Win rate: {this.getWinrate(combo)}%</p>
            </li>
        );
    }
});

export default Lineup;
