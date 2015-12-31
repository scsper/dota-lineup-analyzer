import React from 'react';
import HeroCache from '../cache/hero';
import ImageUrls from '../constants/images';
import classNames from 'classnames';


const Hero = React.createClass({
    propTypes: {
       hero: React.PropTypes.object.isRequired,
       activeCombo : React.PropTypes.object
    },

    isHeroInActiveCombo() {
        let isFound = false;
        if(this.props.activeCombo && this.props.activeCombo.lineup ){
            const activeLineup = this.props.activeCombo.lineup;
            isFound = (activeLineup.indexOf(this.props.hero.hero_id.toString()) > -1);
        }
        return isFound;
    },

    renderOrder(order) {
        if(order !== undefined){
            return <div className={'seq'}>{`${order + 1}`}</div> ;
        }
        return null;
    },

    render() {
        const {hero} = this.props;

        const stateClass = classNames(
            { 'isBan' :  hero.is_pick === false},
            {'isPick' : hero.is_pick === true},
            {'isSelected' : this.isHeroInActiveCombo()});
        return (
            <li className={'hero'}>
                <img className={stateClass} src={ImageUrls[hero.hero_id]} />
                {this.renderOrder(hero.order)}
            </li>
        );
    }
});

export default Hero;
