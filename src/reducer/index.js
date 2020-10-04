import account from './account';
import user from './user';
import workspaces from './workspaces';
import cache from './cache';
import { combineReducers } from 'redux';

export default combineReducers({
  account,
  user,
  workspaces,
  cache,
});
