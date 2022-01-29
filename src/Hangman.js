import React, { Component } from "react";
import "./Hangman.css";

import img0 from "./Images/0.jpg";
import img1 from "./Images/1.jpg";
import img2 from "./Images/2.jpg";
import img3 from "./Images/3.jpg";
import img4 from "./Images/4.jpg";
import img5 from "./Images/5.jpg";
import img6 from "./Images/6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */

  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { numWrong: 0, guessed: new Set(), answer: "apple" };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /*  guessedWord: show current-state of word: if guessed letters are {a,p,e}, show "app_e" for "apple" */
  guessedWord() {
    return this.state.answer.split("").map((letter) => (this.state.guessed.has(letter) ? letter : "_"));
  }

  /** handleGuest: handle a guessed letter:
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
    return alphabetArr.map((letter) => (
      <button value={letter} onClick={this.handleGuess} disabled={this.state.guessed.has(letter)}>
        {" "}
        {letter}
      </button>
    ));
  }

  render() {
    return (
      <div className="Hangman">
        <h1>Hangman</h1>

        <img src={this.props.images[this.state.numWrong]} alt="hangman-img" />

        <p className="Hangman-word">{this.guessedWord()}</p>
        <p className="Hangman-btns">{this.generateButtons()}</p>
      </div>
    );
  }
}

export default Hangman;
