import storageStarter from './storageStarter';
import getStorage from './getStorage';
import setStorage from './setStorage';

const DONE_RECIPES = 'doneRecipes';

export default (recipe) => {
  storageStarter(DONE_RECIPES, []);
  const stored = getStorage(DONE_RECIPES);
  stored.push(recipe);
  setStorage(DONE_RECIPES, stored);
};
