import login_account from './account';
import login_user from './user';
import workspaces from './workspace';
import channels from './channel';
import messages from './message';
import { combineReducers } from 'redux';

export default combineReducers({
  login_account,
  login_user,
  workspaces,
  channels,
  messages,
});
