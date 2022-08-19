import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Foods from './pages/Foods';
import Login from './pages/Login';

export default () => (
  <Switch>
    <Route path="/" exact component={ Login } />
    <Route path="/foods" exact component={ Foods } />
  </Switch>
);
