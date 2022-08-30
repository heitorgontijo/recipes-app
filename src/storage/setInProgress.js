import storageStarter from './storageStarter';
import getStorage from './getStorage';
import setStorage from './setStorage';

const IN_PROGRESS = 'inProgressRecipes';

export default (id, ingredient, recipeType) => {
  storageStarter(IN_PROGRESS, { cocktails: {}, meals: {} });
  const stored = getStorage(IN_PROGRESS);
  let ingredientsChecked;

  const alreadyExists = stored[recipeType][id];
  if (alreadyExists) {
    if (alreadyExists.includes(ingredient)) {
      ingredientsChecked = alreadyExists.filter((value) => value !== ingredient);
    } else ingredientsChecked = [...alreadyExists, ingredient];
  }

  setStorage(
    IN_PROGRESS,
    {
      ...stored,
      [recipeType]: { ...stored[recipeType], [id]: ingredientsChecked || [ingredient] },
    },
  );
};
