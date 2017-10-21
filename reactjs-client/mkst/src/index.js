import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route } from 'react-router'
// import { Switch, BrowserRouter, Route } from 'react-router-dom';
// import JoinGame from './JoinGame.js';
//import Lobby from './Lobby.js';
import './CSS/index.css';
import registerServiceWorker from './registerServiceWorker';
import MainWrapper from './Components/MainWrapper.js';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

ReactDOM.render(
    <MainWrapper></MainWrapper>,
    document.getElementById('root')
);
registerServiceWorker();
