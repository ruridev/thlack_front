import React from 'react';
import { ChannelNavigator, NewChannel, ChannelButton } from '../styles/ChannelArea';

export default function Page(props){
  return (
    <ChannelNavigator>
      {props.workspaceId && props.workspaceData?.workspace.owners.filter((owner) => owner.id == props.loginUser.id).length > 0 && <NewChannel onClick={() => props.onClickNewChannel() }>+New Channel</NewChannel>}
      {props.workspaceData?.workspace.channels.filter((channel) => channel.id == props.channelId).map((channel) => (
          <ChannelButton key={channel.id}>
            <a onClick={() => { props.onClickChannelLink(channel.id) }}><b>#{channel.name}</b></a>
          </ChannelButton>
        ))}
      {props.workspaceData?.workspace.channels.filter((channel) => channel.id != props.channelId).map((channel) => (
          <ChannelButton key={channel.id}>
            <a onClick={() => { props.onClickChannelLink(channel.id) }}>#{channel.name}</a>
          </ChannelButton>
        ))}
    </ChannelNavigator>
  );
}
