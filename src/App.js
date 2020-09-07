import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useReactRouter from 'use-react-router';

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas: 
    "workspace message user"
    "channel message user"
    "channel input user";
  grid-template-columns: auto 1fr auto;
  grid-auto-rows: minmax(10px, 110px) auto minmax(10px, 60px);
`
const WorkspaceNavigator = styled.div`
  grid-area: workspace;
  overflow-y: auto;
`
const WorkspaceButton = styled.div`
  border: 1px solid #000000;
  padding: 4px;
`
const ChannelNavigator = styled.div`
  grid-area: channel;
  overflow-y: auto;
`
const ChannelButton = styled.div`
  border: 1px solid #000000;
  padding: 4px;
`
const MessageList = styled.div`
  grid-area: message;
  overflow-y: auto;
  position: relative;
`
const Message = styled.div`
  white-space: pre-line;
  margin: 8px;
`
const MessageInputArea = styled.div`
  grid-area: input;
`
const MessageInput = styled.textarea`
  width: 100%;
`
const MessageInputButtons = styled.div`
  
`
const UserNavigator = styled.div`
  grid-area: user;
  margin: 8px;
`
const LoginUserNavigator = styled.div`
`
const FriendsNavigator = styled.div`
`
const FriendButton = styled.div`
border: 1px solid #000000;
`

const Home = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas: 
    ". . ."
    ". signin ."
    ". . .";
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr 1fr 1fr;
`
const SignIn = styled.div`
  grid-area: signin;
  padding: 4px;
  border: 1px solid #000000;
  text-align: center;
`
const workspaces = [
  {
    id: 1,
    name: 'workspace1',
  },
  {
    id: 2,
    name: 'workspace2',
  },
  {
    id: 3,
    name: 'workspace3',
  },
  {
    id: 4,
    name: 'workspace4',
  },
  {
    id: 5,
    name: 'workspace5',
  },
  {
    id: 6,
    name: 'workspace6',
  },
];

const channels = [
  { id: 1, name: 'channel1', workspace_id: 1, },
  { id: 2, name: 'channel2', workspace_id: 1, },
  { id: 3, name: 'channel3', workspace_id: 1, },
  { id: 4, name: 'channel4', workspace_id: 1, },
  { id: 5, name: 'channel5', workspace_id: 1, },
  { id: 6, name: 'channel6', workspace_id: 1, },
  { id: 7, name: 'channel7', workspace_id: 1, },
  { id: 8, name: 'channel8', workspace_id: 1, },
  { id: 9, name: 'channel9', workspace_id: 1, },
  { id: 10, name: 'channel10', workspace_id: 1, },
  { id: 11, name: 'channel11', workspace_id: 1, },
  { id: 12, name: 'channel12', workspace_id: 1, },
  { id: 13, name: 'channel13', workspace_id: 1, },
  { id: 14, name: 'channel14', workspace_id: 1, },
  { id: 15, name: 'channel15', workspace_id: 1, },
  { id: 16, name: 'channel16', workspace_id: 1, },
  { id: 17, name: 'channel17', workspace_id: 1, },
  { id: 18, name: 'channel18', workspace_id: 1, },
  { id: 19, name: 'channel19', workspace_id: 1, },
  { id: 20, name: 'channel20', workspace_id: 1, },
  { id: 21, name: 'channel21', workspace_id: 1, },
  { id: 22, name: 'channel22', workspace_id: 1, },
  { id: 23, name: 'channel23', workspace_id: 1, },
  { id: 24, name: 'channel24', workspace_id: 1, },
  { id: 25, name: 'channel25', workspace_id: 1, },
  { id: 26, name: 'channel26', workspace_id: 1, },
  { id: 27, name: 'channel27', workspace_id: 1, },
  { id: 28, name: 'channel28', workspace_id: 1, },
  { id: 29, name: 'channel29', workspace_id: 1, },
  { id: 30, name: 'channel30', workspace_id: 1, },
  
];

const messages = [
  { id: 1, body: 'それは\nmessage\nですか？', send_at: '11:12 午前', user_id: 3, },
  { id: 3, body: 'はい、これは\nmessage\nです.', send_at: '11:12 午前', user_id: 4, },
  { id: 4, body: '本当に、それは\nmessage\nですか？', send_at: '11:12 午前', user_id: 1, },
  { id: 4, body: 'これは\nmessage\nです.', send_at: '11:12 午前', user_id: 2, },
  { id: 5, body: 'それは\nmessage\nですか？', send_at: '11:12 午前', user_id: 3, },
  { id: 6, body: 'はい、これは\nmessage\nです.', send_at: '11:12 午前', user_id: 4, },
  { id: 7, body: '本当に、それは\nmessage\nですか？', send_at: '11:12 午前', user_id: 1, },
  { id: 8, body: 'これは\nmessage\nです.', send_at: '11:12 午前', user_id: 2, },
  { id: 9, body: 'それは\nmessage\nですか？', send_at: '11:12 午前', user_id: 3, },
  { id: 10, body: 'はい、これは\nmessage\nです.', send_at: '11:12 午前', user_id: 4, },
  { id: 11, body: '本当に、それは\nmessage\nですか？', send_at: '11:12 午前', user_id: 1, },
  { id: 12, body: 'これは\nmessage\nです.', send_at: '11:12 午前', user_id: 2, }
];

const user = {
  name: 'han',
};

const users = [
  { id: 1, name: 'han', },
  { id: 2, name: 'lee', },
  { id: 3, name: 'kim', },
  { id: 4, name: 'park', }
];

const friend_ids = [2, 3, 4];
const userById = (id) => {
  return users.filter(user => user.id == id)[0];
}

const MainPage = () => {
  return (
  <Main>
    <WorkspaceNavigator>
      {workspaces.map(workspace => 
        <WorkspaceButton>
          {workspace.name}
        </WorkspaceButton>
      )}
    </WorkspaceNavigator>
    
    <ChannelNavigator>
      {channels.map(channel => 
        <ChannelButton>
          {channel.name}
        </ChannelButton>
      )}
      
    </ChannelNavigator>

    <MessageList>
      {messages.map(message => 
        <Message>
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
      <MessageInput>

      </MessageInput>
      <MessageInputButtons>

      </MessageInputButtons>
    </MessageInputArea>

    <UserNavigator>
      <LoginUserNavigator>
        {user.name}
      </LoginUserNavigator>
      <FriendsNavigator>
        <div>FRIENDS</div>
        {friend_ids.map(friend_id => 
          <FriendButton>
            {userById(friend_id).name}
          </FriendButton>
        )}
      </FriendsNavigator>
    </UserNavigator>
  </Main>);
}

const EmailProviderSignUpHandler = () => {
  alert("signup");
}

const EmailProviderSignInHandler = () => {
  alert("signin");
}

const GoogleProviderHandler = () => {
  alert("gogle");
}

const GithubProviderHandler = () => {
  alert("github");
}
const HomePage = () => {
  const { history, location, match } = useReactRouter();
  return(
    <Home>
      <SignIn>
        <div>
          <h1>
            Thlack
          </h1>
        </div>
        <p>
          <input type="text" placeholder="user@email.com"></input>
        </p>
        <p>
          <input type="password" placeholder="******"></input>
        </p>
        <p>
          <button onClick={() => EmailProviderSignInHandler() }>Sign in</button>&nbsp;
          <button onClick={() => EmailProviderSignUpHandler() }>Sign up</button>
        </p>
        <hr />
        <p>
          <button onClick={() => GoogleProviderHandler() }>
            <b><font color="blue">G</font>
            <font color="red">o</font>
            <font color="orange">o</font>
            <font color="blue">g</font>
            <font color="green">l</font>
            <font color="red">e</font></b>
            </button>&nbsp;
          <button onClick={() => GithubProviderHandler() }><b>GitHub</b></button>
        </p>
      </SignIn>
    </Home>
  );
}

function App() {
  useEffect(() => {

  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/workspace/:workspace_id" component={MainPage} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
