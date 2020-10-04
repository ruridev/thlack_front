const SET_CURRENT_ACCOUNT = 'SET_CURRENT_ACCOUNT';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const SET_CURRENT_WORKSPACE = 'SET_CURRENT_WORKSPACE';
const SET_CABLE_APP = 'SET_CABLE_APP';
const SET_MODE = 'SET_MODE';
const SET_THEME = 'SET_THEME';
const SET_TOKEN = 'SET_TOKEN';
const REMOVE_TOKEN = 'REMOVE_TOKEN';

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

const setCableAppAction = cableApp => {
  return {
    type: SET_CABLE_APP, 
    cableApp,
  }
}

const setCableApp = cableApp => {
  return dispatch => {
    dispatch(setCableAppAction(cableApp));
  }
}

const setModeAction = mode => {
  return {
    type: SET_MODE, 
    mode,
  }
}

const setMode = mode => {
  return dispatch => {
    dispatch(setModeAction(mode));
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

const setTokenAction = token => {
  return {
    type: SET_TOKEN, 
    token,
  }
}

const setToken = token => {
  return dispatch => {
    dispatch(setTokenAction(token));
  }
}
const removeTokenAction = () => {
  return {
    type: REMOVE_TOKEN,
  }
}

const removeToken = () => {
  return dispatch => {
    dispatch(removeTokenAction());
  }
}

const fetchCurrentChannelDataAction = data => {
  return {
    type: FETCH_CURRENT_CHANNEL_DATA, 
    data,
  }
}
const fetchCurrentChannelData = data => {
  return dispatch => {
    dispatch(fetchCurrentChannelDataAction(data));
  }
}

const fetchCurrentChannelUsersAction = users => {
  return {
    type: FETCH_CURRENT_CHANNEL_USERS, 
    users,
  }
}
const fetchCurrentChannelUsers = users => {
  return dispatch => {
    dispatch(fetchCurrentChannelUsersAction(users));
  }
}

const fetchCurrentChannelMessagesAction = messages => {
  return {
    type: FETCH_CURRENT_CHANNEL_MESSAGES, 
    messages,
  }
}
const fetchCurrentChannelMessages = messages => {
  return dispatch => {
    dispatch(fetchCurrentChannelMessagesAction(messages));
  }
}

export { 
  SET_CURRENT_ACCOUNT,
  setCurrentAccount,
  SET_CURRENT_USER,
  setCurrentUser,
  SET_CURRENT_WORKSPACE,
  setCurrentWorkspace,
  SET_CABLE_APP,
  setCableApp,
  SET_MODE,
  setMode,
  SET_THEME,
  setTheme,
  SET_TOKEN,
  setToken,
  REMOVE_TOKEN,
  removeToken,
  FETCH_CURRENT_CHANNEL_MESSAGES,
  fetchCurrentChannelMessages,
  FETCH_CURRENT_CHANNEL_USERS,
  fetchCurrentChannelUsers,
  FETCH_CURRENT_CHANNEL_DATA,
  fetchCurrentChannelData,
};
