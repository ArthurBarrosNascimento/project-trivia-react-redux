import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestDataAPI, requestTokenAPI } from '../services/FetchAPI';

export class Game extends Component {
  state = {
    allAnswers: [],
    isDataLoad: false,
    data: [],
    index: 0,
    classNameCorrect: '',
    classNameWrong: '',
  };

  async componentDidMount() {
    // Getting all the answers for the question from STATE.
    const { allAnswers } = this.state;

    // Simulating token on localStorage. This information is sent by the requirement 5.
    const token = await requestTokenAPI();
    localStorage.setItem('token', token);

    // 6.2  - Receiving question and answer alternatives from the Trivia API.
    const response = await requestDataAPI();

    // // Creating data (questions) on localStorage. Acredito que não tenha a necessidade.
    // localStorage.setItem('data', JSON.stringify(response));

    // 6.1 - If you don't have questions your token is invalid.
    if (response.length === 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }

    // When isDataLoad to true, it will run functions getAllAnswers() anda suffleAnswers() from AllAnswers.
    // Saving data (questions) on STATE.
    this.setState({
      data: response,
      isDataLoad: true,
    }, () => this.getAllAnswers());
    this.shuffleAllAnswers(allAnswers);

  }

  // Getting all answers (correct/incorrect), combining in const allAnswers and setting on STATE.
  // Index is a helper to find the answers from the same question.
  getAllAnswers = () => {
    const { data, index } = this.state;
    const allAnswers = [
      data[index].correct_answer,
      ...data[index].incorrect_answers,
    ];
    this.setState({ allAnswers: this.shuffleAllAnswers(allAnswers) });
  };


  // Shuffling all answers.
  shuffleAllAnswers = (AllAnswers) => {
    for (let i = AllAnswers.length - 1; i > 0; i -= 1) {
      // Choosing random element
      const j = Math.floor(Math.random() * (i + 1));
      // Repositioning element
      [AllAnswers[i], AllAnswers[j]] = [AllAnswers[j], AllAnswers[i]];
    }
    console.log(AllAnswers);
    return AllAnswers;
  };

  render() {
    const {
      allAnswers,
      isDataLoad,
      data,
      classNameCorrect,
      classNameWrong,
      index } = this.state;

    return (
      <>
        <div id="game">
          <section id="question">
            {isDataLoad && <h4 data-testid="question-category">{data[index].category}</h4>}
            {isDataLoad && <h3 data-testid="question-text">{data[index].question}</h3>}
          </section>
          <section id="answers" data-testid="answer-options">
            {isDataLoad && allAnswers.map((item, index) => (
              <button
                data-testid={
                  item === data[index]
                    .correct_answer ? 'correct-answer' : `wrong-answer-${index}`
                }
                key={ index }
                id={
                  item === data[index]
                    .correct_answer ? 'correct-answer' : 'wrong-answer'
                }
                name={
                  item === data[index]
                    .correct_answer ? 'correct-answer' : `wrong-answer-${index}`
                }
                type="button"
                className={ item === data[index]
                  .correct_answer ? classNameCorrect : classNameWrong }
              >
                {item}
              </button>
            ))}
          </section>
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Game);
