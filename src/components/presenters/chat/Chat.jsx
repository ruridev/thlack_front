import React from 'react';
import { Chat, WorkspaceChannelName  } from '../../../styles/Chat';
import MessageItemList from './MessageItemList';
import MessageInput from './MessageInput';

const Presenter = ({
  current_user,
  currentChannel, 
  cableApp,
  updateApp,
  channelId,
  messages,
  bottomRef,
  inputRef,
  editInputRef,
  deleteMessageHandler,
  onClickReplyMessage,
  editMessageHandler,
  sendMessageHandler,
}) => {
  return (
    <Chat>
      <WorkspaceChannelName>
        { `${currentChannel.workspace.name}#${currentChannel.name}` }
      </WorkspaceChannelName> 
      <MessageItemList 
        cableApp={cableApp}
        updateApp={updateApp}
        channelId={channelId}
        messages={messages}
        bottomRef={bottomRef}
        onClickReplyMessage={onClickReplyMessage}
        deleteMessageHandler={deleteMessageHandler} 
        editInputRef={editInputRef}
        editMessageHandler={editMessageHandler}
        current_user={current_user} />
      <MessageInput sendMessageHandler={sendMessageHandler} inputRef={inputRef} />
    </Chat>
  );
}
export default React.memo(Presenter);