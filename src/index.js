import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import actionCable from 'actioncable';
import './index.css';

const CableApp = {}
CableApp.cable = actionCable.createConsumer('wss://thlack.herokuapp.com/cable')

ReactDOM.render(
  <React.StrictMode>
  <App cableApp={CableApp} />
  </React.StrictMode>,
  document.getElementById('root')
);