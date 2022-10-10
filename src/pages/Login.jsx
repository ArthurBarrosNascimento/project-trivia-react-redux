import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fecthIsRequired } from '../redux/actions';
// import PropTypes from 'prop-types';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    isBtnDisabled: true,
  };

  // async componentDidMount() {
  //   const { dispatchApi } = this.props;
  //   await dispatchApi();
  // }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  isNameValid = (name) => {
    const nameRegex = /^[a-zA-Zà-úÀ-Ú\s]+$/;
    return nameRegex.test(name);
  };

  verifyBtn = () => {
    const { name, email } = this.state;
    const Emailregex = /\S+@\S+\.\S+/;
    const verifyEmail = Emailregex.test(email); // true
    const verifyName = this.isNameValid(name); // true
    this.setState({ isBtnDisabled: !(verifyEmail && verifyName) }); // false
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatchApi, history } = this.props;
    await dispatchApi();
    this.guardStore();
    history.push('/game');
  };

  guardStore = () => {
    const { token } = this.props;
    localStorage.setItem('token', token);
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          placeholder="Qual é o seu e-mail do gravatar?"
          onChange={ this.handleInput }
        />
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          placeholder="Qual é o seu nome?"
          onChange={ this.handleInput }
        />
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ isBtnDisabled }
          // onClick={ this.handleBtn }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatchApi: PropTypes.func.isRequired,
  history: PropTypes.arrayOf([PropTypes.string]).isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.exampleReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchApi: () => dispatch(fecthIsRequired()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
