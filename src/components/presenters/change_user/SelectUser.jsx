import React from 'react';
import { LinkDiv } from '../../../styles';

const Component = ({ users, getLoginUserHandler }) => {
  return users.map((user) => 
    <LinkDiv key={user.id}
             onClick={() => getLoginUserHandler(user.id)}>{user.name}</LinkDiv>
  );
}

export default Component;