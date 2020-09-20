import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Main, WorkingArea, ChangeUserButton } from '../styles/ChangeUser';
import { GET_USERS, GET_USER_TOKEN, CREATE_USER } from '../queries';

export default function Page(props){
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted({createUser: { user: { id } }}){
      getUserTokenHandler(id);
    }
  });
  const [getUsers, { data: usersData }] = useLazyQuery(GET_USERS, { fetchPolicy: `network-only` });

  const [getUserToken] = useLazyQuery(GET_USER_TOKEN, {
    fetchPolicy: `network-only`,
    onCompleted({ userToken }){
      props.setLoginUserHandler(userToken);
      history.push('/workspaces');
    }
  });

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let flag = true;

    if(flag){
      getUsers();
    }

    return function () {
      flag = false;
    }
  }, [])

  const getUserTokenHandler = (user_id) => {
    setSelectedUserId(user_id);
    getUserToken({
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
        <h2>Select user</h2>
        <div>
          {usersData && usersData.users.map((user) => 
          <ChangeUserButton key={user.id} onClick={() => getUserTokenHandler(user.id)}>{user.name}</ChangeUserButton>
          )}
          {usersData && usersData.users.length > 0 && <hr/>}

          <input type="text" placeholder="new user" onChange={(e) => setUserName(e.target.value)}></input>
          <br/>
          <button onClick={createUserHandler}>Create new user</button>
        </div>
      </WorkingArea>
    </Main>);
}