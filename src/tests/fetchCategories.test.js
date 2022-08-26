import fetchCategories from '../services/fetchCategories';

describe('Teste da função "fetchCategories"', () => {
  beforeEach(() => global.fetch = jest.fn());

  it('Verifica se o fetch está sendo chamado', () => {
    fetchCategories();
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se o endpoint padrão é o correto', () => {
    fetchCategories();
    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    );
  });

  it('Verifica se o fetch é chamado com o endpoint de bebidas corretamente', () => {
    fetchCategories('drinks');
    expect(fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    );
  });

  it('Verifica se um objeto vazio é retornado em caso de erro na '
    + 'requisição', async() => {
      global.fetch = jest.fn().mockRejectedValue();
      const response = await fetchCategories('drinks');
      expect(response).toEqual({});
  });
});
