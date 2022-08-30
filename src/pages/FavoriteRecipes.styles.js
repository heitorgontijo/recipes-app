import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Favorites = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

export const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  padding: 15px;
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

export const FavoritesContainer = styled.section`
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  max-height: 500px;
  overflow: auto;
`;

export const FavoriteCard = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  width: 100%;
  overflow: hidden;
  height: 140px;
  display: flex;
  box-shadow: 0 0 6px rgba(0 0 0 /12%);
  flex-shrink: 0;
`;

export const RecipeLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.fontColor};
`;

export const ImageTemplate = styled.img`
  width: 150px;
  height: 100%;
  object-fit: cover;
`;

export const RecipeDetails = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 15px;
`;

export const RecipeTitle = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RecipeCategory = styled.p``;
