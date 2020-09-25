import React, { useState, useEffect, useRef } from 'react';
import ChannelWebSocket from '../cables/ChannelWebSocket';
import { useMutation } from '@apollo/client';
import { SubmitButton, SmallLinkButton, ListPopup, LinkDiv, LinkButton } from '../styles';
import { Chat, WorkspaceChannelName, MessageList,  Message,  MessageInputArea, MessageInput, ReplyTitle } from '../styles/Chat';
import { CREATE_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE } from '../queries'
import ReactMarkdown from 'react-markdown'
import Popup from 'reactjs-popup';

export default function Page(props){
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const [updateMessage] = useMutation(UPDATE_MESSAGE);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  const [messageBody, setMessageBody] = useState('');
  const [editMessage, setEditMessage] = useState(null);
  //const [currentChannel, setCurrentChannel] = useState(null);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
      console.log("scrollIntoView");
    }
  },[]);


  const updateApp = (newChannel) => {
    if(newChannel.channel){
      setData(newChannel.channel.data.attributes);
    }
    if(newChannel.users){
      setUsers(newChannel.users.data.map((u) => u.attributes));
    }
    if(newChannel.messages){
      setMessages(newChannel.messages.data.map((m) => m.attributes));
    }

    if(!newChannel.scroll_down && bottomRef && bottomRef.current){
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
      console.log("scrollIntoView");
    }
  };

  const sendMessageHandler = () => {
    if(messageBody.trim().length == 0){
      inputRef.current.focus();
      return false;
    }
    async function f () {
      await createMessage({
        variables: {
          body: messageBody,
          channel_id: parseInt(props.channelId),
        },
      });

      if (bottomRef && bottomRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }
    f();
  };

  const userById = (id) => {
    if (users) {
      const filteredChannel = users.filter((user) => user.id === id);
      if(filteredChannel.length == 1) {
        return filteredChannel[0];
      }
    }

    return { id: 0, name: 'no name' };
  };

  const channelWebSocketParams = () => {
    return { 
      cableApp: props.cableApp, 
      channelId: props.channelId,
      updateApp
    };
  }

  const MessageMorePopup = ({ message }) => {
    return (<Popup trigger={<SmallLinkButton>더보기</SmallLinkButton>} position="right center" nested>
      <ListPopup>
        {props?.loginUser?.id == message.user_id && <MessageEditPopup message={message} />}
        {props?.loginUser?.id == message.user_id && <LinkDiv onClick={() => deleteMessageHandler(message.id)}>삭제하기</LinkDiv>}
        <LinkDiv onClick={() => replyMessageHandler(message.id)}>댓글달기</LinkDiv>
        {props?.loginUser?.id != message.user_id && <LinkDiv onClick={() => reportMessageHandler(message.id)}>신고하기</LinkDiv>}
      </ListPopup>
    </Popup>)
  };

  const test = (e) => {
    setEditMessage(e.target.value);
    return false;
  }

  const MessageEditPopup = ({ message }) => {
    return (<Popup trigger={<LinkDiv>수정하기</LinkDiv>} nested modal onOpen={() => { editInputRef.current.focus(); }}>
      <ListPopup>
        <MessageInput
          onChange={test}
          defaultValue={message.body}
          ref={editInputRef}
          cols={70}
          rows={8}
        />
        <SubmitButton onClick={() => { editMessageHandler(message.id) }}>수정하기</SubmitButton>
      </ListPopup>
    </Popup>)
  };

  const MessageBox = ({ message, is_reply }) => {
    return (
      <Message key={message.id}>
        <a name={message.id}></a>
        {message.kind != 'system_message' && <div>
          <small>[<LinkButton onClick={() => { replyMessageHandler(message.id)}}>{message.id}</LinkButton>]</small>
          <b>{userById(message.user_id).name}</b>&nbsp;
          <small>{message.send_at}</small>
          {!is_reply && <MessageMorePopup message={message}></MessageMorePopup>}
        </div>}
        <div>
          {message.kind == 'system_message' && <b>{message.body}</b>}
          {message.kind != 'system_message' && <ReactMarkdown source={message.body}></ReactMarkdown>}
        </div>
        {message.reply_messages?.length > 0 && <ReplyPopup message={message} />}
      </Message>
    );
  }

  const ReplyPopup = ({message}) => {
    return (<Popup trigger={<LinkButton><ReplyTitle> ↪︎ {message.reply_messages.length} 개의 댓글</ReplyTitle></LinkButton>} keepTooltipInside=".message-list">
      <ListPopup>
        {message.reply_messages.map(reply_message => <MessageBox key={reply_message.id} message={reply_message} is_reply={true} />)}
      </ListPopup>
    </Popup>)
  };

  const editMessageHandler = (message_id) => {
    console.log(editMessage);
    updateMessage({
      variables: {
        body: editMessage,
        id: parseInt(message_id),
      },
    });
  }

  const deleteMessageHandler = (message_id) => {
    if(window.confirm('정말 삭제할래요?')){
      deleteMessage({
        variables: {
          id: parseInt(message_id),
        },
      });
    }
  }

  const reportMessageHandler = (message_id) => {
    if(window.confirm('정말 신고할래요?')){
      
    }
  }
  
  const replyMessageHandler = (message_id) => {
    inputRef.current.value = `[#${message_id}](#${message_id})\n`;
    inputRef.current.focus();
  }

  return (
    <Chat>
      <WorkspaceChannelName>
        { `${props.workspaceById(props.workspaceId).name}#${props.channelById(props.channelId).name}` }
      </WorkspaceChannelName> 
      <MessageList className="message-list">
        {messages.map((message) => 
          <MessageBox key={message.id} message={message} />
        )}
        <div ref={bottomRef}></div>
        <ChannelWebSocket {...channelWebSocketParams()}/>
      </MessageList>
      <MessageInputArea>
        <MessageInput
          onChange={(e) => setMessageBody(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter' && e.shiftKey) { sendMessageHandler(); }else{return false;}
          }}
          ref={inputRef}
          placeholder="shift + enter로 메세지 전송"
        />
        <SubmitButton onClick={sendMessageHandler}>보내기</SubmitButton>
      </MessageInputArea>
    </Chat>
  );
}