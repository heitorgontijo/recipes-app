import styled from 'styled-components';

export const RecipeDetails = styled.main`
  background-color: ${({ theme }) => theme.background};
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
`;

export const InstructionsContainer = styled(IngredientsContainer)`
  max-height: 350px;
`;

export const VideoContainer = styled.section`
  padding-inline: 10px;

  & h3 {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  & iframe {
    aspect-ratio: 4 / 3;
    width: 100%;
    height: 220px;
  }
`;

export const RecommendationsTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

export const RecommendationsContainer = styled.section`
  display: flex;
  column-gap: 10px;
  padding-inline: 10px;
  overflow: auto;
  background-color: ${({ theme }) => theme.secondary};
  padding-block: 10px;
  scroll-behavior: smooth;
`;

export const RecommendationCard = styled.div`
  width: calc(50% - 5px);
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.tertiary};
  box-shadow: 0 0 5px rgba(0 0 0 / 15%);

  & img {
    width: 100%;
    height: 130px;
    object-fit: cover;
  }

  & h4 {
    padding: 10px 10px 15px;
  }
`;

export const StartRecipe = styled.button`
  position: fixed;
  bottom: 10px;
  right: 8px;
  background-color: ${({ theme }) => theme.theme};
  color: ${({ theme }) => theme.lightColor};
  padding: 10px;
  box-shadow: 0 0 5px rgba(0 0 0 / 15%);
  border-radius: 5px;
  text-transform: uppercase;
  opacity: 0.85;
`;
