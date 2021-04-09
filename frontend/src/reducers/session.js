import { METAMASK_FETCH_START } from '../actions/metamask/fetch'
import { METAMASK_LOGIN_START, METAMASK_LOGIN_SUCCESS } from '../actions/metamask/signin'
import { METAMASK_SIGNUP_START, METAMASK_SIGNUP_SUCCESS } from '../actions/metamask/signup'
import { METAMASK_GET_START, METAMASK_GET_SUCCESS } from '../actions/metamask/get'
import { PUBLISH_PRODUCT_START, PUBLISH_PRODUCT_SUCCESS } from '../actions/opensea/publish'
import { VIEW_PRODUCT_START, VIEW_PRODUCT_SUCCESS } from '../actions/opensea/view'
import { METAMASK_VERIFY_START, METAMASK_VERIFY_SUCCESS } from '../actions/metamask/verify'

const initialState = {
  isLoading: false,
  error: null,
  isLoggedIn:false,
  data: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case PUBLISH_PRODUCT_START:
		case VIEW_PRODUCT_START:
    case METAMASK_VERIFY_START:
		case METAMASK_SIGNUP_START:
		case METAMASK_LOGIN_START:
		case METAMASK_FETCH_START:
		case METAMASK_GET_START:
      	return { ...state, isLoading: true };
    case METAMASK_LOGIN_SUCCESS:
    case METAMASK_VERIFY_SUCCESS:
  		  return { ...state, isLoading: false, error: null, data: action.data}
  	case PUBLISH_PRODUCT_SUCCESS:
  	case VIEW_PRODUCT_SUCCESS:
  	case METAMASK_GET_SUCCESS:
  		return { ...state, isLoading: false, error: null}
  	default:
    		return state;
	}
};