import styled from 'styled-components';

export const Container = styled.section`
  column-gap: 5px;
  display: flex;
  padding-inline: 5px;
`;

export const ShareContainer = styled.div`
  position: relative;

  & span {
    align-items: center;
    background-color: rgba(0 0 0 / 40%);
    border-radius: 3px;
    color: ${({ theme }) => theme.lightColor};
    display: flex;
    font-size: 0.8rem;
    justify-content: space-between;
    left: 6px;
    padding: 8px;
    position: absolute;
    top: -42px;
    width: 105px;

    & button {
      align-items: center;
      background-color: transparent;
      display: flex;
      justify-content: center;
    }

    &:before {
      bottom: -12px;
      border: 6px solid transparent;
      border-top-color: rgba(0 0 0 / 40%);
      content: '';
      left: 8px;
      position: absolute;
    }
  }
`;

export const ShareButton = styled.button`
  align-items: center;
  background-color: rgba(0 0 0 / 5%);
  border-radius: 50%;
  display: flex;
  font-size: 1.4rem;
  height: 40px;
  justify-content: center;
  width: 40px;
`;

export const FavoriteButton = styled(ShareButton)`
  color: ${({ theme, isFavorite }) => (
    isFavorite ? '#C62828' : theme.darkColor
  )}
`;
