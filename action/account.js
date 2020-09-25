import axios from '../axios';
import * as Constants from '../constants';

const createComment = async comment => {
  const response = await axios.post(Constants.API_COMMENTS, {
    article_id: comment.article_id,
    content: comment.content,
  });
  return response;
};

const updateComment = async (id, content) => {
  const response = await axios.put(`${Constants.API_COMMENTS}/${id}`, {
    content: content,
  });
  return response;
};

const deleteComment = async id => {
  const response = await axios.delete(`${Constants.API_COMMENTS}/${id}`);
  return response;
};

const getComments = async params => {
  const response = await axios.get(Constants.API_COMMENTS, {
    params,
  });
  return response;
};

export { createComment, getComments, deleteComment, updateComment };
