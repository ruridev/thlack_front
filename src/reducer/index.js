import account from './account.reducer';
import user from './user.reducer';
import workspaces from './workspaces.reducer';
import cache from './cache.reducer';
import chat from './chat.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  account,
  user,
  workspaces,
  cache,
  chat,
});