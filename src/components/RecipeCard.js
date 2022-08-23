import React from 'react';
import { Link } from 'react-router-dom';
import { string, number } from 'prop-types';

function RecipeCard({ title, category, image, index, to }) {
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <Link to={ to }>
        <img
          alt="Recipe thumb"
          data-testid={ `${index}-card-img` }
          src={ `${image}` }
        />

        <h1 data-testid={ `${index}-card-name` }>{ title }</h1>
        <p>{ category }</p>
      </Link>
    </section>
  );
}

RecipeCard.defaultProps = {
  category: 'Unknown',
};

RecipeCard.propTypes = {
  title: string.isRequired,
  category: string,
  image: string.isRequired,
  index: number.isRequired,
  to: string.isRequired,
};

export default RecipeCard;
