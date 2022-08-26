import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';

import fetchMealsOrDrinks from '../services/fetchMealsOrDrinks';

import AppContext from './AppContext';

function AppProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [filteredByToggle, setFilteredByToggle] = useState(false);

  const localStorageStarter = (key, value) => {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  useEffect(() => {
    localStorageStarter('favoriteRecipes', []);
    localStorageStarter('inProgressRecipes', { cocktails: {}, meals: {} });
    localStorageStarter('doneRecipes', []);
  }, []);

  const requestAPI = (custom, type) => {
    if (search.length > 1 && searchFilter === 'first-letter') {
      return global.alert('Your search must have only 1 (one) character');
    }

    let fetchParameters;

    if (custom) {
      fetchParameters = custom; setFilteredByToggle(true);
    } else { fetchParameters = [search, searchFilter]; setFilteredByToggle(false); }

    const updateState = type === 'meals' ? setMeals : setDrinks;

    fetchMealsOrDrinks(...fetchParameters, type)
      .then((data) => {
        if (data[type]?.length === 0 || data[type] === null) {
          return global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
        return updateState(data[type] || []);
      });
  };

  const getMealsFromAPI = (custom) => requestAPI(custom, 'meals');
  const getDrinksFromAPI = (custom) => requestAPI(custom, 'drinks');

  const updateSearch = (value) => setSearch(value);
  const updateSearchFilter = (value) => setSearchFilter(value);

  const favoriteRecipe = (recipe, type) => {
    const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const id = recipe.idMeal || recipe.idDrink;

    const recipeDetailsToStore = {
      id,
      type,
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };

    if (storedFavoriteRecipes) {
      const thisRecipeIsStored = storedFavoriteRecipes
        ?.some((stored) => stored.id === id);

      if (thisRecipeIsStored) {
        return localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify(
            [...storedFavoriteRecipes.filter((favorite) => (favorite.id !== id))],
          ),
        );
      }

      return localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...storedFavoriteRecipes, recipeDetailsToStore]),
      );
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify([recipeDetailsToStore]));
  };

  const value = {
    meals,
    drinks,
    search,
    filteredByToggle,
    updateSearch,
    updateSearchFilter,
    getMealsFromAPI,
    getDrinksFromAPI,
    favoriteRecipe,
  };

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: node.isRequired,
};

export default AppProvider;
