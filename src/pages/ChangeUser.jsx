import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { InputTextBox, SubmitButton, LinkDiv } from '../styles';
import { Main, WorkingArea } from '../styles/ChangeUser';
import { GET_ACCOUNT, GET_USER_WITH_TOKEN, CREATE_USER } from '../queries';

export default function Page(props){
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted({createUser: { user }}){
      props.setLoginUserHandler(user);
      history.push('/workspaces');
    }
  });
  const [getAccount, { data: accountData }] = useLazyQuery(GET_ACCOUNT, { fetchPolicy: `network-only` });

  const [getUserWithToken] = useLazyQuery(GET_USER_WITH_TOKEN, {
    fetchPolicy: `network-only`,
    onCompleted({ user }){
      props.setLoginUserHandler(user);
      history.push('/workspaces');
    }
  });

  const [userName, setUserName] = useState('');
  const history = useHistory();
  const inputRef = useRef();

  useEffect(() => {
    let flag = true;

    if(flag){
      getAccount();
    }

    return function () {
      flag = false;
    }
  }, [])

  const getUserWithTokenHandler = (user_id) => {
    getUserWithToken({
      variables: {
        id: parseInt(user_id)
      },
    });
  }
  const createUserHandler = () => {
    if(userName?.trim().length === 0){
      inputRef.current.focus();
      return false;
    }

    createUser({
      variables: {
        name: userName
      },
    });
  }

  return (
    <Main>
      <WorkingArea>
        <h2>Select user</h2>
        <div>
          {accountData && accountData.account.users.map((user) => 
          <LinkDiv key={user.id} onClick={() => getUserWithTokenHandler(user.id)}>{user.name}</LinkDiv>
          )}
          {accountData && accountData.account.users.length > 0 && <div><br />------------ OR ------------<br /><br /></div>}

          <InputTextBox type="text" placeholder="New user" ref={inputRef} onChange={(e) => setUserName(e.target.value)}></InputTextBox>
          <SubmitButton onClick={createUserHandler}>만들기</SubmitButton>
        </div>
      </WorkingArea>
    </Main>);
}