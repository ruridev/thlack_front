import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Chat, WorkspaceChannelName  } from '../../styles/Chat';
import { CREATE_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE } from '../../queries'
import { connect } from 'react-redux';



import MessageItemList from '../presenters/chat/MessageItemList';
import MessageInput from '../presenters/chat/MessageInput';

const Page = ({
  cableApp,
  current_user,
  workspaces,
}) => {

  const { workspaceId, channelId } = useParams();

  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const editInputRef = useRef(null);

  const [channelUsers, setChannelUsers] = useState([]);
  const [channelMessages, setChannelMessages] = useState([]);

  const currentWorkspace = useMemo(() => {
    if(workspaces && workspaceId) {
      const workspace = workspaces.filter(workspace => workspace.id === workspaceId)[0];

      if(workspace){
        return workspace;
      }
    }
    return { id: 0, name: '?', channels: [], owners: [] };
  }, [workspaces, workspaceId]);

  const currentChannel = useMemo(() => {
    if(currentWorkspace && channelId) {
      const channel = currentWorkspace.channels.filter(channel => channel.id === channelId)[0];

      if(channel){
        return channel;
      }
    }
    return { id: 0, name: '?', owners: [], workspace: {} };
  }, [currentWorkspace, channelId]);

  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const [updateMessage] = useMutation(UPDATE_MESSAGE);

  useEffect(() => {
    let flag = true;
    if(flag) {
      if (bottomRef && bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  return function() {
    flag = false;
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
      <MessageItemList 
        cableApp={cableApp}
        updateApp={updateApp}
        channelId={channelId}
        messages={channelMessages}
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

function mapStateToProps({ cache: { current_user }, workspaces, chat: { cableApp } }) {
  return { cableApp, current_user, workspaces };
}

export default connect(mapStateToProps, null)(Page);