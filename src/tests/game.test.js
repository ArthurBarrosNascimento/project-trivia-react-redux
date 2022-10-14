import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { questionsResponse } from '../../cypress/mocks/questions';

const INIT_STATE = {
  player: {
    name: 'name',
    assertions: 4,
    score: 120,
    gravatarEmail: 'email@email.com',
  }
}

jest.useRealTimers();
jest.setTimeout(20000);

describe('teste do Game', () => {
  it('teste de respostas', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    renderWithRouterAndRedux(<App />, INIT_STATE, '/game');

    userEvent.click(await screen.findByTestId('correct-answer'));
    expect(await screen.findByTestId('correct-answer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Next/i }));
  });
  it('Teste de tempo', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    renderWithRouterAndRedux(<App />, INIT_STATE, '/game');

    expect(await screen.findByTestId('correct-answer')).toBeInTheDocument();
    await waitFor(() => expect(screen.findByTestId('correct-answer')).toBeDisabled(), { timeout: 33000 });
  });
  it('teste de rota invalida', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ response_code: 3 }),
    });
    renderWithRouterAndRedux(<App />, {}, '/game');

    const nameInput = await screen.findByTestId('input-player-name');
    expect(nameInput).toBeInTheDocument();

    expect(history.location.pathname).toBe('/');
  });
  it('teste apos as perguntas, rota feedback', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    const { history } = renderWithRouterAndRedux(<App />, {}, '/game');

    userEvent.click(await screen.findByTestId('answer-options'));
  
    userEvent.click(screen.getByRole('button', { name: /Next/i }));
    userEvent.click(screen.getByRole('button', { name: /Next/i }));
    userEvent.click(screen.getByRole('button', { name: /Next/i }));
    userEvent.click(screen.getByRole('button', { name: /Next/i }));
    userEvent.click(screen.getByRole('button', { name: /Next/i }));
    userEvent.click(screen.getByRole('button', { name: /Next/i }));
    userEvent.click(screen.getByRole('button', { name: /Next/i }));

    userEvent.click(await screen.findByTestId('answer-options'));
    userEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(history.location.pathname).toBe('/feedback');
  });
});