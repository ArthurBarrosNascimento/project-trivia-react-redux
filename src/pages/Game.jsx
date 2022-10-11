import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestDataAPI, requestTokenAPI } from '../services/FetchAPI';
import '../style/Game.css';

const CORRECT_ANSWER = 'correct-answer';
const WRONG_ANSWER = 'wrong-answer';

export class Game extends Component {
  state = {
    allAnswers: [], // all the possible anserws for the question
    data: [], // response from requestDataAPI()
    indexOfQuestions: 0, // necessary to go through all questions
    isAnswered: false, // when true, the user answered the question.
    isDataLoad: false, // when true, renders the following informations
  };

  async componentDidMount() {
    const {
      allAnswers, // Getting all the answers for the question from STATE.
    } = this.state;

    // Simulating token on localStorage. This information is sent by the requirement 5.
    const token = await requestTokenAPI();
    localStorage.setItem('token', token);

    const response = await requestDataAPI(); // 6.2  - Receiving question and answer from the Trivia API.

    if (response.length === 0) { // 6.1 - Verifying if we have questions, If we don't token is invalid.
      const {
        history, // Accessing history from props.
      } = this.props;

      localStorage.removeItem('token'); // Removing Token from localStorage.
      history.push('/'); // Redirecting to Login page
    }

    // When isDataLoad to true, it will run functions getAllAnswers() anda suffleAnswers() from AllAnswers.
    // Saving data (questions) on STATE.

    this.setState(
      {
        data: response, // Saving requested data from the response of the requestDataAPI().
        isDataLoad: true, // Using a conditional to run the functions.
      },
      () => this.getAllAnswers(), // runing function
    );
    this.shuffleAllAnswers(allAnswers); // runing function
  }

  // Getting all answers (correct/incorrect), combining in a array and saving on STATE.
  // Index is a helper to find the answers from the same question.

  getAllAnswers = () => {
    const {
      data, // Accessing data from STATE.
      indexOfQuestions, // Accessing index of questions from STATE.
    } = this.state;

    const allAnswers = [ // Heare we are combinnig the correct and wrond answers.
      data[indexOfQuestions].correct_answer, // Getting correct answer.
      ...data[indexOfQuestions].incorrect_answers, // Getting wrong answer. Note that we are using spread operator ... to get all the incorrect answers.
    ];
    this.setState({ allAnswers: this.shuffleAllAnswers(allAnswers) }); // Saving  all the answers on STATE.
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
      isAnswered: true, // when true, start the function
    });
    const findCorrecttAnswer = document.getElementsByClassName(CORRECT_ANSWER); // Find the element of correct answer. It's necessary to set element.
    findCorrecttAnswer[0].style.backgroundColor = 'rgb(51, 208, 51)'; // setting backgroundColorget of correct answer.
    findCorrecttAnswer[0].style.border = '3px solid rgb(6, 240, 15)';// setting boarder of correct answer.

    const findWrongAnswer = document.getElementsByClassName(WRONG_ANSWER); // Find the element of wrong answer. It's necessary to set element.
    for (let answer = 0; answer < findWrongAnswer.length; answer += 1) { // Create a loop to set all the wrong answers.
      findWrongAnswer[answer].style.backgroundColor = 'rgb(235, 81, 81)'; // setting backgroundColorget of correct wrong.
      findWrongAnswer[answer].style.border = '3px solid red'; // setting boarder of correct wrong.
    }
  };

  render() {
    const {
      allAnswers, // Use all the possible anserws for the question
      data, // Get response from requestDataAPI()
      indexOfQuestions, // Necessary to go through all questions from data
      isAnswered, // when true, the user answered the question.
      isDataLoad, // when true, renders the following informations
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
                  disabled={ isAnswered } // Setting isAnswered to false. Use to check if the user answered the question.
                  key={ index }
                  type="button"
                  onClick={ this.isAnswerCorrect } // when button clicked run the function.
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

