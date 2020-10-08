import React from 'react';
import ChannelWebSocket from '../../../cables/ChannelWebSocket';
import { MessageList } from '../../../styles/Chat';
import MessageItem from './MessageItem';

const Presenter = ({
  cableApp,
  updateApp,
  channelId,
  current_user={},
  messages=[],
  bottomRef,
  onClickReplyMessage,
  deleteMessageHandler,
  editInputRef,
  editMessageHandler,
}) => {
  return (
    <MessageList className="message-list">
      {messages.map((message) => 
        <MessageItem 
          key={message.id} 
          message={message} 
          onClickReplyMessage={onClickReplyMessage} 
          deleteMessageHandler={deleteMessageHandler}
          editInputRef={editInputRef}
          editMessageHandler={editMessageHandler}
          isOwner={message.user?.id === current_user?.id} />
      )}
      <div ref={bottomRef} ></div>
      <ChannelWebSocket
        cableApp={cableApp} 
        channelId={channelId} 
        updateApp={updateApp} />
    </MessageList>
  );
}

export default React.memo(Presenter);