import React from 'react';
import { Message } from '../../../styles/Chat';
import ReactMarkdown from 'react-markdown'

const Presenter = ({ message }) => {
  return (
    <Message>
      <div>
        <small>[{message.id}] </small>
        <b>{message.user?.name} 코멘트 작성자</b>&nbsp;
        <small>{message.send_at}</small>
      </div>
      <ReactMarkdown source={message.body}></ReactMarkdown>
    </Message>
  );
}

export default React.memo(Presenter);