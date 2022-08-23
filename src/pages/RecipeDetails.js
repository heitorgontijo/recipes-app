import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchRecipeDetails from '../services/fetchRecipeDetails';

function RecipeDetails() {
  const { id } = useParams();

  const [recipeReturn, setRecipeReturn] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const apiCalled = async () => {
      const api = await fetchRecipeDetails(id);
      setRecipeReturn(api);

      if (Object.hasOwn(api, 'meals')) {
        setCategory('meals');
        setIngredients(Object.keys(api.meals[0])
          .filter((e) => e.includes('strIngredient')));
      } else if (Object.hasOwn(api, 'drinks')) {
        setCategory('drinks');
        setIngredients(Object.keys(api.drinks[0])
          .filter((e) => e.includes('strIngredient')));
      }
    };
    apiCalled();
  }, []);

  return (

    <div>
      {category !== '' && (
        <div>
          {console.log(category)}
          <h1>RecipeDetails</h1>
          <img
            width="200px"
            src={ category === 'drinks' ? (recipeReturn.drinks[0].strDrinkThumb)
              : recipeReturn.meals[0].strMealThumb }
            alt="drink"
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">
            {category === 'drinks' ? recipeReturn.drinks[0].strDrink
              : recipeReturn.meals[0].strMeal}
          </h2>
          <p data-testid="recipe-category">
            {category === 'drinks' ? recipeReturn[category][0].strAlcoholic
              : recipeReturn[category][0].strCategory}
          </p>

          {ingredients.map((ingredient, i) => (
            (recipeReturn.meals[0][ingredient] !== null
              && recipeReturn[category][0][ingredient] !== '')
              && (
                <h1 key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                  {recipeReturn[category][0][ingredient]}
                </h1>
              )
          ))}

          {recipeReturn.meals
          && <iframe
            id="player"
            type="text/html"
            width="640"
            height="360"
            title={ recipeReturn.meals[0].strMeal }
            src={ `https://www.youtube.com/embed/${recipeReturn.meals[0].strYoutube.split('=')[1]}` }
            frameBorder="0"
          />}
          ;
        </div>

      ) }
    </div>

  );

  //   </div>
  // ))}

  // </div>
}
// RecipeDetails.propTypes = {
//   category: PropTypes.string,
// }.isRequired;

export default RecipeDetails;
