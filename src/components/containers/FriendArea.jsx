import React from 'react';
import { FriendsNavigator } from '../../styles/FriendArea';
import { ClickableListItem } from '../../styles';

export default function Page(){
  const friends = [
    { id: 0, name: '도우너', active: '1' },
    { id: 1, name: '둘리', active: '1'},
    { id: 2, name: '마이콜' },
    { id: 3, name: '길동' },
  ];

  return (
    <FriendsNavigator>
      {friends.map((friend) => (
        friend.active === '1' ?
        <ClickableListItem key={friend.id}><b>{friend.name}</b> 👤</ClickableListItem>
      : <ClickableListItem key={friend.id}>{friend.name} 💀</ClickableListItem>
      ))}
    </FriendsNavigator>
  );
}