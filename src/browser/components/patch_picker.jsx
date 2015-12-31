import React from 'react';

const PatchPicker = React.createClass({
    propTypes: {
        patches: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired,
        activePatch: React.PropTypes.string.isRequired
    },

    generateOptions() {
        return this.props.patches.map(patch => <option key={patch} value={patch}>{patch}</option>);
    },

    render() {
        return (
            <div className={'searchbar'}>
                <span>Patch:</span>
                <select onChange={this.props.onChange} value={this.props.activePatch}>
                    {this.generateOptions()}
                </select>
            </div>
        );
    }
});

export default PatchPicker;
