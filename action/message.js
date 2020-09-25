import axios from '../axios';
import * as Constants from '../constants';

const GET_CATEGORIES = 'GET_CATEGORIES';

const getCategoriesAction = categories => {
  return { type: GET_CATEGORIES, categories };
};

const getCategories = () => {
  return dispatch => {
    axios.get(Constants.API_CATEGORIES).then(res => dispatch(getCategoriesAction(res.data)));
  };
};

export { GET_CATEGORIES, getCategories };
