import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';

export default () => (
  <Switch>
    <Route path="/" exact component={ Login } />
    <Route path="/foods" exact component={ Foods } />
    <Route path="/drinks" exact component={ Drinks } />
    <Route path="/profile" exact component={ Profile } />
    <Route path="/done-recipes" exact component={ DoneRecipes } />
    <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
  </Switch>
);
