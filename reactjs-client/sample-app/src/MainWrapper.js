import React, { Component } from 'react';
//import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
//import logo from './logo.svg';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import JoinGame from './JoinGame.js';
import Lobby from './Lobby.js';
import './App.css';
import './UI.css';


class MainWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: '',
            storyPrompt: ''
        }
        JoinGame.context = this;
        this.updateGameData = this.updateGameData.bind(this);
        this.handler = this.handler.bind(this)
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <JoinGame updateGameData={this.updateGameData}></JoinGame>
                    </Route>
                    <Route path="/game">
                        <Lobby updateGameData={this.updateGameData} storyPrompt={this.state.storyPrompt}></Lobby>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
    updateGameData(id, prompt) {
        console.log("updating game data");
        this.setState({gameId : id, storyPrompt : prompt})
    }
    handler(e) {
        e.preventDefault()
        console.log("in the parent handler");
      }
}
export default MainWrapper;
