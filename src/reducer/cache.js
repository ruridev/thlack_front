import actionCreator from '../action/index';
const {
  SET_CURRENT_ACCOUNT, 
  SET_CURRENT_USER, 
  SET_CURRENT_WORKSPACE, 
  SET_CABLE_APP,
  SET_MODE,
  SET_THEME,
  SET_TOKEN,
  REMOVE_TOKEN,
  FETCH_CURRENT_CHANNEL_DATA,
  FETCH_CURRENT_CHANNEL_USERS,
  FETCH_CURRENT_CHANNEL_MESSAGES,
} = actionCreator.cache;

const initCache = {
  theme: null,
  cableApp: null,
  mode: '',
  token: null,
  current_account: null,
  current_user: null,
  current_workspace: null,
  current_channel_data: {},
  current_channel_users: [],
  current_channel_messages: [],
}

const cache = (state = initCache, action) => {
  switch (action.type) {
    case SET_CURRENT_ACCOUNT:
      return { ...state, current_account: action.account };
    case SET_CURRENT_USER:
      return { ...state, current_user: action.user };
    case SET_CURRENT_WORKSPACE:
      return { ...state, current_workspace: action.workspace };
    case SET_CABLE_APP:
      return { ...state, cableApp: action.cableApp };
    case SET_MODE:
      return { ...state, mode: action.mode };
    case SET_THEME:
      return { ...state, theme: action.theme };
    case SET_TOKEN:
      return { ...state, token: action.token };
    case REMOVE_TOKEN:
      return { ...state, token: null };
    case FETCH_CURRENT_CHANNEL_DATA:
      return {...state, current_channel_data: action.data};
    case FETCH_CURRENT_CHANNEL_USERS:
      return {...state, current_channel_users: action.users};
    case FETCH_CURRENT_CHANNEL_MESSAGES:
      return {...state, current_channel_messages: action.messages};
    default:
      return state;
  }
};

export default cache;