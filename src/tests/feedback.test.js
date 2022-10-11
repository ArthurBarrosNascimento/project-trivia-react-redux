import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Teste da Feedback page', () => {
  it('Teste da tela', () => {
    renderWithRouterAndRedux(<App />,{} ,'/feedback'); //dentro das chaves vazias, reproduzir o estado global
    expect(screen.getAllByTestId('feedback-total-score')).toBeInTheDocument();
    expect(screen.getAllByTestId('feedback-total-question')).toBeInTheDocument();
    expect(screen.getByText('feedback-text')).toBeInTheDocument();s
    expect(screen.getByText('btn-play-again')).toBeInTheDocument();
    expect(screen.getByText('btn-ranking')).toBeInTheDocument();
  });
  it('verifica acertos', async() => {
    const { history } = renderWithRouterAndRedux(<App />,{} ,'/feedbacks'); //dentro das chaves vazias, reproduzir o estado global

     userEvent.type(screen.getByRole('textbox', { name: /email:/i }), 'email@email.com');
     userEvent.type(screen.getByRole('textbox', { name: /usuário:/i }), 'name');
     userEvent.click(screen.getByTestId('btn-play'));

     await waitFor(() => { expect(history.location.pathname).toEqual('/game') })

     await waitFor(() => { expect(screen.getByTestId('correct-answer')).toBeInTheDocument();

         userEvent.click(screen.getByTestId('correct-answer'));
         expect(screen.getByTestId('btn-next')).toBeInTheDocument();

         userEvent.click(screen.getByTestId('btn-next'));
         userEvent.click(screen.getByTestId('correct-answer'));
         userEvent.click(screen.getByTestId('btn-next'));
         userEvent.click(screen.getByTestId('correct-answer'));
         userEvent.click(screen.getByTestId('btn-next'));
         userEvent.click(screen.getByTestId('correct-answer'));
         userEvent.click(screen.getByTestId('btn-next'));
         userEvent.click(screen.getByTestId('correct-answer'));
         userEvent.click(screen.getByTestId('btn-next'));

         expect(screen.getByText(/Well Done!/i)).toBeInTheDocument();
     });
     it('teste de click play again', async () => {
      const { history } = renderWithRouterAndRedux(<App />,{} ,'/feedback'); //dentro das chaves vazias, reproduzir o estado global
      expect(screen.getByTestId('btn-play-again')).toBeInTheDocument();

      userEvent.click(screen.getByTestId('btn-play-again'));
      expect(history.location.pathname).toBe('/')
  })
    it('teste do caminho do ranking', async () => {
      const { history } = renderWithRouterAndRedux(<App />,{} ,'/feedback'); //dentro das chaves vazias, reproduzir o estado global

      expect(screen.getByRole('button', { name: /ranking/i }).toBeInTheDocument());

      userEvent.click(screen.getByRole('button', { name: /ranking/i }));
      expect(history.location.pathname).toBe('/ranking');
  })
  })
});
