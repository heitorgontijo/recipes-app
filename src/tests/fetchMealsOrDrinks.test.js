import fetchMealsOrDrinks from '../services/fetchMealsOrDrinks';

describe('Teste da função "fetchMealsOrDrinks"', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
  });

  it('Verifica se o fetch está sendo chamado', () => {
    fetchMealsOrDrinks('meal', 'category', 'meals');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Verifica se o fetch é chamado com o endpoint correto', () => {
    const mealsEndpoint = 'https://www.themealdb.com/api/json/v1/1/search'
      + '.php?s=comidaDeTeste';
    
    fetchMealsOrDrinks('comidaDeTeste', 'name', 'meals');
    expect(fetch).toHaveBeenCalledWith(mealsEndpoint);

    const drinksEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/'
      + 'search.php?s=bebidaDeTeste';
    
    fetchMealsOrDrinks('bebidaDeTeste', 'name', 'drinks');
    expect(fetch).toHaveBeenCalledWith(drinksEndpoint);

    const firstLetterFilter = 'https://www.themealdb.com/api/json/v1/1/search'
    + '.php?f=c';

    fetchMealsOrDrinks('c', 'first-letter', 'meals');
    expect(fetch).toHaveBeenCalledWith(firstLetterFilter);

    const ingredientFilter = 'https://www.thecocktaildb.com/api/json/v1/1/'
      + 'filter.php?i=bebidaDeTeste';

    fetchMealsOrDrinks('bebidaDeTeste', 'ingredient', 'drinks');
    expect(fetch).toHaveBeenCalledWith(ingredientFilter);

    const categoryFilter = 'https://www.themealdb.com/api/json/v1/1/search'
      + 'filter.php?c=comidaDeTeste';

    expect(fetch).toHaveBeenCalledTimes(4);
  });

  it('Verifica se o retorno da função é um objeto vazio quando houver '
    + 'alguma falha na requisição', async () => {
      global.fetch = jest.fn().mockRejectedValue();
      expect(await fetchMealsOrDrinks()).toEqual({});
  });
});