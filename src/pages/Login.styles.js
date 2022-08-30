import styled from 'styled-components';

import background from '../assets/images/loginBackground.jpg';
import header from '../assets/images/loginFormHeader.png';

export const Login = styled.main`
  align-items: center;
  background-image: url(${background});
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  min-height: max(100vh, 600px);
`;

export const Form = styled.form`
  animation: 200ms ease-in-out fadeIn;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0 0 0 / 15%);
  display: flex;
  flex-direction: column;
  opacity: 0.96;
  overflow: hidden;
  row-gap: 20px;
`;

export const FormHeader = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  background-image: url(${header});
  background-position: 100%;
  background-size: cover;
  border-bottom: 3px solid ${({ theme }) => theme.theme};
  display: flex;
  height: 140px;
  padding-inline: 25px;

  & h1 {
    color: ${({ theme }) => theme.theme};
    font-size: 2.15rem;

    & span {
      color: ${({ theme }) => theme.fontColor};
    }
  }
`;

export const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  font-weight: 600;
  padding-inline: 25px;
  row-gap: 8px;
`;

export const InputContainer = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.1rem;
  position: relative;

  & :nth-child(2) {
    color: ${({ theme }) => theme.theme};
    position: absolute;
    right: 12px;
  }

  & button {
    align-items: center;
    background-color: transparent;
    bottom: 0;
    display: flex;
    font-size: 1.2rem;
    justify-content: flex-end;
    top: 0;
    width: 30px;
  }
`;

export const FormInput = styled.input`
  background-color: ${({ theme }) => theme.tertiary};
  border: 2px solid transparent;
  border-radius: 5px;
  height: 40px;
  padding-inline: 10px;
  width: 260px;

  &:focus {
    border-color: ${({ theme }) => theme.theme};
  }
`;

export const Submit = styled.button`
  background-color: ${({ theme }) => theme.theme};
  border-radius: 5px;
  color: ${({ theme }) => theme.lightColor};
  height: 40px;
  margin-bottom: 28px;
  margin-inline: auto;
  margin-top: 15px;
  width: 120px;

  &:disabled {
    background-color: ${({ theme }) => theme.tertiary};
    color: ${({ theme }) => theme.fontColor};
    cursor: not-allowed;
  }
`;
