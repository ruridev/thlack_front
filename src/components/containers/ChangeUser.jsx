import React, { useRef, useCallback } from 'react';
import SelectUser from '../presenters/change_user/SelectUser'
import NewUser from '../presenters/change_user/NewUser'
import { Main, WorkingArea } from '../../styles/ChangeUser';
import { GET_LOGIN_USER, CREATE_USER } from '../../queries';
import { setCurrentUser } from '../../reducer/cache.action';
import { fetchWorkspaces } from '../../reducer/workspace.action';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';

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
    <Main>
      <WorkingArea>
        <h2>Select user</h2>
        <SelectUser users={users} getLoginUserHandler={getLoginUserHandler} />
        <p>------- or -------</p>
        <NewUser createUserHandler={createUserHandler} inputRef={inputRef} />
      </WorkingArea>
    </Main>
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