import React, { Component } from 'react';
//import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
//import logo from './logo.svg';
import '../CSS/App.css';
import '../CSS/UI.css';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: '',
      joinLinkRoute: '/',
      buttonPrompt: 'add to the story',
      displayTitleInput: "hidden"
    }
    Lobby.context = this;
  }
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Markov Stories</h1>
        </header> */}
        <div className="ui-elem-holder">
          
          <div className="story-prompt">
            {this.props.storyPrompt}
          </div>
        </div>
        <div className={"ui-elem-holder " + this.state.displayTitleInput}>
          <input
            type="text"
            value={this.state.gameId}
            
            placeholder="Story Title" />
        </div>
        <div className="ui-elem-holder">
          <div>
            <textarea className="story-textarea" rows="6" cols="50" maxLength="240"></textarea>
            <button
              //onClick={this.props.handler}
              >
             add to the story
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Lobby;
