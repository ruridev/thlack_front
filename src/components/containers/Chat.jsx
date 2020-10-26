import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Chat from '../presenters/chat/Chat';
import {
  useCreateMessage,
  useDeleteMessage,
  useUpdateMessage
} from '../../graphql/mutations'

const Page = ({
  cableApp,
  current_user,
  workspaces,
}) => {

  const { workspaceId, channelId } = useParams();

  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const editInputRef = useRef(null);
  
  const [channelMessages, setChannelMessages] = useState([]);

  const createMessage = useCreateMessage();
  const deleteMessage = useDeleteMessage();
  const updateMessage = useUpdateMessage();

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
      //setChannelUsers(newChannel.users.data.map((u) => u.attributes));
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
        body: inputRef.current.value,
        channel_id: parseInt(channelId),
      });

      if (inputRef && inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }
    f();
  }, [channelId, inputRef, createMessage]);

  // const userById = useCallback((id) => {
  //   if (channelUsers && channelUsers.length > 0) {
  //     const filteredUser = channelUsers.filter((user) => parseInt(user.id) === id);
  //     if (filteredUser.length === 1) {
  //       return filteredUser[0];
  //     }
  //   }
  //   return { id: 0, name: 'no name' };
  // }, [channelUsers]);

  const editMessageHandler = useCallback((message_id) => {
    updateMessage({
      body: editInputRef.current.value,
      id: parseInt(message_id),
    });
  }, [updateMessage, editInputRef]);

  const deleteMessageHandler = useCallback((message_id) => {
    if(window.confirm('Are you sure?')){
      deleteMessage({
        id: parseInt(message_id),
      });
    }
  }, [deleteMessage]);

  const onClickReplyMessage = useCallback((message_id) => {
    inputRef.current.value = `[#${message_id}](#${message_id})\n`;
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <Chat 
      currentChannel={currentChannel}
      cableApp={cableApp}
      updateApp={updateApp}
      channelId={channelId}
      messages={channelMessages}
      bottomRef={bottomRef}
      onClickReplyMessage={onClickReplyMessage}
      deleteMessageHandler={deleteMessageHandler} 
      editInputRef={editInputRef}
      editMessageHandler={editMessageHandler}
      current_user={current_user}
      sendMessageHandler={sendMessageHandler}
      inputRef={inputRef} />
  );
}

function mapStateToProps({ cache: { current_user }, workspaces, chat: { cableApp } }) {
  return { cableApp, current_user, workspaces };
}

export default connect(mapStateToProps, null)(Page);