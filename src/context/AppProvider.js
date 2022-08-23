import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';

import fetchMealsOrDrinks from '../services/fetchMealsOrDrinks';
import fetchRecipeDetails from '../services/fetchRecipeDetails';

import AppContext from './AppContext';

function AppProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [recipeReturn, setRecipeReturn] = useState([]);
  const [idHistory, setIdHistory] = useState(0);

  const ALERT_OF_EMPTY_RESPONSE = 'Sorry, we haven\'t found any '
    + 'recipes for these filters.';

  const requestAPI = (type) => {
    if (search.length > 1 && searchFilter === 'first-letter') {
      return global.alert('Your search must have only 1 (one) character');
    }

    const updateState = type === 'meals' ? setMeals : setDrinks;

    fetchMealsOrDrinks(search, searchFilter, type)
      .then((data) => {
        if (data[type]?.length === 0 || data[type] === null) {
          global.alert(ALERT_OF_EMPTY_RESPONSE);
        }
        return updateState(data[type] || []);
      });
  };

  const getMealsFromAPI = () => requestAPI('meals');
  const getDrinksFromAPI = () => requestAPI('drinks');

  const updateSearch = (value) => setSearch(value);
  const updateSearchFilter = (value) => setSearchFilter(value);

  useEffect(() => {
    const apiCalled = async () => {
      const api = await fetchRecipeDetails('178319');
      setRecipeReturn(api);
    };
    apiCalled();
  }, []);

  const value = {
    meals,
    drinks,
    search,
    updateSearch,
    updateSearchFilter,
    getMealsFromAPI,
    getDrinksFromAPI,
    idHistory,
    setIdHistory,
    recipeReturn,
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
