import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery'

import '../CSS/App.css';
import '../CSS/UI.css';

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
      displayInvalidNamePrompt: "hidden",
      author: ''
    }
    JoinGame.context = this;
  }
  render() {
    return (
      <div className="App">
        <div className="ui-elem-holder">
          <input
            type="text"
            value={this.state.author}
            onChange={this.handleAuthorNameChange.bind(this)}
            placeholder="Enter your name" />
        </div>
        <div className="ui-elem-holder">
          <input
            type="text"
            value={this.state.gameId}
            onChange={this.handleGameIdChange.bind(this)}
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
              onClick={this.handleClick.bind(this)}
              disabled={this.state.disableJoin} >
              {this.state.buttonPrompt}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  handleClick(e) {
    let context = this;
    if (gameNameRegex.test(this.state.gameId) || gameNameRegexShort.test(this.state.gameId)) {
      $.ajax({
        url: `http://localhost:8080/storylist/join/${context.state.gameId}`,
        type: 'post',
        dataType: 'json',
        success: function (data) {
          context.props.updateGameData(context.state.gameId, data.prompt, data.new_story, context.state.author);
        }, error: function (data) {
          console.log("there was an error");
        }
      });
    }
  }

  handleAuthorNameChange(e) {
    this.setState({ author: e.target.value });
    if (gameNameRegex.test(e.target.value) || gameNameRegexShort.test(e.target.value)) {
      this.setState({ disableJoin: true, displayInvalidNamePrompt: "hidden", joinLinkRoute: "/game" });
    } else this.setState({ disableJoin: true, displayInvalidNamePrompt: "", joinLinkRoute: "/" });
  }

  handleGameIdChange(e) {
    // update state with input value
    this.setState({ gameId: e.target.value, joinLinkRoute: "/" });
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
          if (data.exists === true)
            context.setState({ buttonPrompt: "game exists: click to join", joinLinkRoute: "/game" });
          else context.setState({ buttonPrompt: "create a game", joinLinkRoute: "/game" });
          context.setState({ disableJoin: false });
        }, error: function (data) {
          console.log("there was an error");
          context.setState({ disableJoin: false });
        }
      });
    } else this.setState({ disableJoin: true, displayInvalidNamePrompt: "" });
    /*
     * This is the stuff for using the Fetch API, which would be better than JQuery in this instance,
     * since importing all of JQuery is overkill since I'm only using it for AJAX,
     * but I'm prioritizing feature completion for now.
     */
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
