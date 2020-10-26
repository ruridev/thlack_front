import React from 'react';
import { LinkButton } from '../../../styles';
import { Message } from '../../../styles/Chat';
import MessageMorePopup from './MessageMorePopup';
import ReactMarkdown from 'react-markdown'
import ReplyPopup from './ReplyPopup'

const Presenter = ({
  message,
  isOwner,
  onClickReplyMessage,
  deleteMessageHandler,
  editInputRef,
  editMessageHandler,
}) => {
  return (
    <Message>
      {message.kind !== 'system_message' && <div>
        <small>
          [<LinkButton name={message.id} onClick={() => { onClickReplyMessage(message.id)}}>{message.id}</LinkButton>]&nbsp;
        </small>
        <b>
          {message.user.name}&nbsp;
        </b>
        <small>
          {message.send_at}
        </small>
        <MessageMorePopup
          isOwner={isOwner}
          message={message}
          deleteMessageHandler={deleteMessageHandler}
          onClickReplyMessage={onClickReplyMessage}
          editInputRef={editInputRef}
          editMessageHandler={editMessageHandler} />
      </div>}
      <div>
        {message.kind === 'system_message' && <b>{message.body}</b>}
        {message.kind !== 'system_message' && <ReactMarkdown source={message.body}></ReactMarkdown>}
      </div>
      {message.reply_messages?.length > 0 && <ReplyPopup message={message} />}
    </Message>
  );
}

export default React.memo(Presenter);