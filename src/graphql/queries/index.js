import { useCallback } from "react";
import { useDispatch } from 'react-redux'
import { useLazyQuery } from '@apollo/client';
import { 
  GET_LOGIN_USER,
  SEARCH_WORKSPACES,
  GET_ACCOUNT, 
  GET_WORKSPACES
} from '../../queries';
import { setCurrentAccount, setCurrentUser } from "../../reducer/cache.action";
import { fetchWorkspaces } from "../../reducer/workspace.action";

const useLoginUser = (callback, options) => {
  const dispatch = useDispatch();
  const [query] = useLazyQuery(GET_LOGIN_USER, { fetchPolicy: `network-only`, onCompleted(data) {
    if(options?.storeAction) {
      dispatch(setCurrentAccount(data.loginUser.account));
      dispatch(setCurrentUser(data.loginUser));
      dispatch(fetchWorkspaces(data.loginUser.workspaces));
      localStorage.setItem('kind', 'user')
      localStorage.setItem('token', data.loginUser.token)
    }
    if(callback) {
      callback(data);
    }
  }});
  return useCallback((params) => query({ variables: params }), [query]);
};

const useSearchWorkspaces = (callback, options) => {
  const dispatch = useDispatch();
  const [query] = useLazyQuery(SEARCH_WORKSPACES, { fetchPolicy: `network-only`, onCompleted(data) { 
    if(options?.storeAction) {
    }
    if(callback) {
      callback(data);
    }
  }});    
  return useCallback((params) => query({ variables: params }), [query]);
};

const useGetAccount = (callback, options) => {
  const dispatch = useDispatch();
  const [query] = useLazyQuery(GET_ACCOUNT, { fetchPolicy: `network-only`, onCompleted(data) {
    if(options?.storeAction) {
      dispatch(setCurrentAccount(data.account));
    }
    if(callback) {
      callback(data);
    }
  }});
  return useCallback((params) => query({ variables: params }), [query]);
};

const useGetWorkspaces = (callback, options) => {
  const dispatch = useDispatch();
  const [query] = useLazyQuery(GET_WORKSPACES, { fetchPolicy: `network-only`, onCompleted(data) {
    if(options?.storeAction) {
      dispatch(fetchWorkspaces(data.workspaces));
    }
    if(callback) {
      callback(data);
    }
  }});
  return useCallback((params) => query({ variables: params }), [query]);
};

export {
  useLoginUser,
  useSearchWorkspaces,
  useGetAccount,
  useGetWorkspaces,
}