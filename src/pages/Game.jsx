import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestDataAPI, requestTokenAPI } from '../services/FetchAPI';
import '../style/Game.css';

const CORRECT_ANSWER = 'correct-answer';
const WRONG_ANSWER = 'wrong-answer';

export class Game extends Component {
  state = {
    allAnswers: [],
    data: [],
    indexOfQuestions: 0,
    isDataLoad: false,
    isResolved: false,
  };

  async componentDidMount() {
    const {
      allAnswers, // Getting all the answers for the question from STATE.
    } = this.state;

    // Simulating token on localStorage. This information is sent by the requirement 5.
    const token = await requestTokenAPI();
    localStorage.setItem('token', token);

    const response = await requestDataAPI(); // 6.2  - Receiving question and answer alternatives from the Trivia API.

    if (response.length === 0) { // 6.1 - If you don't have questions your token is invalid.
      const {
        history,
      } = this.props;

      localStorage.removeItem('token');
      history.push('/');
    }

    // When isDataLoad to true, it will run functions getAllAnswers() anda suffleAnswers() from AllAnswers.
    // Saving data (questions) on STATE.

    this.setState(
      {
        data: response,
        isDataLoad: true,
      },
      () => this.getAllAnswers(),
    );
    this.shuffleAllAnswers(allAnswers);
  }

  // Getting all answers (correct/incorrect), combining in const allAnswers and setting on STATE.
  // Index is a helper to find the answers from the same question.

  getAllAnswers = () => {
    const {
      data,
      indexOfQuestions,
    } = this.state;

    const allAnswers = [
      data[indexOfQuestions].correct_answer,
      ...data[indexOfQuestions].incorrect_answers,
    ];
    this.setState({ allAnswers: this.shuffleAllAnswers(allAnswers) });
  };

  shuffleAllAnswers = (AllAnswers) => { // Shuffling all answers.
    for (let i = AllAnswers.length - 1; i > 0; i -= 1) { // Choosing random element
      const j = Math.floor(Math.random() * (i + 1));
      [AllAnswers[i], AllAnswers[j]] = [AllAnswers[j], AllAnswers[i]]; // Repositioning element
    }
    return AllAnswers;
  };

  isAnswerCorrect = () => {
    this.setState({
      isResolved: true,
    });
    const correctAnswer = document.getElementsByClassName(CORRECT_ANSWER);
    correctAnswer[0].style.backgroundColor = 'rgb(51, 208, 51)';
    correctAnswer[0].style.border = '3px solid rgb(6, 240, 15)';
    const wrongAnswer = document.getElementsByClassName(WRONG_ANSWER);
    for (let answer = 0; answer < wrongAnswer.length; answer += 1) {
      wrongAnswer[answer].style.backgroundColor = 'rgb(235, 81, 81)';
      wrongAnswer[answer].style.border = '3px solid red';
    }
  };

  render() {
    const {
      allAnswers, // all the possible anserws for the question
      data, // response from requestDataAPI()
      isDataLoad, // when true, renders the following informations
      isResolved,
      indexOfQuestions, // necessary to go through all questions from data
    } = this.state;

    return (
      <main id="game">
        <div className="info-question">
          <section className="question">
            {isDataLoad && (
              <h4 data-testid="question-category">{data[indexOfQuestions].category}</h4> // getting the question category
            )}
            {isDataLoad && (
              <h3 data-testid="question-text">{data[indexOfQuestions].question}</h3>// getting the question
            )}
          </section>
          <section className="answer-options" data-testid="answer-options">
            {isDataLoad
              && allAnswers.map((item, index) => ( // using .map to go through all answers
                <button
                  id="answer"
                  data-testid={
                    item === data[indexOfQuestions].correct_answer // using ternary operator to set the data-testid according to type of answer.
                      ? CORRECT_ANSWER // if answer is correct
                      : `${WRONG_ANSWER}-${index}` // if answer is wrong and index
                  }
                  value={
                    item === data[indexOfQuestions].correct_answer // using ternary operator to set the data-testid according to type of answer.
                      ? CORRECT_ANSWER // if answer is correct
                      : `${WRONG_ANSWER}-${index}` // if answer is wrong and index
                  }
                  className={
                    item === data[indexOfQuestions].correct_answer // using ternary operator to set the data-testid according to type of answer.
                      ? CORRECT_ANSWER // if answer is correct
                      : WRONG_ANSWER // if answer is wrong and index
                  }
                  disabled={ isResolved }
                  key={ index }
                  type="button"
                  onClick={ this.isAnswerCorrect }
                >
                  {item}
                </button>
              ))}
          </section>
        </div>
      </main>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Game);
