import React from 'react';

const HeroComboPicker = React.createClass({
    propTypes: {
        heroComboNumber: React.PropTypes.number.isRequired,
        onChange: React.PropTypes.func.isRequired
    },

    render() {
        return (
            <div className={'searchbar'}>
                <span>Number of heroes in combo:</span>
                <select onChange={this.props.onChange} value={this.props.heroComboNumber}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
        );
    }
});

export default HeroComboPicker;
