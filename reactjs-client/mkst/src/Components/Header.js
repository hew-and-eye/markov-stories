import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import logo from '../Resources/logo.svg';
import '../CSS/App.css';
import '../CSS/UI.css';


class Header extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <Link to="/">
                        <h1 className="App-title">Markov Stories</h1>
                    </Link>
                </header>
            </div>
        );
    }
}
export default Header;
