import React from 'react';
import HeroCache from '../cache/hero';
import ImageUrls from '../constants/images';

const Hero = React.createClass({
    propTypes: {
       heroId: React.PropTypes.string.isRequired
    },

    render() {
       const {heroId} = this.props;

        return (
            <li className={'hero'}>
                <img src={ImageUrls[heroId]} />
                <span>{HeroCache.get(heroId)}</span>
            </li>
        );
    }
});

export default Hero;
