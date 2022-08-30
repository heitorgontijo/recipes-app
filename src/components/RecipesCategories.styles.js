import styled from 'styled-components';

export const Categories = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  padding-block: 12px;
`;

export const CategoryButton = styled.button`
  align-items: center;
  background-color: ${({ isSelected, theme }) => (
    isSelected ? theme.theme : theme.tertiary
  )};
  border-radius: 5px;
  box-shadow: 0 0 4px rgba(0 0 0 / 12%);
  color: ${({ isSelected, theme }) => (
    isSelected ? theme.lightColor : theme.fontColor
  )};
  display: flex;
  font-size: 0.7rem;
  font-weight: 600;
  height: 30px;
  justify-content: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  width: 30%;
`;
