import axios from 'axios';
import { getTokenInfo } from '../../services/token/erc1155'


export const FETCH_ERC1155_START = 'FETCH_ERC1155_START';
const fetchErc1155Start = () => ({ type: FETCH_ERC1155_START });

export const FETCH_ERC1155_SUCCESS = 'FETCH_ERC1155_SUCCESS';
const fetchErc1155Success = data => ({ type: FETCH_ERC1155_SUCCESS, data });

export const FETCH_ERC1155_FAILURE = 'FETCH_ERC1155_FAILURE';
const fetchErc1155Failure = () => ({
  type: FETCH_ERC1155_FAILURE,
});

export const fetchErc1155 = (payload) => (dispatch) => {
  dispatch(fetchErc1155Start());

  return getTokenInfo(payload.tokenId).
  			then(result => dispatch(fetchErc1155Success(result)), error => dispatch(fetchErc1155Failure));
};
