import storageStarter from './storageStarter';
import getStorage from './getStorage';
import setStorage from './setStorage';

const FAVORITE_RECIPES = 'favoriteRecipes';

export default (recipe) => {
  storageStarter(FAVORITE_RECIPES, []);
  let stored = getStorage(FAVORITE_RECIPES);
  const storedIncludesThisRecipe = stored.some(({ id }) => recipe.id === id);

  if (storedIncludesThisRecipe) {
    stored = stored.filter(({ id }) => recipe.id !== id);
  } else stored.push(recipe);

  setStorage(FAVORITE_RECIPES, stored);
};
