const CREATE_ARTICLE = 'CREATE_ARTICLE';
const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
const DELETE_ARTICLE = 'DELETE_ARTICLE';
const GET_ARTICLES = 'GET_ARTICLES';
const HIDDEN_ARTICLE = 'HIDDEN_ARTICLE';
const PRIVATE_ARTICLE = 'PRIVATE_ARTICLE';

const article = (state = null, action) => {
  switch (action.type) {
    case UPDATE_ARTICLE:
      if (state.id !== action.id) {
        return state;
      }
      return action.article;
    case HIDDEN_ARTICLE:
      if (state.id !== action.id) {
        return state;
      }
      return action.article;
    case PRIVATE_ARTICLE:
      if (state.id !== action.id) {
        return state;
      }
      return action.article;
    default:
      return state;
  }
};

const articles = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ARTICLE:
      // todo: page size
      return { data: [action.article, ...state].slice(0, 10), pagination: state.pagination };
    case UPDATE_ARTICLE:
      return { data: state.map(t => article(t, action)), pagination: state.pagination };
    case DELETE_ARTICLE:
      return state;
    case GET_ARTICLES:
      return action.articles;
    case HIDDEN_ARTICLE:
      return { data: state.map(t => article(t, action)), pagination: state.pagination };
    case PRIVATE_ARTICLE:
      return { data: state.map(t => article(t, action)), pagination: state.pagination };
    default:
      return state;
  }
};

export default articles;
