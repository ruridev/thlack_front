import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ChannelWebSocket from '../cables/ChannelWebSocket';
import { useMutation } from '@apollo/client';
import { SubmitButton, SmallLinkButton, ListPopup, LinkDiv, LinkButton, TextArea } from '../styles';
import { Chat, WorkspaceChannelName, MessageList,  Message,  MessageInputArea, ReplyTitle } from '../styles/Chat';
import { CREATE_MESSAGE, DELETE_MESSAGE, UPDATE_MESSAGE, JOIN_CHANNEL } from '../queries'
import ReactMarkdown from 'react-markdown'
import Popup from 'reactjs-popup';
import { setCurrentWorkspace,  fetchCurrentChannelData, fetchCurrentChannelMessages, fetchCurrentChannelUsers } from '../action/cache';
import { connect } from 'react-redux';

const Page = ({
  cableApp,
  current_user,
  current_channel_users,
  current_channel_messages,
  fetchCurrentChannelDataHandler,
  fetchCurrentChannelUsersHandler,
  fetchCurrentChannelMessagesHandler, 
  channelById, 
  workspaceById, 
  setCurrentWorkspaceHandler,
}) => {
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const [updateMessage] = useMutation(UPDATE_MESSAGE);
  const [joinChannel] = useMutation(JOIN_CHANNEL, {
    onCompleted({ joinChannel: { channel } }){
      setCurrentWorkspaceHandler(channel.workspace);
    }
  });

  const joinChannelHandler = useCallback((channel_id) => {
    joinChannel({variables: { workspace_id: parseInt(workspaceId), channel_id: parseInt(channel_id) } });
  }, []);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const { workspaceId, channelId } = useParams();

  useEffect(() => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  },[]);

  useEffect(() => {
    if(channelId) {
      joinChannelHandler(channelId);
    }
  }, [channelId]);

  const updateApp = useCallback((newChannel) => {
    if(newChannel.channel){
      fetchCurrentChannelDataHandler(newChannel.channel.data.attributes);
    }
    if(newChannel.users){
      fetchCurrentChannelUsersHandler(newChannel.users.data.map((u) => u.attributes));
    }
    if(newChannel.messages){
      fetchCurrentChannelMessagesHandler(newChannel.messages.data.map((m) => m.attributes));
    }
    if(!newChannel.scroll_down && bottomRef && bottomRef.current){
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

      if (bottomRef && bottomRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }
    f();
  }, [channelId, inputRef]);

  const userById = useCallback((id) => {
    if (current_channel_users && current_channel_users.length > 0) {
      const filteredUser = current_channel_users.filter((user) => parseInt(user.id) === id);
      if (filteredUser.length === 1) {
        return filteredUser[0];
      }
    }
    return { id: 0, name: 'no name' };
  }, [current_channel_users]);

  const MessageMorePopup = ({ message }) => {
    return (<Popup trigger={<SmallLinkButton>More</SmallLinkButton>} position="right center" nested>
      <ListPopup>
        {current_user?.id === message.user_id && <MessageEditPopup message={message} />}
        {current_user?.id === message.user_id && <LinkDiv onClick={() => deleteMessageHandler(message.id)}>Delete</LinkDiv>}
        <LinkDiv onClick={() => replyMessageHandler(message.id)}>Reply</LinkDiv>
      </ListPopup>
    </Popup>)
  };

  const MessageEditPopup = ({ message }) => {
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
  };

  const MessageBox = ({ message, is_reply }) => {
    return (
      <Message key={message.id}>
        <a name={message.id}></a>
        {message.kind !== 'system_message' && <div>
          <small>[<LinkButton onClick={() => { replyMessageHandler(message.id)}}>{message.id}</LinkButton>] </small>
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
  }

  const ReplyPopup = ({message}) => {
    return (<Popup trigger={<LinkButton> ↪︎<ReplyTitle> {message.reply_messages.length} Comment(s)</ReplyTitle></LinkButton>} keepTooltipInside=".message-list">
      <ListPopup>
        {message.reply_messages.map(reply_message => <MessageBox key={reply_message.id} message={reply_message} is_reply={true} />)}
      </ListPopup>
    </Popup>)
  };

  const editMessageHandler = (message_id) => {
    updateMessage({
      variables: {
        body: editInputRef.current.value,
        id: parseInt(message_id),
      },
    });
  }

  const deleteMessageHandler = (message_id) => {
    if(window.confirm('Are you sure?')){
      deleteMessage({
        variables: {
          id: parseInt(message_id),
        },
      });
    }
  }

  const replyMessageHandler = (message_id) => {
    inputRef.current.value = `[#${message_id}](#${message_id})\n`;
    inputRef.current.focus();
  }

  return (
    <Chat>
      <WorkspaceChannelName>
        { `${workspaceById(workspaceId).name}#${channelById(channelId).name}` }
      </WorkspaceChannelName> 
      <MessageList className="message-list">
        {current_channel_messages && current_channel_messages.length > 0 && current_channel_messages.map((message) => 
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


function mapStateToProps({ cache: { cableApp, current_user, current_channel_users, current_channel_messages } }) {
  return { cableApp, current_user, current_channel_users, current_channel_messages };
}

function dispatchToProps(dispatch) {
  return {
    setCurrentWorkspaceHandler: (workspace) => {
      dispatch(setCurrentWorkspace(workspace));
    },
    fetchCurrentChannelDataHandler: (data) => {
      dispatch(fetchCurrentChannelData(data));
    },
    fetchCurrentChannelUsersHandler: (users) => {
      dispatch(fetchCurrentChannelUsers(users));
    },
    fetchCurrentChannelMessagesHandler: (messages) => {
      dispatch(fetchCurrentChannelMessages(messages));
    },
  }
}

export default connect(mapStateToProps, dispatchToProps)(Page);