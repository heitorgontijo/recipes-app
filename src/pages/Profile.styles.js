import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Profile = styled.main`
  background-color: ${({ theme }) => theme.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ProfileContent = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  transform: translateY(-60px);
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`;

export const UserIcon = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5px;
  margin-bottom: 15px;
  
  & :first-child {
    font-size: 6rem;
    background-color: ${({ theme }) => theme.secondary};
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0 0 0 / 12%);
  }
`;

export const RedirectButton = styled(Link)`
  text-decoration: none;
  background-color: ${({ theme }) => theme.tertiary};
  width: 220px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.fontColor};
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.2rem;
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0 0 0 / 15%);

  &:hover {
    background-color: ${({ theme }) => theme.theme};
    color: ${({ theme }) => theme.lightColor};
  }
`;

export const Logout = styled.button`
  text-decoration: none;
  background-color: ${({ theme }) => theme.tertiary};
  width: 220px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.fontColor};
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.2rem;
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0 0 0 / 15%);

  & :first-child {
    font-size: 1rem;
    margin-right: 10px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.theme};
    color: ${({ theme }) => theme.lightColor};
  }
`;
