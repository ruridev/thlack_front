import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import actionCable from 'actioncable';
import { Provider } from 'react-redux'
import configureStore from './store';
import reducer from './reducer'
import { createHttpLink } from "apollo-link-http";
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: (process.env.REACT_APP_THLACK_ENV === 'production' ? 
          'https://thlack.herokuapp.com/graphql' :
          'http://localhost:3001/graphql')
});

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


const CableApp = {}
CableApp.cable = actionCable.createConsumer((process.env.REACT_APP_THLACK_ENV === 'production' ? 
                                              'wss://thlack.herokuapp.com/cable' :
                                              'ws://localhost:3001/cable'))

const store = configureStore(reducer, { chat: { cableApp: CableApp } });

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>,
    document.getElementById('root')
  );
}

store.subscribe(render);
render();