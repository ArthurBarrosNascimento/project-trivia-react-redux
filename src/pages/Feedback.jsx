import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  state = {
    quase: false,
  };

  componentDidMount() {
    const { correct } = this.props;
    const minimum = 3;
    if (correct >= minimum) {
      this.setState({ quase: true });
    }
  }

  render() {
    const { quase } = this.state;
    return (
      <div data-testid="feedback-text">
        Feedback
        <div>
          { quase ? (
            <p>Well Done!</p>
          ) : (
            <p>Could be better...</p>
          )}
        </div>
      </div>
    );
  }
}
Feedback.propTypes = {
  correct: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  correct: state.player.correct,
});

export default connect(mapStateToProps)(Feedback);
