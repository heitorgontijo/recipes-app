import React, { useContext, useEffect, useState } from 'react';
import { string } from 'prop-types';

import fetchCategories from '../services/fetchCategories';

import AppContext from '../context/AppContext';
import * as Styled from './RecipesCategories.styles';

function RecipesCategories({ categoryType }) {
  const [filter, setFilter] = useState({ value: '', filterBy: '' });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { getMealsFromAPI, getDrinksFromAPI } = useContext(AppContext);

  const fetchFromCategory = categoryType === 'meals'
    ? getMealsFromAPI : getDrinksFromAPI;

  const changeFilter = (keyword, filterName) => {
    if (filter.value === keyword && filter.filterBy === filterName) {
      setSelectedCategory('');
      return setFilter({ value: '', filterBy: '' });
    }

    setSelectedCategory(keyword);
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
    <Styled.Categories>
      <Styled.CategoryButton
        data-testid="All-category-filter"
        onClick={ () => changeFilter('', 'name') }
        type="button"
      >
        All
      </Styled.CategoryButton>

      { categories
        .filter((_category, index) => index < MAX_CATEGORIES_LENGTH)
        .map(({ strCategory }) => (
          <Styled.CategoryButton
            data-testid={ `${strCategory}-category-filter` }
            isSelected={ selectedCategory === strCategory }
            key={ strCategory }
            onClick={ () => changeFilter(strCategory, 'category') }
            type="button"
          >
            {strCategory}
          </Styled.CategoryButton>
        ))}
    </Styled.Categories>
  );
}

RecipesCategories.propTypes = { categoryType: string.isRequired };

export default RecipesCategories;
