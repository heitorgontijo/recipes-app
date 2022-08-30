import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Footer = styled.footer`
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  bottom: 0;
  box-shadow: 0 -5px 5px rgba(0 0 0 / 5%);
  column-gap: 15px;
  display: flex;
  height: 60px;
  justify-content: center;
  left: 0;
  max-width: 400px;
  opacity: 0.9;
  position: fixed;
  right: 0;
`;

export const RedirectLink = styled(Link)`
  align-items: center;
  color: ${({ theme }) => theme.theme};
  display: flex;
  font-size: 2rem;
  height: 60px;
  justify-content: center;
  text-decoration: none;
  width: 60px;
`;
