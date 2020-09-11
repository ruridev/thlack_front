import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { gql, useLazyQuery, useMutation } from '@apollo/client';

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


// 유저 새로 만들기
const CREATE_USER = gql`
mutation CreateUser(
  $name: String!
) {
  createUser(
    input: {
      name: $name
    }
  )
  {
    user {
      id
    }
  }
}
`;

export default function Page({loginUser, setLoginUser, loginAccount, setLoginAccount}){
  const [createUser, createUserResult] = useMutation(CREATE_USER);
  const [getUsers, { usersData }] = useLazyQuery(GET_USERS);
  const [getUser, userResult] = useLazyQuery(GET_USER);
  const [getToken, tokenResult] = useLazyQuery(GET_TOKEN);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userName, setUserName] = useState(null);
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
    if(userResult && userResult.data) {
      setLoginUser(userResult.data.user);
      history.push('/workspaces');
    }

    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, [userResult.data])

  useEffect(() => {
    if(createUserResult && createUserResult.data) {
      getTokenHandler(createUserResult.data.createUser.user.id);
    }

    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, [createUserResult.data])

  const getTokenHandler = (user_id) => {
    setSelectedUserId(user_id);

    getToken({
      variables: {
        user_id: parseInt(user_id)
      },
    });
  }

  const createUserHandler = () => {
    createUser({
      variables: {
        name: userName
      },
    });
  }

  return (
    <Main>
      <WorkingArea>
        <div>
          
          {usersData && usersData.users.map((user) => 
          <ChangeUserButton key={user.id} onClick={() => getTokenHandler(user.id)}>{user.name}</ChangeUserButton>
          )}
          {usersData && usersData.users.length > 0 && <hr/>}

          <input type="text" placeholder="new user" onChange={(e) => setUserName(e.target.value)}></input>
          <br/>
          <button onClick={createUserHandler}>유저 만들기</button>
        </div>
      </WorkingArea>
    </Main>);
}