import React, { useEffect, useCallback } from 'react';
import { ChannelNavigator, NewChannel, ChannelButton } from '../styles/ChannelArea';

const Page = ({
  channels,
  current_user,
  isWorkspaceOwner,
  currentWorkspaceId,
  currentChannelId,
  history,
}) => {
  console.log("😇 ChannelArea.jsx rendering");
  useEffect(() => {
    console.log("😇 ChannelArea.jsx useEffect");
  }, []);

  const onClickJoinChannel = useCallback((channel_id) => {
    history.push(`/workspaces/${currentWorkspaceId}/${channel_id}`);
  }, [currentWorkspaceId]);

  const onClickNewChannel = useCallback(()=> {
    history.push(`/workspaces/${currentWorkspaceId}/new`);  
  }, [currentWorkspaceId]);
  
  return (
    <ChannelNavigator>
      {isWorkspaceOwner &&
        <NewChannel onClick={() => onClickNewChannel(currentWorkspaceId)}>+New Channel</NewChannel>}
      
      {channels && 
        channels.map((channel) => (
          channel.id === currentChannelId ?
          <ChannelButton key={channel.id} onClick={() => { onClickJoinChannel(channel.id) }}><b>#{channel.name}</b></ChannelButton>
        : <ChannelButton key={channel.id} onClick={() => { onClickJoinChannel(channel.id) }}>#{channel.name}</ChannelButton> 
      ))}
    </ChannelNavigator>
  );
}

export default Page;
