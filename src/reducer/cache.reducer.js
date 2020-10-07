import {
  SET_CURRENT_ACCOUNT, 
  SET_CURRENT_USER, 
  SET_THEME,
  SET_CURRENT_WORKSPACE,
}
from './cache.action';

const initCache = {
  theme: null,
  mode: '',
  current_account: null,
  current_user: null,
  current_workspace: null,
}

const cache = (state = initCache, action) => {
  switch (action.type) {
    case SET_CURRENT_ACCOUNT:
      return { ...state, current_account: action.account };
    case SET_CURRENT_USER:
      return { ...state, current_user: action.user };
    case SET_CURRENT_WORKSPACE:
      return { ...state, current_workspace: action.workspace };
    case SET_THEME:
      return { ...state, theme: action.theme };
    default:
      return state;
  }
};

export default cache;