import React from 'react';
import { ChannelNavigator, NewChannel } from '../../../styles/ChannelArea';
import ChannelItemList from './ChannelItemList';

const Component = ({ isOwner, onClickNewChannel, selectedChannelId, channels, onClickJoinChannel }) => {
  return (
    <ChannelNavigator>
      { isOwner &&
      <NewChannel onClick={onClickNewChannel} >+New Channel</NewChannel> }
      <ChannelItemList
        channels={channels}
        selectedChannelId={selectedChannelId}
        onClickJoinChannel={onClickJoinChannel} />
    </ChannelNavigator>
  );
}

export default React.memo(Component);
