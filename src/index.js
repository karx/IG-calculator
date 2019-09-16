import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { hotjar } from 'react-hotjar';
import ReactGA from 'react-ga';


ReactGA.initialize('UA-148097649-1');
ReactGA.pageview(window.location.pathname + window.location.search);

hotjar.initialize(1477844, 6);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
