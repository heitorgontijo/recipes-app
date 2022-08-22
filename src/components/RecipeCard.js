import React from 'react';
import { string, number } from 'prop-types';

function RecipeCard({ title, category, image, index }) {
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <img
        alt="Recipe thumb"
        data-testid={ `${index}-card-img` }
        src={ `${image}` }
      />

      <h1 data-testid={ `${index}-card-name` }>{ title }</h1>
      <p>{ category }</p>
    </section>
  );
}

RecipeCard.defaultProps = {
  category: 'Recipe',
};

RecipeCard.propTypes = {
  title: string.isRequired,
  category: string,
  image: string.isRequired,
  index: number.isRequired,
};

export default RecipeCard;
