import React from 'react';
import HeroCache from '../cache/hero';

const Hero = React.createClass({
    propTypes: {
       heroId: React.PropTypes.string.isRequired
    },

    render() {
       const {heroId} = this.props;

        return (
            <li className={'hero'}>
             {HeroCache.get(heroId)}
            </li>
        );
    }
});

export default Hero;
