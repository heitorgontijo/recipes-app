import styled from 'styled-components';

const RecipesContainer = styled.section`
  background-color: ${({ theme }) => theme.background};
  box-shadow: inset 0 5px 5px rgba(0 0 0 / 5%);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  height: 464px;
  overflow-y: auto;
  padding-bottom: 80px;
  padding-inline: 10px;
  padding-top: 20px;
  scroll-behavior: smooth;
`;

export default RecipesContainer;
