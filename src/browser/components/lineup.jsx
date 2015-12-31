import React from 'react';
import Hero from './hero.jsx';
import classNames from 'classnames';

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

    render() {
        const {combo, isSelected} = this.props;

        return (
            <li className={classNames('lineupCombo', {'selected' : isSelected })} onClick={this.props.onClick.bind(null, combo)}>
                <h3 className={'combo-count'}>{`${combo.count}`}</h3>
                <ul className={'lineup'}>
                    {this.renderHeroes()}
                </ul>
            </li>
        );
    }
});

export default Lineup;
