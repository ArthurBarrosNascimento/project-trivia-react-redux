import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Configurações from './pages/Configuracoes';
import Game from './pages/Game';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/configuracoes" component={ Configurações } />
        <Route exact path="/game" component={ Game } />
      </Switch>
    );
  }
}

export default App;
