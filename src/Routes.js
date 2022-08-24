import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

export default () => (
  <Switch>
    <Route path="/" exact component={ Login } />
    <Route path="/foods" exact component={ Foods } />
    <Route path="/drinks" exact component={ Drinks } />
    <Route path="/drinks/:id" exact component={ RecipeDetails } />
    <Route path="/foods/:id" exact component={ RecipeDetails } />
    <Route path="/profile" exact component={ Profile } />
    <Route path="/done-recipes" exact component={ DoneRecipes } />
    <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
    <Route path="/drinks/:id/in-progress" exact component={ RecipeInProgress } />
    <Route path="/foods/:id/in-progress" exact component={ RecipeInProgress } />
  </Switch>
);
