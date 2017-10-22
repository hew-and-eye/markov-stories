import React, { Component } from 'react';
import $ from 'jquery'

import '../CSS/App.css';
import '../CSS/UI.css';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      joinLinkRoute: '/',
      buttonPrompt: 'add to the story',
      displayTitleInput: "hidden",
      storyAddition: '',
      storyIndex:-1
    }
    Lobby.context = this;
  }
  render() {
    return (
      <div className="App">
        <div className="ui-elem-holder">

          <div className="story-prompt">
            {this.props.storyPrompt}
          </div>
        </div>
        <div className={"ui-elem-holder " + this.state.displayTitleInput}>
          <input
            onChange={this.handleTitleChange.bind(this)}
            type="text"
            value={this.state.title}

            placeholder="Story Title" />
        </div>
        <div className="ui-elem-holder">
          <div>
            <textarea className="story-textarea" rows="6" cols="50" maxLength="240"
              value={this.storyAddition}
              onChange={this.handleStoryChange.bind(this)} ></textarea>
            <button onClick={this.handleClick.bind(this)}>
              add to the story
            </button>
          </div>
        </div>
      </div>
    );
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleStoryChange(e) {
    this.setState({storyAddition: e.target.value});
  }

  handleClick(e) {
    let context = this;
    // either title or storyIndex will be a junk value, depending on whether or not it's a new story,
    // but it doesn't hurt to add them each time
    let storyData = {
      "author" : this.props.author,
      "addition" : this.state.storyAddition,
      "title" : this.state.title,
      "storyIndex" : this.state.storyIndex
    }
    let RESTtarget = "addtostory";
    if(this.props.newStory)
      RESTtarget = "createstory"
    $.ajax({
      url: `http://localhost:8080/${RESTtarget}/${context.props.gameId}`,
      type: 'post',
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(storyData),
      success: function (data) {
        context.props.updateGameData(context.props.gameId, data.prompt, data.new_story);
      }, error: function (data) {
        console.log("there was an error");
      }
    });
  }
}
export default Lobby;
