import React from 'react';
import { FriendsNavigator, FriendButton } from '../styles/FriendArea';

export default function Page(props){
  return (
    <FriendsNavigator>
      {props.friendIds.map((friend_id) => (
        <FriendButton key={friend_id}>{props.userById(friend_id).name}</FriendButton>
      ))}
    </FriendsNavigator>
  );
}