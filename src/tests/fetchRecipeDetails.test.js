import fetchRecipeDetails from '../services/fetchRecipeDetails';

describe('Teste da função "fetchRecipeDetails"', () => {
  beforeEach(() => global.fetch = jest.fn());

  it('Verifica se o fetch está sendo chamado', () => {
    fetchRecipeDetails();
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se o endpoint é o correto (meals)', () => {
    fetchRecipeDetails('52977', 'meals');
    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977',
    );
  });

  it('Verifica se o endpoint é o correto (drinks)', () => {
    fetchRecipeDetails('15997', 'drinks');
    expect(fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997',
    );
  });

  it('Verifica se um objeto vazio é retornado em caso de erro na '
    + 'requisição', async() => {
      global.fetch = jest.fn().mockRejectedValue();
      const response = await fetchRecipeDetails('drinks');
      expect(response).toEqual({});
  });
});
