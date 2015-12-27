import React from 'react';
import Hero from './hero.jsx';
import classNames from 'classnames';

const Lineup = React.createClass({
    propTypes: {
        combo: React.PropTypes.object.isRequired,
        onClick: React.PropTypes.func.isRequired,
        isActive: React.PropTypes.bool.isRequired
    },

    renderHeroes() {
        return this.props.combo.lineup.map(heroId => <Hero key={heroId} hero={ { hero_id : heroId}}/>);
    },

    render() {
        const {combo, isActive} = this.props;

        return (
            <li className={'lineupCombo'} onClick={this.props.onClick.bind(null, combo)}>
                <h3 className={classNames('combo-count', {'combo-count-active': isActive})}>{`${combo.count}`}</h3>
                <ul className={'lineup'}>
                    {this.renderHeroes()}
                </ul>
            </li>
        );
    }
});

export default Lineup;
