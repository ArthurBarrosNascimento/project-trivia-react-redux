import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Teste da Feedback page', () => {
  it('Teste da tela', () => {
    renderWithRouterAndRedux(<App />, {}, '/feedback'); 

    expect(screen.getByTestId('feedback-text')).toBeInTheDocument();
    
  });
   it('teste de click play again',  () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

    expect(screen.getByRole('button', { name: /play again/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /play again/i }));
    expect(history.location.pathname).toBe('/');
  })
  it('teste do caminho do ranking',  () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');

    expect(screen.getByRole('button', { name: /ranking/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /ranking/i }));
    expect(history.location.pathname).toBe('/ranking');

  })
});
