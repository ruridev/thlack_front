import React from 'react';
import { ClickableListItem } from '../../../styles';


const Component = ({ selectedChannelId, channels, onClickJoinChannel }) => {
  return channels.map((channel) => 
    <ClickableListItem 
      key={channel.id}
      onClick={() => { onClickJoinChannel(channel.id) }}>
      {channel.id === selectedChannelId ? <b>#{channel.name}</b>: `#${channel.name}`}
    </ClickableListItem>
  );
}

export default React.memo(Component);
