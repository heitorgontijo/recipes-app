import styled from 'styled-components';

export const Header = styled.header`
  position: relative;
`;

export const TitleContainer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.theme};
  color: ${({ theme }) => theme.lightColor};
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding-inline: 10px;
  position: relative;
  z-index: 2;

  & h1 {
    flex-grow: 1;
    padding-left: 15px;
  }
`;

export const ProfileButton = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.theme};
  border-radius: 50%;
  color: ${({ theme }) => theme.lightColor};
  display: flex;
  font-size: 1.8rem;
  height: 50px;
  justify-content: center;
  width: 50px;
`;

export const SearchButton = styled(ProfileButton)`
  font-size: 1.4rem;
`;

export const InputContainer = styled.div`
  animation: 100ms linear sliderDown;
  background-color: ${({ theme }) => theme.primary};
  bottom: 0;
  box-shadow: 0 5px 5px rgba(0 0 0 / 10%);
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  transform: translateY(100%);
  z-index: 1;

  & > input {
    background-color: ${({ theme }) => theme.secondary};
    border: 2px solid transparent;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0 0 0 / 12%);
    height: 40px;
    margin-block: 20px;
    padding-inline: 10px;
    width: 270px;

    &:focus {
      border-color: ${({ theme }) => theme.theme};
    }
  }

  @keyframes sliderDown {
    from {
      bottom: 100%;
      transform: translateY(0);
    }

    to {
      bottom: 0;
      transform: translateY(100%);
    }
  }
`;
