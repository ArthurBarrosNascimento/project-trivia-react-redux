import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    avatarCod: '',
  };

  componentDidMount() {
    this.gravatarAvatar();
  }

  gravatarAvatar = () => {
    const { email } = this.props;
    const cod = md5(email).toString();
    this.setState({
      avatarCod: cod,
    });
  };

  render() {
    const { name } = this.props;
    const { avatarCod } = this.state;
    const score = 0;
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${avatarCod}` }
          alt="profile"
          data-testid="header-profile-picture"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.userReducer.email,
  name: state.userReducer.name,
});

export default connect(mapStateToProps)(Header);
