import React from "react";
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
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
    userEvent.type(inputName, 'nome');;
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, 'email@email.com');

    expect(screen.getByTestId('btn-play')).not.toHaveAttribute('disabled')
  });
});