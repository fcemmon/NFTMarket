import { FETCH_ERC721_START, FETCH_ERC721_SUCCESS } from '../actions/erc721/fetch'
import { FETCH_ERC1155_START, FETCH_ERC1155_SUCCESS } from '../actions/erc1155/fetch'

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
    case FETCH_ERC721_START:
    case FETCH_ERC1155_START:
		  	return { ...state, isLoading: true, data:[] };
    case FETCH_ERC721_SUCCESS:
    case FETCH_ERC1155_SUCCESS:
    	  return { ...state, isLoading: false, error: null, data: [ ...state.data, ...action.data ]}
    default:
      	return state;
	}
};