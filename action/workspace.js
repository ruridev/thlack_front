import axios from '../axios';
import * as Constants from '../constants';

const createArticle = async article => {
  const response = await axios.post(Constants.API_ARTICLES, {
    category_id: article.category_id,
    title: article.title,
    content: article.content,
    tags: article.tags.join(','),
    input_type: article.input_type,
  });
  return response;
};

const updateArticle = async article => {
  const response = await axios.put(`${Constants.API_ARTICLES}/${article.id}`, {
    title: article.title,
    content: article.content,
    tags: article.tags.join(','),
    input_type: article.input_type,
  });
  return response;
};

const deleteArticle = id => {
  const response = axios.delete(`${Constants.API_ARTICLES}/${id}`);
  return response;
};

const getArticles = async params => {
  const response = await axios.get(Constants.API_ARTICLES, {
    params,
  });
  return response;
};

const getArticle = async id => {
  const response = await axios.get(`${Constants.API_ARTICLES}/${id}`);
  return response;
};

const hiddenArticle = id => {
  return true;
  // TODO: 게시물 숨기기
  // const response = await axios.put(`${Constants.API_ARTICLES}/${id}/hidden`);
  // return response;
};

const privateArticle = id => {
  return true;

  // TODO: 게시물 비공개
  // const response = await axios.put(`${Constants.API_ARTICLES}/${id}/hidden`);
  // return response;
};

export {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticle,
  getArticles,
  hiddenArticle,
  privateArticle,
};
