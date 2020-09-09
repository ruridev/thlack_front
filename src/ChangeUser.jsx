import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, useHistory, useParams } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import { auth, signInWithGoogle, signInWithGithub } from './firebase/firebase.utils';

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas: 
    ". . ."
    ". a ."
    ". . .";
  grid-template-columns: auto 153px auto;
  grid-template-rows: auto 100px auto;
`

const WorkingArea = styled.div`
  grid-area: a;
  text-align: center;
`

const ChangeUserButton = styled.div`
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`


// 유저 가져오기
const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
    }
  }
`;


// 토큰 취득하기
const GET_TOKEN = gql`
  query getToken($user_id: Int!) {
    token(userId: $user_id)
  }
`;

// 토큰 취득하기
const GET_USER = gql`
  query getUser($id: Int!) {
    user(id: $id){
      id
      name
    }
  }
`;

export default function Page({loginUser, setLoginUser, loginAccount, setLoginAccount}){
  const [getUsers, { called, loading, data }] = useLazyQuery(GET_USERS);
  const [getUser, userResult] = useLazyQuery(GET_USER);
  const [getToken, tokenResult] = useLazyQuery(GET_TOKEN);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getUsers();

    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, [])
  
  useEffect(() => {
    if(tokenResult && tokenResult.data) {
      localStorage.setItem('kind','user')
      localStorage.setItem('token',tokenResult.data.token)
      
      console.log(selectedUserId);
      async function f(){
        await getUser({
          variables: {
            id: parseInt(selectedUserId)
          },
        });
      }
      f();
    }

    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, [tokenResult.data])

  useEffect(() => {
    console.log(userResult.data)
    if(userResult && userResult.data) {
      console.log(userResult.data.user);
      setLoginUser(userResult.data.user);
      history.goBack();
    }

    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, [userResult.data])

  const getTokenHandler = (user_id) => {
    setSelectedUserId(user_id);

    getToken({
      variables: {
        user_id: parseInt(user_id)
      },
    });
  }

  return (
    <Main>
      <WorkingArea>
        <div>
          {data && data.users.map((user) => 
          <ChangeUserButton key={user.id} onClick={() => getTokenHandler(user.id)}>{user.name}</ChangeUserButton>
          )}
        </div>
      </WorkingArea>
    </Main>);
}