import axios from 'axios';
import { getTokenInfo } from '../../services/token/erc721'


export const FETCH_ERC721_START = 'FETCH_ERC721_START';
const fetchErc721Start = () => ({ type: FETCH_ERC721_START });

export const FETCH_ERC721_SUCCESS = 'FETCH_ERC721_SUCCESS';
const fetchErc721Success = data => ({ type: FETCH_ERC721_SUCCESS, data });

export const FETCH_ERC721_FAILURE = 'FETCH_ERC721_FAILURE';
const fetchErc721Failure = () => ({
  type: FETCH_ERC721_FAILURE,
});

export const fetchErc721 = (payload) => (dispatch) => {
  dispatch(fetchErc721Start());

  return getTokenInfo(payload.tokenId).
  			then(result => dispatch(fetchErc721Success(result)), error => dispatch(fetchErc721Failure));
};
