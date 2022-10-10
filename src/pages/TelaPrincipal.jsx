import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TelaPrincipal extends Component {
  handleBtn = () => {
    const { history } = this.props; // Foi usado o history para ao clicar no botao ir para a pagina de configuracoes
    history.push('/configuracoes');
  };

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleBtn }
        >
          Configurações
        </button>
      </div>
    );
  }
}

TelaPrincipal.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default TelaPrincipal;
