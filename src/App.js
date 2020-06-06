import React, { Component } from "react";
import "./App.css";

import Wrapper from "./components/Wrapper";
import PictureCard from "./components/PictureCard";
import Score from "./components/Score";
import pictures from "./pictures.json";

var shuffle = require("shuffle-array");

class App extends Component {
  state = {
    pictures: pictures,
    currentScore: 0,
    topScore: 0,
    selectedCards: [],
    navDisplayText: "Click an image to begin!",
  };

  // function to check the state: if top score is less than current score, top score will be set equal to current score
  checkTopScore = () => {
    if (this.state.currentScore > this.state.topScore) {
      this.setState({
        topScore: this.state.currentScore,
      });
    }
  };

  // function to set top score at the end of each click event/guess
  componentDidUpdate = () => {
    this.checkTopScore();
  };

  // function to update state if the current guess has not been previously guessed in the current game
  // this function pushes the current guess id to the selected cards array, shuffles the picture array,
  // and checks to see if the guess is the final one to win the game (if all 12 pictures are guessed without any repeats)
  correctGuess = (event) => {
    this.state.selectedCards.push(event.target.id);

    shuffle(pictures);

    if (this.state.currentScore === 11) {
      this.setState({
        currentScore: 0,
        topScore: 12,
        selectedCards: [],
        navDisplayText: "Congratulations, you won!",
        pictures: pictures,
      });
    } else {
      this.setState({
        currentScore: this.state.currentScore + 1,
        navDisplayText: "You've guessed correctly!",
        pictures: pictures,
      });
    }
  };

  // click event function for each image in the game.  
  // Once clicked, checks to see if image has already been guessed in current game.
  // If it has, the game is reset. If now, runs the correctGuess function
  handleClick = (event) => {
    event.preventDefault();
    var selectedCardsArray = this.state.selectedCards;

    if (this.state.selectedCards.length > 0) {
      if (selectedCardsArray.includes(event.target.id)) {
        this.setState({
          currentScore: 0,
          selectedCards: [],
          navDisplayText: "You've guessed incorrectly! Game has been reset!",
        });
      } else {
        this.correctGuess(event);
      }
    } else {
      this.correctGuess(event);
    }
  };

  render() {
    return (
      <div>
        <nav className="navbar sticky-top">
          <span className="navbar-brand mb-0 h1" id="logo">
            Clicky Game
          </span>
          <span className="navbar-text">{this.state.navDisplayText}</span>
          <span className="navbar-text">
            <Score type="Your Score" score={this.state.currentScore}></Score>{" "}
            <br></br>{" "}
            <Score type="Top Score" score={this.state.topScore}></Score>
          </span>
        </nav>

        <div className="jumbotron jumbotron-fluid">
          <div className="container text-center">
            <p className="lead">
              Click on an image to earn points, but don't click on any more than
              once!
            </p>
          </div>
        </div>

        <Wrapper>
          {this.state.pictures.map((picture, index) => (
            <PictureCard
              key={index}
              id={picture.id}
              name={picture.name}
              image={picture.image}
              handleClick={this.handleClick}
            />
          ))}
        </Wrapper>

        <nav className="navbar fixed-bottom">
          <span id="footer-text">Clicky Game</span>
        </nav>
      </div>
    );
  }
}

export default App;
