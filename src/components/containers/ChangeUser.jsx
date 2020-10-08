import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_LOGIN_USER, CREATE_USER } from '../../queries';
import { setCurrentUser } from '../../reducer/cache.action';
import { fetchWorkspaces } from '../../reducer/workspace.action';
import ChangeUser from '../presenters/change_user/ChangeUser'

const Container = ({ users, setCurrentUserHandler, fetchWorkspacesHandler }) => {
  const history = useHistory();
  const inputRef = useRef();

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted({createUser: { user }}){
      setCurrentUserHandler(user);
      history.push('/workspaces');
    }
  });

  const createUserHandler = useCallback(() => {
    if(inputRef.current.value.trim().length === 0){
      inputRef.current.focus();
      return false;
    }
    createUser({
      variables: {
        name: inputRef.current.value
      },
    });
  }, [inputRef]);

  const [getLoginUser] = useLazyQuery(GET_LOGIN_USER, {
    fetchPolicy: `network-only`,
    onCompleted({ loginUser }){
      setCurrentUserHandler(loginUser);    
      fetchWorkspacesHandler(loginUser.workspaces);
      
      history.push('/workspaces');
    }
  });

  const getLoginUserHandler = useCallback((user_id) => {
    getLoginUser({
      variables: {
        id: parseInt(user_id)
      },
    });
  }, []);

  return (
    <ChangeUser 
      users={users}
      getLoginUserHandler={getLoginUserHandler}
      createUserHandler={createUserHandler}
      inputRef={inputRef} />
  );
}

function mapStateToProps({ cache: { current_account: { users } } }) {
  return { users };
}

function dispatchToProps(dispatch) {
  return {
    setCurrentUserHandler: (user) => {
      dispatch(setCurrentUser(user));
      localStorage.setItem('kind', 'user')
      localStorage.setItem('token', user.token)
    },
    fetchWorkspacesHandler: (workspaces) => {
      dispatch(fetchWorkspaces(workspaces));
    },
  };
}

export default connect(mapStateToProps, dispatchToProps)(Container);