import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import { withRouter } from 'react-router';
import logo from './logo.svg';
import './App.css';
import './UI.css';
import $ from 'jquery'
import DataHolder from './dataholder.js';

let gameNameRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9-_]+[a-zA-Z0-9]+$/;
let gameNameRegexShort = /^[a-zA-Z0-9]+$/;

class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: '',
      disableJoin: true,
      joinLinkRoute: '/',
      buttonPrompt: 'create a game',
      displayInvalidNamePrompt: "hidden"
    }
    JoinGame.context = this;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Markov Stories</h1>
        </header>
        <div className="ui-elem-holder">
          <input
            type="text"
            value={this.state.gameId}
            onChange={this.handleChange.bind(this)}
            placeholder="Enter game name" />
        </div>
        <div id="invalid-message" className={"ui-elem-holder " + this.state.displayInvalidNamePrompt}>
          <p>
            names can only use letters, numbers, dashes, and underscores, and must begin and end with letters or numbers
          </p>
        </div>
        <div className="ui-elem-holder">
          <Link to={this.state.joinLinkRoute}>
            <button
              //onClick={this.props.handler}
              onClick={this.handleClick.bind(this, this.state.gameId)}
              disabled={this.state.disableJoin} >
              {this.state.buttonPrompt}
            </button>
          </Link>
        </div>
        {/* <div className="ui-elem-holder">
          <input 
            className="room-search-input" 
            type="text" 
            value={this.state.gameId}
            onChange={ this.handleChange.bind(this) }
            placeholder="Enter game code" />
          <span 
            className="room-search-button"
            onClick={ this.handleClick.bind(this) } >
            search</span>
        </div> */}
      </div>
    );
  }

  handleClick(e, gameId) {
    let context = this;
    if (gameNameRegex.test(this.state.gameId) || gameNameRegexShort.test(this.state.gameId)) {
      $.ajax({
        url: `http://localhost:8080/storylist/join/${context.state.gameId}`,
        type: 'post',
        dataType: 'json',
        success: function (data) {
          //console.log(context.props.updateGameData);
          context.props.updateGameData(context.props.gameId, data.prompt);
          context.setState({ joinLinkRoute: "/game" });
          // else context.setState({ joinLinkRoute: "/game" });
          context.setState({ disableJoin: false });
        }, error: function (data) {
          console.log("there was an error");
          context.setState({ disableJoin: false });
        }
      });
    }
  }

  handleChange(e) {
    // update state with input value
    this.setState({ gameId: e.target.value, joinLinkRoute: "/" });
    DataHolder.gameName = e.target.value;
    let context = this;
    // check if name is valid
    if (gameNameRegex.test(e.target.value) || gameNameRegexShort.test(e.target.value)) {
      // disable button and submit a server request to check if the game name already exists
      this.setState({ disableJoin: true, displayInvalidNamePrompt: "hidden" });
      $.ajax({
        url: "http://localhost:8080/storylist/check/" + e.target.value,
        type: 'post',
        dataType: 'json',
        success: function (data) {
          if (data.prompt === "true")
            context.setState({ buttonPrompt: "game exists: click to join", joinLinkRoute: "/game" });
          else context.setState({ buttonPrompt: "create a game", joinLinkRoute: "/game" });
          context.setState({ disableJoin: false });
        }, error: function (data) {
          console.log("there was an error");
          context.setState({ disableJoin: false });
        }
      });
    } else context.setState({ disableJoin: true, displayInvalidNamePrompt: "" });
    // console.log(document.getElementById("invalid-message").classList);
    // let checkConfig = {
    //   method: 'GET',
    //   headers: new Headers().append('Content-Type', 'application/json'),
    //   mode: 'cors',
    //   cache: 'default'
    // };
    // let checkRequest = new Request("http://localhost:8080/storylist/check/" + e.target.value, checkConfig);
    // fetch(checkRequest).then(function(response) {
    //   console.log(response.json);
    //   context.setState({ disableJoin: false });
    // }).then(function(myBlob) {
    //   console.log(myBlob);
    //   context.setState({ disableJoin: false });
    // });
    // update state accordingly, and enable button
  }
}

export default JoinGame;
