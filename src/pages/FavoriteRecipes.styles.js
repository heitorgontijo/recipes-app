import styled from 'styled-components';

export const Favorites = styled.main`
  min-height: 100vh;
  background-color: red;
`;

export const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  padding: 10px;
  column-gap: 6px;
`;

export const FilterButton = styled.button`
  background-color: ${({ theme, isSelected }) => (
    isSelected ? theme.theme : theme.tertiary)};
  color: ${({ theme, isSelected }) => (isSelected ? theme.lightColor : theme.fontColor)};
  border-radius: 5px;
  height: 28px;
  width: 80px;
  box-shadow: 0 0 5px rgba(0 0 0 / 15%);
`;
