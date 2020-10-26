import React from 'react';
import { LoginUserNavigator, LoginUserButton, LogoutButton } from '../../../styles/UserArea';
import { LinkButton } from '../../../styles';
const Presenter = ({
  user,
  onClickSignOut,
  themeToggler,
  onClickChangeUser,
  onClickUserName,
}) => {
  return (
    <LoginUserNavigator>
      <LoginUserButton>
        <div>
          <div>
            <LinkButton onClick={() => onClickUserName(user?.id)} >
              {user?.name}
            </LinkButton>
          </div>
          <div>
          <LinkButton onClick={onClickChangeUser}>
            Change user
          </LinkButton>
          </div>
        </div>
      <button onClick={themeToggler}>Switch Theme</button>
      </LoginUserButton>
      <LogoutButton onClick={onClickSignOut}>Sign out</LogoutButton>
    </LoginUserNavigator>
  );
}

export default React.memo(Presenter);