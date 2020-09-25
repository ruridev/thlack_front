import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import actionCable from 'actioncable';
import './index.css';
import { Provider } from 'react-redux'
import store from './store'

const CableApp = {}
CableApp.cable = actionCable.createConsumer((process.env.REACT_APP_THLACK_ENV === 'production' ? 'wss://thlack.herokuapp.com/cable' : 'ws://localhost:3001/cable'))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App cableApp={CableApp} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);