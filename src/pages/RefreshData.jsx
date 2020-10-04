import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import {
  GET_ACCOUNT,
  GET_LOGIN_USER,
} from '../queries';
import {
  setCurrentWorkspace,
  setMode,
  setCurrentUser,
  setCurrentAccount
} from '../action/cache';
import { fetchWorkspaces } from '../action/workspace';

import { connect } from 'react-redux';

const Page = ({
  token,
  current_account,
  current_user,
  setCurrentAccountHandler,
  setCurrentUserHandler,
  fetchWorkspacesHandler,
  setCurrentWorkspaceHandler,
}) => {
  const { workspaceId, channelId } = useParams();

  const [getAccount] = useLazyQuery(GET_ACCOUNT, {
    fetchPolicy: `network-only`,
    onCompleted({ account }){
      console.log("getAccount completed");
      setCurrentAccountHandler(account);
    }
  });
  const [getLoginUser] = useLazyQuery(GET_LOGIN_USER, {
    fetchPolicy: `network-only`,
    onCompleted({ loginUser }){
      console.log("getLoginUser completed", loginUser);
      setCurrentAccountHandler(loginUser.account);
      setCurrentUserHandler(loginUser);
      fetchWorkspacesHandler(loginUser.workspaces);
      
      if(loginUser.workspaces && workspaceId) {
        setCurrentWorkspaceHandler(loginUser.workspaces.filter((workspace) => workspace.id === workspaceId)[0]);
      }
    }
  });

  useEffect(() => {
    let flag = true;

    if(flag){
      let tokenKind = localStorage.getItem('kind');
      let tokenValue = localStorage.getItem('token');
      console.log('tokenKind', tokenKind)
      console.log('tokenValue', tokenValue)
      console.log('current_account', current_account)
      if(!current_account && tokenKind === 'account') {
        async function f(){
          await getAccount();
        }
        f();
      }

      tokenKind = localStorage.getItem('kind');

      if(!current_user && tokenKind === 'user') {
        async function f(){
          await getLoginUser();
        }
        f();
      }
    }

    return function() {
      flag = false;
    }
  }, [token]);

  return <></>;
}

function mapStateToProps({ cache: { token, current_account, current_user } }) {
  return { token, current_account, current_user };
}

function dispatchToProps(dispatch) {
  return {
    setCurrentAccountHandler: (account) => {
      dispatch(setCurrentAccount(account));
    },
    setCurrentUserHandler: (user) => {
      dispatch(setCurrentUser(user));
    },
    setCurrentWorkspaceHandler: (workspace) => {
      dispatch(setCurrentWorkspace(workspace));
    },
    setModeHandler: (mode) => {
      dispatch(setMode(mode));
    },
    fetchWorkspacesHandler: (workspaces) => {
      dispatch(fetchWorkspaces(workspaces));
    },
  }
}

export default connect(mapStateToProps, dispatchToProps)(Page);