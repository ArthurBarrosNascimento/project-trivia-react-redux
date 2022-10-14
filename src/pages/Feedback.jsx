import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Feedback extends Component {
  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    return (
      <div>
        Feedback
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// class Feedback extends Component {
//   state = {
//     quase: false,
//   };

//   componentDidMount() {
//     const { correct } = this.props;
//     const minimum = 3;
//     if (correct >= minimum) {
//       this.setState({ quase: true });
//     }
//   }

//   render() {
//     const { quase } = this.state;
//     return (
//       <div data-testid="feedback-text">
//         Feedback
//         <div>
//           { quase ? (
//             <p>Well Done!</p>
//           ) : (
//             <p>Could be better...</p>
//           )}
//         </div>
//       </div>
//     );
//   }
// }
// Feedback.propTypes = {
//   correct: PropTypes.number.isRequired,
// };

// const mapStateToProps = (state) => ({
//   correct: state.player.correct,
// });

// export default connect(mapStateToProps)(Feedback);
