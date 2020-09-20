import React, { useState, useEffect, useRef } from 'react';
import ChannelWebSocket from '../cables/ChannelWebSocket';
import { useMutation } from '@apollo/client';
import { Chat, WorkspaceChannelName, MessageList,  Message,  MessageInputArea, MessageInput } from '../styles/Chat';
import { CREATE_MESSAGE } from '../queries'

export default function Page(props){
  const [createMessage] = useMutation(CREATE_MESSAGE);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const [message, setMessage] = useState(null);

  useEffect(()=>{
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  },[props.currentChannel]);

  const [currentChannel, setCurrentChannel] = useState(null);

  const updateApp = (newChannel) => {
    setCurrentChannel({
      data: newChannel.channel.data.attributes,
      users: newChannel.users.data.map((u) => u.attributes),
      messages: newChannel.messages.data.map((m) => m.attributes),
    });

    if(bottomRef && bottomRef.current){
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendMessageHandler = () => {
    async function f () {
      await createMessage({
        variables: {
          body: message,
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
      if (currentChannel) {
        const filteredChannel = currentChannel.users.filter((user) => user.id === id);
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
  return (
    <Chat>
      <WorkspaceChannelName>
        { `${props.workspaceById(props.workspaceId).name}#${props.channelById(props.channelId).name}` }
      </WorkspaceChannelName> 
      <MessageList>
        {currentChannel &&
          currentChannel.messages.map((message) => (
            <Message key={message.id}>
              <div>
                <b>{userById(message.user_id).name}</b>&nbsp;
                <small>{message.send_at}</small>
              </div>
              <div>{message.body}</div>
            </Message>
          ))}
        <div ref={bottomRef}></div>
        <ChannelWebSocket {...channelWebSocketParams()}/>
      </MessageList>
      <MessageInputArea>
        <MessageInput
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter' && e.shiftKey) { sendMessageHandler(); }
          }}
          ref={inputRef}
          placeholder="shift + enter로 메세지 전송"
        />
      </MessageInputArea>
    </Chat>
  );
}