import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import TelaPrincipal from './pages/TelaPrincipal';
import Configurações from './pages/Configuracoes';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/telaprincipal" component={ TelaPrincipal } />
        <Route exact path="/configuracoes" component={ Configurações } />
      </Switch>
    );
  }
}

export default App;
