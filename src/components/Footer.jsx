import React from 'react';
import { MdFastfood } from 'react-icons/md';
import { BiDrink } from 'react-icons/bi';
import { AiFillHeart, AiOutlineFileDone } from 'react-icons/ai';

import * as Styled from './Footer.styles';

function Footer() {
  return (
    <Styled.Footer data-testid="footer">
      <Styled.RedirectLink to="/foods" data-testid="drinks-bottom-btn">
        <MdFastfood />
      </Styled.RedirectLink>

      <Styled.RedirectLink to="/drinks" data-testid="food-bottom-btn">
        <BiDrink />
      </Styled.RedirectLink>

      <Styled.RedirectLink to="/favorite-recipes">
        <AiFillHeart />
      </Styled.RedirectLink>

      <Styled.RedirectLink to="/done-recipes">
        <AiOutlineFileDone />
      </Styled.RedirectLink>
    </Styled.Footer>
  );
}

export default Footer;
