import React, { Component } from 'react';
//import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
//import logo from './logo.svg';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import JoinGame from './JoinGame.js';
import Lobby from './Lobby.js';
import Header from './Header.js'
import '../CSS/App.css';
import '../CSS/UI.css';


class MainWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: '',
            storyPrompt: '',
            author: '',
            newStory: false
        }
        JoinGame.context = this;
        this.updateGameData = this.updateGameData.bind(this);
        this.handler = this.handler.bind(this)
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <JoinGame updateGameData={this.updateGameData}></JoinGame>
                        </Route>
                        <Route path="/game">
                            <Lobby
                                ref={(lobby) => { this.lobby = lobby; }}
                                updateGameData={this.updateGameData}
                                newStory={this.state.newStory}
                                storyPrompt={this.state.storyPrompt}
                                gameId={this.state.gameId}
                                author={this.state.author} ></Lobby>
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
    updateGameData(id, prompt, isNewStory, author) {
        console.log("updating game data, newStory = " + isNewStory);
        this.setState({ gameId: id, storyPrompt: prompt, author: author, newStory: isNewStory })
        if (isNewStory)
            this.lobby.setState({ displayTitleInput: "" });
        else this.lobby.setState({ displayTitleInput: "hidden" });
    }
    handler(e) {
        e.preventDefault()
        console.log("in the parent handler");
    }
}
export default MainWrapper;
