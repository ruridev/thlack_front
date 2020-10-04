import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';

const FriendsNavigator = styled.div`
  grid-area: friend_area;
  overflow: hidden;
  :hover {
    overflow: auto;
  }
`;
const FriendButton = styled.div`
  padding: 8px;
`;


export default function Page({loginUser, setLoginUser, loginAccount, setLoginAccount}){
  const users = [
    { id: 1, name: '맹순이' },
    { id: 2, name: '철수' },
    { id: 3, name: '봉구' },
    { id: 4, name: '꽁순이' },
    { id: 5, name: '길동이' },
    { id: 6, name: '둘리' },
  ]
  const sent_requests = [
    { sender_user_id: 1, message: "좀 수락해주시죠" },
    { sender_user_id: 2, message: "받아줘" },
    { sender_user_id: 3, message: "친구하자" },
  ]
  const received_requests = [
    { sender_user_id: 4, message: "좀 수락해주시죠" },
    { sender_user_id: 5 },
    { sender_user_id: 6, message: "친구하자" },
  ];

  const userById = (id) => {
    return users.filter((user) => user.id == id)[0];
  }
  return (
    <Main>
      <WorkingSpace>
        받은 친구 요청
        { received_requests && received_requests.map((request) => 
          <ReceivedRequest>
            {userById(request.sender_user_id).name} <br />
            <p>”{request.message ? request.message : '냉무'}”</p>
            <small><a>수락하기</a>/<a>모른척하기</a></small>
          </ReceivedRequest>
        )}

        <hr/>

        보낸 친구 요청
        { sent_requests && sent_requests.map((request) => 
          <div>{userById(request.sender_user_id).name} <small><a>되돌리기</a></small></div>
        )}
        
      </WorkingSpace>

    </Main>
    <FriendsNavigator>
    {friend_ids.map((friend_id) => (
      <FriendButton key={friend_id}>{userById(friend_id).name}</FriendButton>
    ))}
  </FriendsNavigator>
  
    
    );
}