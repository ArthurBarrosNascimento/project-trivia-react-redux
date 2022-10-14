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
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedbacks');

    // expect(screen.getByTestId('btn-play-again')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('btn-play-again'));
    expect(history.location.pathname).toBe('/');
  })
  it('teste do caminho do ranking',  () => {
    const { history } = renderWithRouterAndRedux(<App />, {}, '/feedbacks');

    // expect(screen.getByTestId('btn-play-again')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('btn-ranking'));
    expect(history.location.pathname).toBe('/ranking');

  })
});
