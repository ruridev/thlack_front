import React from 'react';
import { LoginUserNavigator, LoginUserButton, LoginUserImage, ChangeUserButton, LogoutButton } from '../styles/UserArea';

export default function Page(props){
  return (
    <LoginUserNavigator>
      <LoginUserButton>
        <LoginUserImage>
          <img src={props.loginAccount && props.loginAccount.photoURL} alt="img" width='30'></img>
        </LoginUserImage>
        { props.loginAccount && props.loginUser ? 
          <div>
            <center>{props.loginUser.name}</center>
            <ChangeUserButton onClick={props.onClickChangeUser}>
              Change user
            </ChangeUserButton>
          </div> : 
          <ChangeUserButton onClick={props.onClickChangeUser}>
            유저를 만들어주세요
          </ChangeUserButton>
      } 
      </LoginUserButton>
      <LogoutButton onClick={props.onClickSignOut}>Sign out</LogoutButton>
    </LoginUserNavigator>
  );
}