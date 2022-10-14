import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
// import Ranking from '../pages/Ranking';

describe('Testa a página de Ranking', () => {
  // const INIT_STATE = {
  //   player: {
  //     name: 'name',
  //     assertions: 4,
  //     score: 120,
  //     gravatarEmail: 'email@email.com'
  //   }
  // }

  it('teste de rota para "/"',  () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/ranking');
    userEvent.click(screen.getByTestId('btn-go-home'))
    expect(history.location.pathname).toBe('/');
  });
})
