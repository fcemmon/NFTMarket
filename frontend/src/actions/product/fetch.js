import axios from 'axios';
import { API_URL } from '../../config';


export const FETCH_PRODUCT_START = 'FETCH_PRODUCT_START';
const fetchProductStart = () => ({ type: FETCH_PRODUCT_START });

export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
const fetchProductSuccess = data => ({ type: FETCH_PRODUCT_SUCCESS, data });

export const fetchProduct = (payload) => (dispatch) => {
  dispatch(fetchProductStart());
  const url = `${API_URL}api/product/${payload.id}`;

  return axios.get(url)
    .then(success => dispatch(fetchProductSuccess(success.data)));
};
