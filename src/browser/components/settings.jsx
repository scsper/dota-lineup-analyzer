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
            <div className={'settings'}>
                <label htmlFor='showBans'> show Bans </label>
                <input type='checkbox' name='showBans' onChange={this.checkboxChanged}/>
            </div>
        );
    }
});

export default Settings;
