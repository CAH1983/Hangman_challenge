import React, { Component } from "react";
import "./Hangman.css";
import { randomWordGenerated } from "./words";

import img0 from "./Images/0.jpg";
import img1 from "./Images/1.jpg";
import img2 from "./Images/2.jpg";
import img3 from "./Images/3.jpg";
import img4 from "./Images/4.jpg";
import img5 from "./Images/5.jpg";
import img6 from "./Images/6.jpg";

import hangman_logo from "../src/Images/hangman_logo.png";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */

  static defaultProps = {
    maxWrongGuesses: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { numWrong: 0, guessed: new Set(), answer: `${randomWordGenerated}` };
    this.handleGuess = this.handleGuess.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  /*  guessedWord: show current-state of word: if guessed letters are {a,p,e}, show "app_e" for "apple" */
  guessedWord() {
    return this.state.answer.split("").map((letter) => (this.state.guessed.has(letter) ? letter : "_"));
  }

  /** handleGuess: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */

  handleGuess(e) {
    let letter = e.target.value;

    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      numWrong: st.numWrong + (st.answer.includes(letter) ? 0 : 1),
    }));
  }

  generateButtons() {
    const alphabetArr = "abcdefghijklmnopqrstuvwxyz".split("");
    return alphabetArr.map((letter, i) => (
      <button className="keyboard-key" key={`${letter}-${i}`} value={letter} onClick={this.handleGuess} disabled={this.state.guessed.has(letter)}>
        {" "}
        {letter}
      </button>
    ));
  }

  // start again the game
  restartGame() {
    this.setState({
      numWrong: 0,
      guessed: new Set(),
      answer: `${randomWordGenerated}`,
    });
  }

  render() {
    const { numWrong } = this.state;
    let message = "";
    let gameOver = false;

    if (numWrong >= 2) {
      message = `Heyyy! You're in a bad place`;
    }
    if (numWrong >= this.props.maxWrongGuesses) {
      message = `you're dead`;
      gameOver = true;
    }

    return (
      <div className="Hangman">
        <h1>Hangman</h1>

        <img src={this.props.images[numWrong]} alt={`${numWrong} wrong guesses`} />

        <p className="Hangman-word">{this.guessedWord()}</p>
        <p> wrong guesses: {numWrong}</p>

        <p className="Hangman-msg"> {message} </p>

        {gameOver === false && <p className="Hangman-btns">{this.generateButtons()}</p>}

        {gameOver === true && (
          <button className="restart-btn" onClick={this.restartGame}>
            Restart the game !
          </button>
        )}
      </div>
    );
  }
}

export default Hangman;
