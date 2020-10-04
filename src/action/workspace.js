const FETCH_WORKSPACES = 'FETCH_WORKSPACES';
const ADD_WORKSPACE = 'ADD_WORKSPACE';
const FETCH_CHANNELS = 'FETCH_CHANNELS';
const ADD_CHANNEL = 'ADD_CHANNEL';


const fetchWorkspacesAction = workspaces => {
  return {
    type: FETCH_WORKSPACES, 
    workspaces,
  }
}
const fetchWorkspaces = workspaces => {
  return dispatch => {
    dispatch(fetchWorkspacesAction(workspaces));
  }
}

const addWorkspaceAction = workspace => {
  return {
    type: ADD_WORKSPACE, 
    workspace,
  }
}
const addWorkspace = workspace => {
  return dispatch => {
    dispatch(addWorkspaceAction(workspace));
  }
}

const fetchChannelsAction = (workspace_id, channels) => {
  return {
    type: FETCH_CHANNELS, 
    workspace_id,
    channels,
  }
}
const fetchChannels = (workspace_id, channels) => {
  return dispatch => {
    dispatch(fetchChannelsAction(workspace_id, channels));
  }
}

const addChannelAction = (workspace_id, channel) => {
  return {
    type: ADD_CHANNEL, 
    workspace_id,
    channel,
  }
}
const addChannel = (workspace_id, channel) => {
  return dispatch => {
    dispatch(addChannelAction(workspace_id, channel));
  }
}
export {
  FETCH_WORKSPACES,
  fetchWorkspaces,
  ADD_WORKSPACE,
  addWorkspace,
  FETCH_CHANNELS,
  fetchChannels,
  ADD_CHANNEL,
  addChannel,
};
