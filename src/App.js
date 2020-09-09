import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from "apollo-link-http";

import HomePage from './Home'
import Workspace from './Workspace'
import NewWorkspace from './NewWorkspace'
import NewChannel from './NewChannel'
import ChangeUser from './ChangeUser'

const authLink = setContext((_, {headers, ...context}) => {
  const token = localStorage.getItem('token');
  console.log(token);
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
  cache: new InMemoryCache({
    resultCaching: false
  })
});

function App() {
  const [loginAccount, setLoginAccount] = useState(null);
  const [loginUser, setLoginUser] = useState(null);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={() => <HomePage loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            <Route path="/workspaces/new" component={() => <NewWorkspace loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            <Route path="/workspaces/:workspace_id" component={() => <Workspace loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            <Route path="/workspaces/:workspace_id/channels/new" component={() => <NewChannel loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            <Route path="/workspaces/:workspace_id/:channel_id" component={() => <Workspace loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            <Route path="/change_user" component={() => <ChangeUser loginUser={loginUser} setLoginUser={setLoginUser} loginAccount={loginAccount} setLoginAccount={setLoginAccount} />} exact />
            
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
