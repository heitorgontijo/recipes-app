import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { string, shape, bool } from 'prop-types';
import { FiShare2 } from 'react-icons/fi';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { GrFormClose } from 'react-icons/gr';

import copy from 'clipboard-copy';
import setDataToFavorite from '../utils/setDataToFavorite';
import setFavorite from '../storage/setFavorite';
import getStorage from '../storage/getStorage';

import * as Styled from './FavoriteAndShare.styles';

export default function FavoriteAndShare({ recipe, link, onlyShare, onlyFavorite }) {
  const { id } = useParams();

  const [isFavorite, setIsFavorite] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const copyLink = () => { setLinkCopied(true); copy(link); };

  const setFavoriteToStorage = () => {
    setIsFavorite(!isFavorite); setFavorite(setDataToFavorite(recipe));
  };

  useEffect(() => {
    setIsFavorite(
      getStorage('favoriteRecipes', []).some((favorite) => favorite.id === id),
    );
  }, []);

  return (
    <Styled.Container>
      { !onlyFavorite && (
        <Styled.ShareContainer>
          <Styled.ShareButton type="button" onClick={ copyLink }>
            <FiShare2 />
          </Styled.ShareButton>

          { linkCopied && (
            <span>
              Link copied!

              <button type="button" onClick={ () => setLinkCopied(false) }>
                <GrFormClose />
              </button>
            </span>
          ) }
        </Styled.ShareContainer>
      ) }

      { !onlyShare && (
        <Styled.FavoriteButton
          type="button"
          isFavorite={ isFavorite }
          onClick={ setFavoriteToStorage }
        >
          { isFavorite ? <MdFavorite /> : <MdFavoriteBorder /> }
        </Styled.FavoriteButton>
      ) }
    </Styled.Container>
  );
}

FavoriteAndShare.defaultProps = { onlyFavorite: false, onlyShare: false };

FavoriteAndShare.propTypes = {
  link: string.isRequired,
  onlyFavorite: bool,
  onlyShare: bool,
  recipe: shape({ srtCategory: string }).isRequired,
};
