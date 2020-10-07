const SET_CURRENT_ACCOUNT = 'SET_CURRENT_ACCOUNT';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const SET_CURRENT_WORKSPACE = 'SET_CURRENT_WORKSPACE';
const SET_THEME = 'SET_THEME';

const FETCH_CURRENT_CHANNEL_DATA = 'FETCH_CURRENT_CHANNEL_DATA';
const FETCH_CURRENT_CHANNEL_USERS = 'FETCH_CURRENT_CHANNEL_USERS';
const FETCH_CURRENT_CHANNEL_MESSAGES = 'FETCH_CURRENT_CHANNEL_MESSAGES';


const setCurrentAccountAction = account => {
  return {
    type: SET_CURRENT_ACCOUNT, 
    account,
  }
}

const setCurrentAccount = account => {
  return dispatch => {
    dispatch(setCurrentAccountAction(account));
  }
}

const setCurrentUserAction = user => {
  return {
    type: SET_CURRENT_USER, 
    user,
  }
}

const setCurrentUser = user => {
  return dispatch => {
    dispatch(setCurrentUserAction(user));
  }
}

const setCurrentWorkspaceAction = workspace => {
  return {
    type: SET_CURRENT_WORKSPACE, 
    workspace,
  }
}

const setCurrentWorkspace = workspace => {
  return dispatch => {
    dispatch(setCurrentWorkspaceAction(workspace));
  }
}


const setThemeAction = theme => {
  return {
    type: SET_THEME, 
    theme,
  }
}

const setTheme = theme => {
  return dispatch => {
    dispatch(setThemeAction(theme));
  }
}
export { 
  SET_CURRENT_ACCOUNT,
  setCurrentAccount,
  SET_CURRENT_USER,
  setCurrentUser,
  SET_CURRENT_WORKSPACE,
  setCurrentWorkspace,
  SET_THEME,
  setTheme,
};
