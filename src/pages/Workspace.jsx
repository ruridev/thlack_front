import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useParams,
  Link,
} from 'react-router-dom';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { auth } from '../firebase/firebase.utils';
import ChannelWebSocket from '../cables/ChannelWebSocket';

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas:
    'workspace channelname user'
    'workspace message user'
    'workspace message friends'
    'channel message friends'
    'channel input friends';
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 64px 54px minmax(10px, 60px) auto minmax(10px, 60px);
`;
const WorkspaceNavigator = styled.div`
  grid-area: workspace;
  background-color: black;
  color: white;
  overflow: hidden;
  :hover {
    overflow: auto;
  }
`;

const NewWorkspace = styled.div`
  padding: 8px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const WorkspaceButton = styled.div`
  padding: 8px;

  > a {
    cursor: pointer;
    text-decoration: none;
    color: white;
  }

  > a:hover {
    text-decoration: underline;
  }
`;
const ChannelNavigator = styled.div`
  grid-area: channel;
  overflow: hidden;
  :hover {
    overflow: auto;
  }
`;

const NewChannel = styled.div`
  padding: 8px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
const ChannelButton = styled.div`
  padding: 8px;

  > a {
    cursor: pointer;
    text-decoration: none;
    color: black;
  }

  > a:hover {
    text-decoration: underline;
  }
`;
const MessageList = styled.div`
  grid-area: message;
  overflow: auto;
  position: relative;
`;
const WorkspaceChannelName = styled.h2`
  grid-area: channelname;
  text-align: center;
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.6);
`;
const Message = styled.div`
  white-space: pre-line;
  margin: 8px;
`;
const MessageInputArea = styled.div`
  grid-area: input;
`;
const MessageInput = styled.textarea`
  width: 99%;
`;
const MessageInputButtons = styled.div``;

const LoginUserNavigator = styled.div`
  grid-area: user;
`;
const LoginUserButton = styled.div`
  padding: 8px;
`;
const LoginUserImage = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const ChangeUserButton = styled.div`
  padding-bottom: 8px;
  text-align: center;
  font-size: 0.7rem;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const LogoutButton = styled.div`
  padding-bottom: 8px;
  text-align: center;
  font-size: 0.7rem;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const FriendsNavigator = styled.div`
  grid-area: friends;
  overflow: hidden;
  :hover {
    overflow: auto;
  }
`;
const FriendButton = styled.div`
  background-color: black;
  color: white;
  padding: 8px;
`;

const friend_ids = [31];

const CREATE_MESSAGE = gql`
  mutation CreateMessage($body: String, $channel_id: Int!) {
    createMessage(input: { body: $body, channelId: $channel_id }) {
      message {
        id
      }
    }
  }
`;

// 소속한 워크스페이스
const GET_WORKSPACES = gql`
  query getWorkspaces {
    workspaces {
      id
      name
    }
  }
`;

// 워크스페이스 안 채널
const GET_CHANNELS = gql`
  query getChannels($workspace_id: Int!) {
    channels(id: $workspace_id) {
      id
      name
    }
  }
`;

const GET_LOGIN_USER = gql`
  query getLoginUser {
    login_user{
      id
      name
    }
  }
`;


export default function Page({ cableApp, loginUser, setLoginUser, loginAccount, setLoginAccount }) {
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [getWorkspaces, { data: workspacesData, called: workspacesCalled, loading: workspacesLoading, error: workspacesError }] = useLazyQuery(GET_WORKSPACES, {
    fetchPolicy: `network-only`,
  });
  const [getChannels, { data: channelsData, called: channelsCalled, loading: channelsLoading, error: channelsError }] = useLazyQuery(GET_CHANNELS, {
    fetchPolicy: `network-only`,
  });
  const [currentChannel, setCurrentChannel] = useState(null);
  const [getLoginUser, { data: loginUserData }] = useLazyQuery(GET_LOGIN_USER, {
    fetchPolicy: `network-only`,
  });

  const [message, setMessage] = useState(null);

  const { workspace_id, channel_id } = useParams();
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const history = useHistory();

  // url변경시
  // - workspace_id 가 존재하는 경우, workspace 리스트 갱신
  // - workspace_id 가 존재하지 않는 경우, workspaces 취득 후 workspaces.first 로 이동
  // workspace_id변경시
  // - channels 취득
  // - channels.first 로이동 -> channel_id 변경↓
  // channel_id변경시
  // - messages 갱신

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user === undefined || user === null) {
        setLoginAccount(null);
        history.push('/');
      } else if (!loginAccount && user.email !== null) {
        console.log("??")
        setLoginAccount(user);
        //getLoginUser();

        getWorkspaces({ variables: {} });
      }
    });

    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, [history]);

  useEffect(() => {
    if (workspace_id) {
      console.log('get channels (workspace_id changed)');
      getChannels({ variables: { workspace_id: parseInt(workspace_id) } });
    }
    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, [workspace_id]);

  useEffect(() => {
    if (workspace_id) {
      console.log('get channels (channel_id changed)');
      getChannels({variables: { workspace_id: parseInt(workspace_id) } });
    }

    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;

  }, [channel_id]);

  useEffect(() => {
    if(workspacesData){
      console.log(workspacesData);
    }
    if (workspacesData && workspace_id === undefined) {
      // 워크스페이스가 존재하지 않으면 작성화면으로 이동
      if (workspacesData.workspaces.length === 0) {
        history.push(`/workspaces/new`);
      } else {
        // 워크스페이스가 존재하면 가장 첫번째로 이동
        const workspace = workspacesData.workspaces[0];
        history.push(`/workspaces/${workspace.id}`);
      }
    }
    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, [workspacesData]);

  useEffect(() => {
    if(loginUserData){
      console.log(loginUserData);
      setLoginUser(loginUserData.login_user);
    }
    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, [loginUserData])

  const updateApp = (newChannel) => {
    setCurrentChannel({
      data: newChannel.channel.data.attributes,
      users: newChannel.users.data.map((u) => u.attributes),
      messages: newChannel.messages.data.map((m) => m.attributes),
    });

    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  };

  const sendMessageHandler = () => {
    createMessage({
      variables: {
        body: message,
        channel_id: parseInt(channel_id),
      },
    });

    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const userById = (id) => {
    if (currentChannel) {
      return currentChannel.users.filter((user) => user.id === id)[0];
    }
    return { id: 0, name: 'no name' };
  };

  const workspaceById = (id) => {
    if (workspace_id && workspacesData) {
      return workspacesData.workspaces.filter((workspace) => workspace.id === workspace_id)[0];
    }
  };

  const channelById = (id) => {
    if (channel_id && channelsData) {
      return channelsData.channels.filter((channel) => channel.id === channel_id)[0];
    }
  };

  return (
    <Main>
      <WorkspaceNavigator>
        <NewWorkspace onClick={() => history.push('/workspaces/new')}>+New</NewWorkspace>
        {false && workspacesCalled && workspacesLoading && <div>Loading...</div>}
        {workspacesData &&
          workspacesData.workspaces.map((workspace) => (
            <WorkspaceButton key={workspace.id}>
              <Link to={`/workspaces/${workspace.id}`}>{workspace.name}</Link>
            </WorkspaceButton>
          ))}
      </WorkspaceNavigator>

      <ChannelNavigator>
        <NewChannel
          onClick={() => history.push(`/workspaces/${workspace_id && workspace_id}/channels/new`)}>
          +New
        </NewChannel>

        {false && channelsCalled && channelsLoading && <div>Loading...</div>}

        {channelsError && <div>Error... {channelsError}</div>}
        {!channelsLoading &&
          channelsData &&
          channelsData.channels.map((channel) => (
            <ChannelButton key={channel.id}>
              <Link to={`/workspaces/${workspace_id}/${channel.id}`}>#{channel.name}</Link>
            </ChannelButton>
          ))}
      </ChannelNavigator>

      <WorkspaceChannelName>
        { workspaceById(workspace_id) 
          && channelById(channel_id) 
          && `${workspaceById(workspace_id).name}#${channelById(channel_id).name}` }
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

        <Message ref={bottomRef}>&nbsp;</Message>

        <ChannelWebSocket cableApp={cableApp} updateApp={updateApp} channelId={channel_id} />
      </MessageList>

      <MessageInputArea>
        <MessageInput
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              sendMessageHandler();
              return false;
            }
          }}
          ref={inputRef}
        />
        <MessageInputButtons>
          <button onClick={sendMessageHandler}>send</button>
        </MessageInputButtons>
      </MessageInputArea>

      <LoginUserNavigator>
        <LoginUserButton>
          <LoginUserImage>
            <img src={loginAccount && loginAccount.photoURL} alt="img" width='30'></img>
          </LoginUserImage>
          { loginAccount && loginUser ? 
          <div>
            <div>{loginUser.name}</div>
            <ChangeUserButton onClick={() => history.push('/change_user')}>
              Change user
            </ChangeUserButton>
          </div> : 
          <ChangeUserButton onClick={() => history.push('/change_user')}>
            유저를 만들어주세요
          </ChangeUserButton>

        }
          
        </LoginUserButton>
        
        <LogoutButton onClick={() => history.push('/signout')}>Sign out</LogoutButton>
      </LoginUserNavigator>

      <FriendsNavigator>
        {friend_ids.map((friend_id) => (
          <FriendButton key={friend_id}>{userById(friend_id).name}</FriendButton>
        ))}
      </FriendsNavigator>
    </Main>
  );
}
