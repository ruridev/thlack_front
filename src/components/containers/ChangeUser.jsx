import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../reducer/cache.action';
import { fetchWorkspaces } from '../../reducer/workspace.action';
import ChangeUser from '../presenters/change_user/ChangeUser'
import { useLoginUser } from '../../graphql/queries'
import { useCreateUser } from '../../graphql/mutations'

const Container = ({ users, setCurrentUserHandler, fetchWorkspacesHandler }) => {
  const history = useHistory();
  const inputRef = useRef();

  const getLoginUser = useLoginUser(() => {
    history.push('/workspaces');
  }, { storeAction: true })

  const createUser = useCreateUser(() => {
    history.push('/workspaces');
  }, { storeAction: true })

  const createUserHandler = useCallback(() => {
    if(inputRef.current.value.trim().length === 0){
      inputRef.current.focus();
      return false;
    }
    createUser({
      name: inputRef.current.value
    });
  }, [inputRef, createUser]);

  const getLoginUserHandler = useCallback((user_id) => {
    getLoginUser({ id: parseInt(user_id) });
  }, [getLoginUser]);

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