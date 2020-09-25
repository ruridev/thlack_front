import axios from '../axios';
import * as Constants from '../constants';

const getTag = async id => {
  const response = await axios.get(`${Constants.API_TAGS}/${id}`);
  return response;
};

const getTags = async () => {
  const response = await axios.get(Constants.API_TAGS);
  return response;
};

export { getTag, getTags };
