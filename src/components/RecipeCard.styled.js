import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const RecipeCard = styled.section`
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0 0 0 / 20%);
  max-height: 160px;
  min-height: 160px;
  overflow: hidden;
  transition: 50ms;
  width: 160px;

  &:hover {
    transform: scale(1.05);
  }
`;

export const CardLink = styled(Link)`
  color: ${({ theme }) => theme.fontColor};
  text-decoration: none;
`;

export const CardImage = styled.img`
  height: 100px;
  object-fit: cover;
  width: 100%;
`;

export const TitleContainer = styled.div`
  margin-top: 5px;
  padding-inline: 8px;

  & h1 {
    color: ${({ theme }) => theme.theme};
    font-size: 1.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & p {
    font-size: 0.9rem;
  }
`;
