import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from "apollo-link-http";
import { auth } from './firebase/firebase.utils';
import { HomePage, ChangeUser, NewWorkspace, NewChannel, Workspace, Friends } from './pages';

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
  uri: 'https://thlack.herokuapp.com/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App({cableApp}) {
  const [loginAccount, setLoginAccount] = useState(null);
  const [loginUser, setLoginUser] = useState(null);

  const loginDataParams = () => {
    return {
      loginUser,
      setLoginUserHandler,
      loginAccount,
      setLoginAccount,
    }
  }
  const loginDataWithCableAppParams = () => {
    return {
      loginUser,
      setLoginUserHandler,
      loginAccount,
      setLoginAccount,
      cableApp,
    }
  }

  const setLoginUserHandler = (user) => {
    setLoginUser(user);
    if(user.token) {
      localStorage.setItem('kind','user')
      localStorage.setItem('token', user.token)
    }
  }
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={() => <HomePage {...loginDataParams()}{...loginDataParams()} />} exact />
            <Route path="/sigin" component={() => <HomePage {...loginDataParams()} />} exact />
            <Route path="/signout" component={() => <HomePage initFunction={()=> auth.signOut() } {...loginDataParams()} />} exact />
            <Route path="/workspaces" component={() => <Workspace {...loginDataWithCableAppParams()} />} exact />
            <Route path="/workspaces/new" component={() => <NewWorkspace {...loginDataWithCableAppParams()} />} exact />
            <Route path="/workspaces/:workspaceId" component={() => <Workspace {...loginDataWithCableAppParams()} />} exact />
            <Route path="/workspaces/:workspaceId/new" component={() => <NewChannel {...loginDataWithCableAppParams()} />} exact />
            <Route path="/workspaces/:workspaceId/:channelId" component={() => <Workspace {...loginDataWithCableAppParams()} />} exact />
            <Route path="/change_user" component={() => <ChangeUser {...loginDataParams()} />} exact />  
             {/*
               아래 두 기능은 따로 주소를 할당해야 하는건지 의문이 생겼음
               <Route path="/workspaces/:workspace_id/invite" component={() => <Workspace {...loginDataWithCableAppParams()} />} exact />
             */}
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
