import React from "react";
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { history } from "react-router-dom";

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from "../App";

describe('Teste da tela de login', () => {
  it('verifica se esta na rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/')
  });
  it('teste input name', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId('input-player-name')).toBeInTheDocument()
  });
  it('teste input email', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId('input-gravatar-email')).toBeInTheDocument()
  });
  it('teste verifica que existe botao', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId('btn-play')).toBeInTheDocument()
  });
  it('teste de input para botao desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId('btn-play')).toHaveAttribute('disabled')
  });
  it('teste de input para botao habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    userEvent.type(inputName, 'nome');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, 'email@email.com');

    expect(screen.getByTestId('btn-play')).not.toHaveAttribute('disabled')
  });
  it('teste de rota para /game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    userEvent.type(inputName, 'nome');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, 'email@email.com');
    const handleClick = screen.getByTestId('btn-play');
    userEvent.click(handleClick);
    
    await waitForElementToBeRemoved(handleClick, { timeout: 2000 });
  });
  it('teste do botao configuracao', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId('btn-settings')).toBeInTheDocument()
  });
  it('teste da rota do botao configuracao', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const handleClick = screen.getByTestId('btn-settings');
    userEvent.click(handleClick);
    expect(history.location.pathname).toBe('/configuracoes');
  });
});