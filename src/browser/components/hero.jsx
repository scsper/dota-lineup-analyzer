import React from 'react';
import HeroCache from '../cache/hero';
import ImageUrls from '../constants/images';
import classNames from 'classnames';


const Hero = React.createClass({
    propTypes: {
       hero: React.PropTypes.object.isRequired
    },

    render() {
        const {hero} = this.props;
        const hasPickOrBanClass = classNames({ 'isBan' :  hero.is_pick === false}, {'isPick' : hero.is_pick === true});

        return (
            <li className={'hero'}>
                <img className={hasPickOrBanClass} src={ImageUrls[hero.hero_id]} />
            </li>
        );
    }
});

export default Hero;
