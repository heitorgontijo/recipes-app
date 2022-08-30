import React from 'react';
import { string, number } from 'prop-types';

import * as Styled from './RecipeCard.styled';

function RecipeCard({ title, category, image, index, to }) {
  return (
    <Styled.RecipeCard data-testid={ `${index}-recipe-card` }>
      <Styled.CardLink to={ to }>
        <Styled.CardImage
          alt="Recipe thumb"
          data-testid={ `${index}-card-img` }
          src={ `${image}` }
        />

        <Styled.TitleContainer>
          <h1 data-testid={ `${index}-card-name` }>{ title }</h1>
          <p>{ category }</p>
        </Styled.TitleContainer>
      </Styled.CardLink>
    </Styled.RecipeCard>
  );
}

RecipeCard.defaultProps = { category: 'Unknown' };

RecipeCard.propTypes = {
  category: string,
  image: string.isRequired,
  index: number.isRequired,
  title: string.isRequired,
  to: string.isRequired,
};

export default RecipeCard;
