import React, { useContext, useEffect, useState } from 'react';
import { string } from 'prop-types';

import fetchCategories from '../services/fetchCategories';

import AppContext from '../context/AppContext';

function RecipesCategories({ categoryType }) {
  const [filter, setFilter] = useState({ value: '', filterBy: '' });
  const [categories, setCategories] = useState([]);

  const { getMealsFromAPI, getDrinksFromAPI } = useContext(AppContext);

  const fetchFromCategory = categoryType === 'meals'
    ? getMealsFromAPI : getDrinksFromAPI;

  const changeFilter = (keyword, filterName) => {
    const { value, filterBy } = filter;

    if (value === keyword && filterBy === filterName) {
      return setFilter({ value: '', filterBy: '' });
    }
    return setFilter({ value: keyword, filterBy: filterName });
  };

  useEffect(() => {
    fetchCategories(categoryType)
      .then((data) => setCategories(data[categoryType] || []));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchFromCategory([filter.value, filter.filterBy]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const MAX_CATEGORIES_LENGTH = 5;

  return (
    <div>
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => changeFilter('', 'name') }
      >
        All
      </button>

      { categories
        .filter((_category, index) => index < MAX_CATEGORIES_LENGTH)
        .map(({ strCategory }) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            key={ strCategory }
            type="button"
            onClick={ () => changeFilter(strCategory, 'category') }
          >
            {strCategory}
          </button>
        ))}
    </div>
  );
}

RecipesCategories.propTypes = {
  categoryType: string.isRequired,
};

export default RecipesCategories;
