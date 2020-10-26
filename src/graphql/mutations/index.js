import { useCallback } from "react";
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client';
import { 
  CREATE_USER,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  UPDATE_MESSAGE,
  CREATE_CHANNEL,
  CREATE_ACCOUNT,
  CREATE_WORKSPACE,
  JOIN_WORKSPACE,
  JOIN_CHANNEL
 } from '../../queries';
import { setCurrentAccount, setCurrentUser, setCurrentWorkspace } from "../../reducer/cache.action";
import { addChannel, addWorkspace } from "../../reducer/workspace.action";

const useCreateUser =  (callback, options) => {
  const dispatch = useDispatch();
  const [mutatation] = useMutation(CREATE_USER, { onCompleted(data) {
    if(options?.storeAction) {
      dispatch(setCurrentUser(data.createUser.user));
      localStorage.setItem('kind', 'user')
      localStorage.setItem('token', data.createUser.user.token)
    }
    if(callback) { callback(data); }
  }});
  return useCallback((params) => mutatation({ variables: params }), [mutatation]);
};

const useCreateMessage =  (callback, options) => {
  const dispatch = useDispatch();
  const [mutatation] = useMutation(CREATE_MESSAGE, { onCompleted(data) { 
    if(options?.storeAction) {
    }
    if(callback) { callback(data); }
  }});
  return useCallback((params) => mutatation({ variables: params }), [mutatation]);
};

const useDeleteMessage =  (callback, options) => {
  const dispatch = useDispatch();
  const [mutatation] = useMutation(DELETE_MESSAGE, { onCompleted(data) { 
    if(options?.storeAction) {
    }
    if(callback) { callback(data); }
  }});
  return useCallback((params) => mutatation({ variables: params }), [mutatation]);
};

const useUpdateMessage =  (callback, options) => {
  const dispatch = useDispatch();
  const [mutatation] = useMutation(UPDATE_MESSAGE, { onCompleted(data) { 
    if(options?.storeAction) {
    }
    if(callback) { callback(data); }
  }});
  return useCallback((params) => mutatation({ variables: params }), [mutatation]);
};

const useCreateChannel =  (callback, options) => {
  const dispatch = useDispatch();
  const [mutatation] = useMutation(CREATE_CHANNEL, { onCompleted(data) {
    if(options?.storeAction) {
      dispatch(addChannel(data.createChannel.channel.workspace.id, data.createChannel.channel));
    }
    if(callback) { callback(data); }
  }});
  return useCallback((params) => mutatation({ variables: params }), [mutatation]);
};

const useCreateWorkspace =  (callback, options) => {
  const dispatch = useDispatch();
  const [mutatation] = useMutation(CREATE_WORKSPACE, { onCompleted(data) { 
    if(options?.storeAction) {
      dispatch(addWorkspace(data.createWorkspace.workspace));
      dispatch(setCurrentWorkspace(data.createWorkspace.workspace));
    }
    if(callback) { callback(data); }
  }});
  return useCallback((params) => mutatation({ variables: params }), [mutatation]);
};

const useJoinWorkspace =  (callback, options) => {
  const dispatch = useDispatch();
  const [mutatation] = useMutation(JOIN_WORKSPACE, { onCompleted(data) { 
    if(options?.storeAction) {
      dispatch(setCurrentWorkspace(data.joinWorkspace.workspace));
    }
    if(callback) { callback(data); }
  }});
  return useCallback((params) => mutatation({ variables: params }), [mutatation]);
};

const useJoinChannel =  (callback, options) => {
  const dispatch = useDispatch();
  const [mutatation] = useMutation(JOIN_CHANNEL, { onCompleted(data) { 
    if(options?.storeAction) {
    }
    if(callback) { callback(data); }
  }});
  return useCallback((params) => mutatation({ variables: params }), [mutatation]);
};

const useCreateAccount =  (callback, options) => {
  const dispatch = useDispatch();
  const [mutatation] = useMutation(CREATE_ACCOUNT, { onCompleted(data) { 
    if(options?.storeAction) {
      if(!data.createAccount.already_exists){
        dispatch(setCurrentAccount(data.createAccount.account));
      }
    }
    if(callback) { callback(data); }
  }});
  return useCallback((params) => mutatation({ variables: params }), [mutatation]);
};

export {
  useCreateUser,
  useCreateMessage,
  useDeleteMessage,
  useUpdateMessage,
  useCreateChannel,
  useCreateWorkspace,
  useJoinWorkspace,
  useJoinChannel,
  useCreateAccount,
}