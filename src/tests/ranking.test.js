import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a página de Ranking', () => {
  const INIT_STATE = {
    player: {
      name: 'name',
      assertions: 4,
      score: 120,
      gravatarEmail: 'email@email.com'
    }
  }
  it('teste da pagina ranking', () => {
    renderWithRouterAndRedux(<App />, INIT_STATE, '/ranking');

    expect(screen.getByRole('button', { name: /Ínicio/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Ínicio/i }));
    
    expect(screen.getByRole('heading', { level: 2, name: /Login/i })).toBeInTheDocument();
  });
})