import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, useHistory, useParams, Link } from 'react-router-dom';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { auth, signInWithGoogle, signInWithGithub } from './firebase/firebase.utils';

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas: 
    "workspace channelname user"
    "workspace message user"
    "workspace message friends"
    "channel message friends"
    "channel input friends";
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 64px 54px minmax(10px, 60px) auto minmax(10px, 60px);
`
const WorkspaceNavigator = styled.div`
  grid-area: workspace;
  background-color: black;
  color: white;
  overflow: hidden;
  :hover {
    overflow: auto;
  }
`

const NewWorkspace = styled.div`
  padding: 8px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

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
`
const ChannelNavigator = styled.div`
  grid-area: channel;
  overflow: hidden;
  :hover {
    overflow: auto;
  }
`

const NewChannel = styled.div`
  padding: 8px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`
const ChannelButton = styled.div`
  padding: 8px;
`
const MessageList = styled.div`
  grid-area: message;
  overflow: auto;
  position: relative;
`
const WorkspaceChannelName = styled.h2`
  grid-area: channelname;
  text-align: center;
  margin: 0 auto;
  color: rgba(0,0,0, 0.6);
`
const Message = styled.div`
  white-space: pre-line;
  margin: 8px;
`
const MessageInputArea = styled.div`
  grid-area: input;
`
const MessageInput = styled.textarea`
  width: 99%;
`
const MessageInputButtons = styled.div`
`

const LoginUserNavigator = styled.div`
  grid-area: user;
`
const LoginUserButton = styled.div`
  padding: 8px;
`
const LoginUserImage = styled.div`
  margin: 0 auto;
  text-align: center;
`

const ChangeUserButton = styled.div`
  padding-bottom: 8px;
  text-align: center;
  font-size: 0.7rem;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`
const LogoutButton = styled.div`
  padding-bottom: 8px;
  text-align: center;
  font-size: 0.7rem;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`
const FriendsNavigator = styled.div`
  grid-area: friends;
  overflow: hidden;
  :hover {
    overflow: auto;
  }
`
const FriendButton = styled.div`
  background-color: black;
  color: white;
  padding: 8px;
`


const messages = [
  { id: 1, body: 'Unless you are supporting Internet Explorer 10 and earlier, there really is no excuse to be sleeping on CSS Grid these days. It makes web layouts much more intuitive and flexible. Let’s take a look at a basic layout to get started.', send_at: '11:12 am', user_id: 3, },
  { id: 3, body: 'As you can see, there are four main sections: header, footer, sidebar, and content. The header, footer, and sidebar are sticky. Meaning, while the content might overflow the bounds of the page and require scrolling, these element will remain on screen at all times. Only the content will scroll as it overflows.', send_at: '11:12 am', user_id: 4, },
  { id: 4, body: 'To start, let’s prevent the body from overflowing. This ensures that our parent grid container will retain full control of the entire browser viewport. There should be nothing outside of our parent.', send_at: '11:12 am', user_id: 1, },
  { id: 14, body: 'A grid layout works in terms of columns and rows. Every immediate child of a grid container corresponds to a particular column or row (or spans a number of columns or rows). In our example, each immediate child element will take up exactly one column or row. First let’s add the immediate child elements to the DOM: the header, footer, and body (which will eventually contain both the sidebar and page content).', send_at: '11:12 am', user_id: 2, },
  { id: 5, body: 'Next we’ll tell .container that it is indeed a grid container by adding the display property display: grid. Now that it knows that it’s a grid, let’s tell it exactly how many columns and rows it will container along with their sizes. grid-template-columns: 1fr tells the grid container that it is one giant column spanning from end-to-end. grid-template-rows: 30px 1fr 30px tells the grid container that the first and third row heights will be exactly 30px at all times. This refers to the .header and .footer. The second row 1fr tells the grid container that, having allocated 30px each for the header and footer, that the rest of the space should be allocated for .body which will include both the sidebar and the content sections.', send_at: '11:12 am', user_id: 3, },
  { id: 6, body: 'Now, let’s turn our attention to the .body element which contains both the sidebar and the content. Although .body is the second row of the parent grid container, it can itself become a grid container for child elements nested within: .sidebar and .content.', send_at: '11:12 am', user_id: 4, },
  { id: 7, body: 'As with the parent grid container we tell .body that it is a grid container with two columns: 1fr 3fr. This means that the first column (the sidebar) will take up 1 fraction of the overall width of the parent, while the second columns (the page content) will take 3 fractions. We will also hide any overflow to ensure that nothing leaks outside of the .content element that would disturb the parent’s layout.', send_at: '11:12 am', user_id: 1, },
  { id: 8, body: 'The final piece of the puzzle is adding overflow to the .content element. Since it’s immediate parent hides all overflow, adding overflow-y: scroll ensures that content that would exceed the height of this element automatically adds scrolling from within.', send_at: '11:12 am', user_id: 2, },
  { id: 9, body: 'A simple grid layout that uses very few lines of css and a minimal DOM. It might not be apparent right now but this will save much more time as the webpage gets more complex. It’ll be easier to handle and make drastic layout changes based on device or browser width. In 2019 there really is no reason not to use CSS Grid — unless you have to support IE10 or earlier :’(', send_at: '11:12 am', user_id: 3, },
];

const users = [
  { id: 1, name: 'friend1', },
  { id: 2, name: 'friend2', },
  { id: 3, name: 'friend3', },
  { id: 4, name: 'friend4', }
];

const friend_ids = [2, 3, 4];
const userById = (id) => {
  return users.filter(user => user.id == id)[0];
}

const CREATE_ACCOUNT = gql`
  mutation CreateAccount(
    $identifier: String!,
    $providerId: String!,
    $displayName: String,
    $email: String!
  ) {
    createAccount(
      input: {
        credentials: {
          identifier: $identifier,
          providerId: $providerId
        },
        displayName: $displayName,
        email: $email
      }
    )
    {
      account {
        id
      }
      user {
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



export default function Page({loginUser, setLoginUser, loginAccount, setLoginAccount}){
  const [createAccount, { loadingCreateAccount, errorCreateAccount, dataCreateAccount }] = useMutation(CREATE_ACCOUNT);
  const [getWorkspaces, workspacesResults] = useLazyQuery(GET_WORKSPACES);
  const [getChannels, channelsResult] = useLazyQuery(GET_CHANNELS);

  const { workspace_id, channel_id } = useParams();
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [currentChannel, setCurrentChannel] = useState(null); 

  const history = useHistory();

  useEffect(() => {
    console.log("1");
    auth.onAuthStateChanged((user) => {
      if(user == undefined || user == null){
        setLoginAccount(null);
        history.push('/');
      }else if(user.email != null){
        setLoginAccount(user);

        getWorkspaces({ variables: {}});
      }
    });

    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, [history]);

  useEffect(() => {
    if(workspace_id) {
      getChannels({ variables: { workspace_id: parseInt(workspace_id)}});
    }
    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, [workspace_id]);

  useEffect(() => {
    console.log('channel_id', channel_id)

    console.log('workspace_id', workspace_id)
    if(workspace_id) {
      async function f() {
        await getChannels({ variables: { workspace_id: parseInt(workspace_id)}});
      }
      f();
    }

    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, [channel_id]);

  return (
    <Main>
      <WorkspaceNavigator>
        <NewWorkspace onClick={() => history.push('/workspaces/new')}>
          +New
        </NewWorkspace>
        {false && workspacesResults.called && workspacesResults.loading && <div>Loading...</div>}
        {workspacesResults.data && workspacesResults.data.workspaces.map(workspace => 
          <WorkspaceButton key={workspace.id}>
            <Link to={`/workspaces/${workspace.id}`}>{workspace.name}</Link>
          </WorkspaceButton>
        )}
      </WorkspaceNavigator>
      
      <ChannelNavigator>
        <NewChannel onClick={() => history.push(`/workspaces/${workspace_id && workspace_id}/channels/new`)}>
          +New
        </NewChannel>

        {false && channelsResult.called && channelsResult.loading && <div>Loading...</div>}
        {!channelsResult.loading && channelsResult.data && channelsResult.data.channels.map(channel => 
          <ChannelButton key={channel.id}>
            #{channel.name}
          </ChannelButton>
        )}
      </ChannelNavigator>

      <WorkspaceChannelName>
        workspace1#channel1
      </WorkspaceChannelName>

      <MessageList>
        {messages.map(message => 
          <Message key={message.id}>
            <div>
              <b>{userById(message.user_id).name}</b>&nbsp;
              <small>{message.send_at}</small>
            </div>
            <div>
              {message.body}
            </div>
          </Message>
        )}
        
      </MessageList>
      
      <MessageInputArea>
        <MessageInput />
        <MessageInputButtons />
      </MessageInputArea>

      <LoginUserNavigator>
        <LoginUserButton>
          <LoginUserImage>
            <img src={loginAccount && loginAccount.photoURL} width="30"></img>
          </LoginUserImage>
          {loginAccount && (loginAccount.displayName || loginAccount.email.split('@')[0])}
        </LoginUserButton>
        <ChangeUserButton onClick={() => history.push('/change_user') }>
          Change user
        </ChangeUserButton>
        <LogoutButton onClick={() => auth.signOut() }>
          Sign out
        </LogoutButton>
      </LoginUserNavigator>

      <FriendsNavigator>
        {friend_ids.map(friend_id => 
          <FriendButton key={friend_id}>
            {userById(friend_id).name}
          </FriendButton>
        )}
      </FriendsNavigator>
    </Main>);
}