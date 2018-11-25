import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const apiVersion = 30;
const developmentServer = 'https://play.dhis2.org/dev';
const rootElement = document.getElementById('root');


const withBaseUrl = baseUrl => {

    ReactDOM.render(<App />, rootElement);
};

if (process.env.NODE_ENV === 'production') {
    fetch('./manifest.webapp')
        .then(response => response.json())
        .then(manifest => {
            withBaseUrl(`${manifest.activities.dhis.href}`);
        })
        .catch(e => {
            console.error('Could not read manifest:', e);
            ReactDOM.render(<code>No manifest found</code>, rootElement);
        });
} else {
    withBaseUrl(developmentServer);
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
