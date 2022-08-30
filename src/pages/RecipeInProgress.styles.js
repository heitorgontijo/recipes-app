import styled from 'styled-components';

export const RecipeInProgress = styled.main`
  background-color: ${({ theme }) => theme.background};
  min-height: 100vh;
`;

export const ImageTemplate = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

export const TitleContainer = styled.section`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 5px;
  padding-block: 15px;
  background-color: ${({ theme }) => theme.primary};
  border-bottom: 2px solid ${({ theme }) => theme.tertiary};
  align-items: center;

  & h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
  }
`;

export const IngredientsContainer = styled.section`
  background-color: ${({ theme }) => theme.secondary};
  margin: 15px 10px;
  padding: 12px;
  border-radius: 8px;
  max-height: 300px;
  overflow: auto;

  & h3 {
    margin-bottom: 8px;
  }
`;

export const IngredientsList = styled.ul`
  list-style-type: none;
  line-height: 1.7rem;

  & li {
    & label {
      display: flex;
      column-gap: 5px;
      align-items: center;

      & input {
        accent-color: ${({ theme }) => theme.theme}
      }
    }
  }
`;

export const IngredientItem = styled.li`
  text-decoration: ${({ isChecked }) => (isChecked ? 'line-through' : 'none')};
`;

export const InstructionsContainer = styled(IngredientsContainer)`
  max-height: 350px;
`;

export const FinishButton = styled.button`
  background-color: ${({ theme }) => theme.theme};
  color: ${({ theme }) => theme.lightColor};
  padding: 10px;
  box-shadow: 0 0 5px rgba(0 0 0 / 15%);
  border-radius: 5px;
  text-transform: uppercase;
  margin-top: 20px;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-bottom: 30px;

  &:disabled {
    background-color: ${({ theme }) => theme.tertiary};
    color: ${({ theme }) => theme.fontColor};
    cursor: not-allowed;
  }
`;
