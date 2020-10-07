import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

export default function configureStore(reducer, initialState = {}) {
  const enhancer = compose(
    applyMiddleware(thunk, logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  );
  return createStore(reducer, initialState, enhancer);
}
