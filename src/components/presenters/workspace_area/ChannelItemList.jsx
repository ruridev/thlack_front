import React from 'react';
import { ChannelButton } from '../../../styles/ChannelArea';

const Component = ({ selectedChannelId, channels, onClickJoinChannel }) => {
  return channels.map((channel) => 
    <ChannelButton 
      key={channel.id}
      onClick={() => { onClickJoinChannel(channel.id) }}>
      {channel.id === selectedChannelId ? <b>#{channel.name}</b>: `#${channel.name}`}
    </ChannelButton>
  );
}

export default React.memo(Component);
