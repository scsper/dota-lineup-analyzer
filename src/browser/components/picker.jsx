import React from 'react';

const Picker = React.createClass({
    propTypes: {
        options: React.PropTypes.array.isRequired,
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        defaultOption:  React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.number,
        ])
    },

    generateOptions() {
        return this.props.options.map(patch => <option key={patch} value={patch}>{patch}</option>);
    },

    render() {
        return (
            <div className={'picker'}>
                <label for={this.props.name}>{this.props.name}</label>
                <select name={this.props.name} onChange={this.props.onChange} value={this.props.defaultOption}>
                    {this.generateOptions()}
                </select>
            </div>
        );
    }
});

export default Picker;
