import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

window.onload = function() {
    ReactDOM.render(
        <App />,
        document.getElementById('container')
    );
};
