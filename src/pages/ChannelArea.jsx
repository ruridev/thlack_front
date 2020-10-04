import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ChannelNavigator, NewChannel, ChannelButton } from '../styles/ChannelArea';
import { connect } from 'react-redux';
import { setMode } from '../action/cache';

const Page = ({
  cache,
  onClickNewChannel,
  workspaceById,
  setModeHandler,
}) => {
  const history = useHistory();
  const { workspaceId, channelId } = useParams();

  const joinChannelHandler = (channel) => {
    setModeHandler('chat');
    history.push(`/workspaces/${workspaceId}/${channel.id}`);
  }

  return (
    <ChannelNavigator>
      {workspaceId && 
        workspaceById(workspaceId).owners && 
        workspaceById(workspaceId).owners.filter((owner) => owner.id === cache.current_user.id).length > 0 &&
        <NewChannel onClick={() => onClickNewChannel(workspaceId)}>+New Channel</NewChannel>}
      {workspaceId && 
        workspaceById(workspaceId).channels && 
        workspaceById(workspaceId).channels.filter((channel) => channel.id === channelId).map((channel) => (
        <ChannelButton key={channel.id} onClick={() => { joinChannelHandler(channel) }}><b>#{channel.name}</b></ChannelButton>
      ))}
      {workspaceId && workspaceById(workspaceId).channels && workspaceById(workspaceId).channels.filter((channel) => channel.id !== channelId).map((channel) => (
        <ChannelButton key={channel.id} onClick={() => { joinChannelHandler(channel) }}>#{channel.name}</ChannelButton>
      ))}
    </ChannelNavigator>
  );
}

function mapStateToProps({ cache }) {
  return { cache };
}

function dispatchToProps(dispatch, ownProps) {
  return {
    onClickNewChannel: (workspace_id) => {
      ownProps.history.push(`/workspaces/${workspace_id}/new`);
    },
    setModeHandler: (mode) => {
      dispatch(setMode(mode));
    },
  }
}

export default connect(mapStateToProps, dispatchToProps)(Page);
