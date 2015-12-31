import React from 'react';

const Settings = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
    },

    checkboxChanged(event){
        this.props.onChange({showBans : event.target.checked});
    },

    render() {
        return (
            <div className={'settings-container'}>
                <h3 className={'settings-title'}> Settings </h3>
                <input type='checkbox' name='showBans' onChange={this.checkboxChanged}/>
                <label htmlFor='showBans'> show bans </label>
            </div>
        );
    }
});

export default Settings;
