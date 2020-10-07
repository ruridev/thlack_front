import {
  FETCH_WORKSPACES,
  ADD_WORKSPACE,
  FETCH_CHANNELS,
  ADD_CHANNEL,
} from './workspace.action';

const workspace = (state = [], action) => {
  let newState = null;
  switch (action.type) {
    case FETCH_WORKSPACES:
      return action.workspaces;
    case ADD_WORKSPACE:
      return [...state, action.workspace];
    case FETCH_CHANNELS:
      newState = {...state.filter((workspace) => workspace.id === action.workspace_id)[0]}
      newState.channels = action.channels
      return [...state.filter((workspace) => workspace.id !== action.workspace_id), newState];
    case ADD_CHANNEL:
      newState = {...state.filter((workspace) => workspace.id === action.workspace_id)[0]}
      newState.channels = [...newState.channels, action.channel]
      return [...state.filter((workspace) => workspace.id !== action.workspace_id), newState];
    default:
      return state;
  }
};

export default workspace;
