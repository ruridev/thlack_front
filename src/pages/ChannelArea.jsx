import React from 'react';
import { ChannelNavigator, NewChannel, ChannelButton } from '../styles/ChannelArea';

export default function Page(props){
  return (
    <ChannelNavigator>
      <NewChannel onClick={() => props.onClickNewChannel() }>+New</NewChannel>
      {props.channelsData?.channels.filter((channel) => channel.id == props.channelId).map((channel) => (
          <ChannelButton key={channel.id}>
            <b>#{channel.name}</b>
          </ChannelButton>
        ))}
      {props.channelsData?.channels.filter((channel) => channel.id != props.channelId).map((channel) => (
          <ChannelButton key={channel.id}>
            <a onClick={() => { props.onClickChannelLink(channel.id) }}>#{channel.name}</a>
          </ChannelButton>
        ))}
    </ChannelNavigator>
  );
}
