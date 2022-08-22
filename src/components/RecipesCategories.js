import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';

import fetchCategories from '../services/fetchCategories';

function RecipesCategories({ categoryType }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories(categoryType)
      .then((data) => setCategories(data[categoryType] || []));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MAX_CATEGORIES_LENGTH = 5;

  return (
    <div>
      { categories
        .filter((_category, index) => index < MAX_CATEGORIES_LENGTH)
        .map(({ strCategory }) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            key={ strCategory }
            type="button"
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
