import React from 'react';

const Picker = React.createClass({
    propTypes: {
        options: React.PropTypes.array.isRequired,
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        defaultOption:  React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.object
        ]),
        renderNone: React.PropTypes.bool
    },

    generateOptions() {
        let options = [];

        if (this.props.renderNone) {
            options.push(<option key={'none'} value={'none'} />);
        }

        this.props.options.forEach(option =>
            options.push(<option key={option.value} value={option.value}>{option.displayName}</option>));

        return options;
    },

    render() {
        return (
            <div className={'picker'}>
                <label htmlFor={this.props.name}>{this.props.name}</label>
                <select name={this.props.name} onChange={this.props.onChange} value={this.props.defaultOption}>
                    {this.generateOptions()}
                </select>
            </div>
        );
    }
});

export default Picker;
