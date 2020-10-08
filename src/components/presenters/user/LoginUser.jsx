import React from 'react';
import { LoginUserNavigator, LoginUserButton, ChangeUserButton, LogoutButton } from '../../../styles/UserArea';

const Presenter = ({ user_name, onClickSignOut, themeToggler, onClickChangeUser }) => {
  return (
    <LoginUserNavigator>
      <LoginUserButton>
        <div>
          <center>{user_name}</center>
          <ChangeUserButton onClick={onClickChangeUser}>
            Change user
          </ChangeUserButton>
        </div>
      <button onClick={themeToggler}>Switch Theme</button>
      </LoginUserButton>
      <LogoutButton onClick={onClickSignOut}>Sign out</LogoutButton>
    </LoginUserNavigator>
  );
}

export default React.memo(Presenter);