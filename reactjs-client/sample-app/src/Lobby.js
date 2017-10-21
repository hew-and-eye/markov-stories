import React, { Component } from 'react';
//import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import logo from './logo.svg';
import './App.css';
import './UI.css';

class Lobby extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Markov Stories</h1>
        </header>
        <div className="ui-elem-holder">
          
          <div className="story-prompt">
            {this.props.storyPrompt}
          </div>
        </div>
        <div className="ui-elem-holder">
          <div>
            <textarea className="story-textarea" rows="4" cols="50" maxLength="480"></textarea>
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
