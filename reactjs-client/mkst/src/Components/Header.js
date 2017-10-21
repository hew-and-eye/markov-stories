import React, { Component } from 'react';
//import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import logo from '../Resources/logo.svg';
import '../CSS/App.css';
import '../CSS/UI.css';


class Header extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Markov Stories</h1>
                </header>
            </div>
        );
    }
}
export default Header;
