import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from "apollo-link-http";
import { auth } from './firebase/firebase.utils';
import { HomePage, ChangeUser, NewChannel, NewWorkspace, Workspace } from './pages';

const authLink = setContext((_, {headers, ...context}) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    },
    ...context,
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App({cableApp}) {
  const [loginAccount, setLoginAccount] = useState(null);
  const [loginUser, setLoginUser] = useState(null);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={() => <HomePage loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            <Route path="/sigin" component={() => <HomePage loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            <Route path="/signout" component={() => <HomePage initFunction={()=> auth.signOut() } loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            <Route path="/workspaces" component={() => <Workspace cableApp={cableApp} loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            <Route path="/workspaces/new" component={() => <NewWorkspace cableApp={cableApp} loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            <Route path="/workspaces/:workspace_id" component={() => <Workspace cableApp={cableApp} loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            <Route path="/workspaces/:workspace_id/channels/new" component={() => <NewChannel cableApp={cableApp} loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            <Route path="/workspaces/:workspace_id/:channel_id" component={() => <Workspace cableApp={cableApp} loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            <Route path="/change_user" component={() => <ChangeUser cableApp={cableApp} loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />  
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
