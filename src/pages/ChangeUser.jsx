import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { InputTextBox, SubmitButton, LinkDiv } from '../styles';
import { Main, WorkingArea } from '../styles/ChangeUser';
import { GET_LOGIN_USER, CREATE_USER } from '../queries';
import { setCurrentUser, setToken } from '../action/cache';
import { fetchWorkspaces } from '../action/workspace';
import { connect } from 'react-redux';

const Page = ({ current_account, setCurrentUserHandler, fetchWorkspacesHandler }) => {
  const history = useHistory();
  const inputRef = useRef();

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted({createUser: { user }}){
      setCurrentUserHandler(user);
      history.push('/workspaces');
    }
  });
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

  return (
    current_account ? <Main>
      <WorkingArea>
        <h2>Select user</h2>
        <div>
          {current_account.users.map((user) => 
            <LinkDiv key={user.id} onClick={() => getLoginUserHandler(user.id)}>{user.name}</LinkDiv>
          )}
          {current_account.users.length > 0 && <div><br />------------ or ------------<br /><br /></div>}
          <InputTextBox type="text" placeholder="New user" ref={inputRef}></InputTextBox>
          <SubmitButton onClick={createUserHandler}>Create</SubmitButton>
        </div>
      </WorkingArea>
    </Main> : null);
}


function mapStateToProps({ cache: { current_account } }) {
  return { current_account };
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

export default connect(mapStateToProps, dispatchToProps)(Page);