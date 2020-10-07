import React, { useEffect, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  GET_ACCOUNT,
  GET_LOGIN_USER,
} from '../queries';
import {
  setCurrentUser,
  setCurrentAccount
} from '../action/cache';

import { connect } from 'react-redux';

const Page = ({
  setCurrentAccountHandler,
  setCurrentUserHandler,
}) => {
  const [getAccount] = useLazyQuery(GET_ACCOUNT, {
    fetchPolicy: `network-only`,
    onCompleted({ account }){
      setCurrentAccountHandler(account);
    }
  });
  const [getLoginUser] = useLazyQuery(GET_LOGIN_USER, {
    fetchPolicy: `network-only`,
    onCompleted({ loginUser }){
      setCurrentAccountHandler(loginUser.account);
      setCurrentUserHandler(loginUser);
    }
  });

  useEffect(() => {
    let flag = true;

    if(flag){
      let tokenKind = localStorage.getItem('kind');
      let tokenValue = localStorage.getItem('token');
      if(tokenKind === 'account') {
        async function f(){
          await getAccount();
        }
        f();
      }

      tokenKind = localStorage.getItem('kind');

      if(tokenKind === 'user') {
        async function f(){
          await getLoginUser();
        }
        f();
      }
    }

    return function() {
      flag = false;
    }
  }, []);

  return <></>;
}

function dispatchToProps(dispatch) {
  return {
    setCurrentAccountHandler: (account) => {
      dispatch(setCurrentAccount(account));
    },
    setCurrentUserHandler: (user) => {
      dispatch(setCurrentUser(user));
    },
  }
}

export default connect(null, dispatchToProps)(Page);