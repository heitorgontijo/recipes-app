import styled from 'styled-components';

export const SearchBar = styled.section`
  background-color: ${({ theme }) => theme.secondary};
`;

export const Form = styled.form``;

export const LabelContainer = styled.div`
  column-gap: 10px;
  display: flex;
  justify-content: center;
  padding-block: 20px;
`;

export const FormLabel = styled.label`
  align-items: center;
  background-color: ${({ theme }) => theme.tertiary};
  border-radius: 30px;
  box-shadow: 0 0 15px rgba(0 0 0 / 10%);
  column-gap: 4px;
  cursor: pointer;
  display: flex;
  font-size: 0.8rem;
  font-weight: 600;
  height: 40px;
  padding-inline: 15px;
  text-transform: uppercase;

  & input {
    display: none;

    &:checked + span {
      border-color: ${({ theme }) => theme.theme};

      &:after {
        display: initial;
      }
    }
  }

  & span {
    background-color: ${({ theme }) => theme.primary};
    display: inline-block;
    border: 1px solid ${({ theme }) => theme.tertiary};
    border-radius: 50%;
    height: 16px;
    position: relative;
    width: 16px;

    &:after {
      background-color: ${({ theme }) => theme.theme};
      border-radius: 50%;
      content: '';
      display: none;
      height: 10px;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
    }
  }
`;

export const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.theme};
  border-radius: 5px;
  color: ${({ theme }) => theme.lightColor};
  height: 40px;
  margin-bottom: 20px;
  margin-top: 5px;
  width: 120px;
`;
