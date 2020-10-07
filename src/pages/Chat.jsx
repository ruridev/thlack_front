import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ChannelWebSocket from '../cables/ChannelWebSocket';
import { useMutation } from '@apollo/client';
import { SubmitButton, SmallLinkButton, ListPopup, LinkDiv, LinkButton, TextArea } from '../styles';
import { Chat, WorkspaceChannelName, MessageList,  Message,  MessageInputArea, ReplyTitle } from '../styles/Chat';
import { CREATE_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE } from '../queries'
import ReactMarkdown from 'react-markdown'
import Popup from 'reactjs-popup';
import { connect } from 'react-redux';

const Page = ({
  cableApp,
  current_user,
  currentChannel,
  workspaces,
}) => {
  console.log("😇 Chat.jsx rendering");
  useEffect(() => {
    console.log("😇 Chat.jsx useEffect");
  }, []);

  const [channelUsers, setChannelUsers] = useState([]);
  const [channelMessages, setChannelMessages] = useState([]);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  const { workspaceId, channelId } = useParams();

  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const [updateMessage] = useMutation(UPDATE_MESSAGE);

  useEffect(() => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  },[bottomRef]);

  const updateApp = (newChannel) => {
    if(newChannel.users){
      setChannelUsers(newChannel.users.data.map((u) => u.attributes));
    }
    if(newChannel.messages){
      setChannelMessages(newChannel.messages.data.map((m) => m.attributes));
    }
    if(!newChannel.scroll_down){
      scrollDown();
    }
  };



  const scrollDown = useCallback(() => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottomRef]);
  
  const sendMessageHandler = useCallback(() => {
    if(inputRef.current.value.trim().length === 0){
      inputRef.current.focus();
      return false;
    }
    async function f () {
      await createMessage({
        variables: {
          body: inputRef.current.value,
          channel_id: parseInt(channelId),
        },
      });

      if (inputRef && inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }
    f();
  }, [channelId, inputRef]);

  const userById = useCallback((id) => {
    if (channelUsers && channelUsers.length > 0) {
      const filteredUser = channelUsers.filter((user) => parseInt(user.id) === id);
      if (filteredUser.length === 1) {
        return filteredUser[0];
      }
    }
    return { id: 0, name: 'no name' };
  }, [channelUsers]);

  const MessageMorePopup = useCallback(({ message }) => {
    return (<Popup trigger={<SmallLinkButton>More</SmallLinkButton>} position="right center" nested>
      <ListPopup>
        {current_user?.id === message.user_id && <MessageEditPopup message={message} />}
        {current_user?.id === message.user_id && <LinkDiv onClick={() => deleteMessageHandler(message.id)}>Delete</LinkDiv>}
        <LinkDiv onClick={() => onClickReplyMessage(message.id)}>Reply</LinkDiv>
      </ListPopup>
    </Popup>)
  }, []);

  const MessageEditPopup = useCallback(({ message }) => {
    return (<Popup trigger={<LinkDiv>Modify</LinkDiv>} nested modal onOpen={() => { editInputRef.current.focus(); }}>
      <ListPopup>
        <TextArea
          defaultValue={message.body}
          ref={editInputRef}
          cols={70}
          rows={8}
        />
        <SubmitButton onClick={() => { editMessageHandler(message.id) }}>Modify</SubmitButton>
      </ListPopup>
    </Popup>)
  }, [editInputRef]);

  const MessageBox = useCallback(({ message, is_reply }) => {
    return (
      <Message key={message.id}>
        <a name={message.id}></a>
        {message.kind !== 'system_message' && <div>
          <small>[<LinkButton onClick={() => { onClickReplyMessage(message.id)}}>{message.id}</LinkButton>] </small>
          <b>{userById(message.user_id).name}</b>&nbsp;
          <small>{message.send_at}</small>
          {!is_reply && <MessageMorePopup message={message}></MessageMorePopup>}
        </div>}
        <div>
          {message.kind === 'system_message' && <b>{message.body}</b>}
          {message.kind !== 'system_message' && <ReactMarkdown source={message.body}></ReactMarkdown>}
        </div>
        {message.reply_messages?.length > 0 && <ReplyPopup message={message} />}
      </Message>
    );
  }, [userById]);

  const ReplyPopup = useCallback(({message}) => {
    return (<Popup trigger={<LinkButton> ↪︎<ReplyTitle> {message.reply_messages.length} Comment(s)</ReplyTitle></LinkButton>} keepTooltipInside=".message-list">
      <ListPopup>
        {message.reply_messages.map(reply_message => <MessageBox key={reply_message.id} message={reply_message} is_reply={true} />)}
      </ListPopup>
    </Popup>)
  }, []);

  const editMessageHandler = useCallback((message_id) => {
    updateMessage({
      variables: {
        body: editInputRef.current.value,
        id: parseInt(message_id),
      },
    });
  }, [editInputRef]);

  const deleteMessageHandler = useCallback((message_id) => {
    if(window.confirm('Are you sure?')){
      deleteMessage({
        variables: {
          id: parseInt(message_id),
        },
      });
    }
  }, []);

  const onClickReplyMessage = useCallback((message_id) => {
    inputRef.current.value = `[#${message_id}](#${message_id})\n`;
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <Chat>
      <WorkspaceChannelName>
        { `${currentChannel.workspace.name}#${currentChannel.name}` }
      </WorkspaceChannelName> 
      <MessageList className="message-list">
        {channelMessages && channelMessages.length > 0 && channelMessages.map((message) => 
          <MessageBox key={message.id} message={message} />
        )}
        <div ref={bottomRef} ></div>
        {<ChannelWebSocket cableApp={cableApp} channelId={channelId} updateApp={updateApp} />}
      </MessageList>
      <MessageInputArea>
        <TextArea
          onKeyPress={(e) => { if (e.key === 'Enter' && e.shiftKey) { sendMessageHandler(); }else{return false;}
          }}
          ref={inputRef}
          placeholder="Press shift + enter to send a message"
        />
        <SubmitButton onClick={sendMessageHandler}> >> </SubmitButton>
      </MessageInputArea>
    </Chat>
  );
}


function mapStateToProps({ cache: { current_user }, workspaces, chat: { cableApp } }) {
  return { cableApp, current_user, workspaces };
}

export default connect(mapStateToProps, null)(Page);