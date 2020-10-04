import React from 'react';
import { LoginUserNavigator, LoginUserButton, ChangeUserButton, LogoutButton } from '../styles/UserArea';
import { connect } from 'react-redux';
import { setTheme } from '../action/cache';

const Page = ({ theme, current_user, onClickChangeUser, onClickSignOut, setThemeHandler }) => {
  const themeToggler = () => {
    setThemeHandler(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <LoginUserNavigator>
      <LoginUserButton>
        {/*<LoginUserImage>
          <img src={cache && cache['current_user'] && cache['current_user'].photoURL} alt="img" width='30'></img>
        </LoginUserImage>*/}
        { current_user ? 
          <div>
            <center>{current_user.name}</center>
            <ChangeUserButton onClick={onClickChangeUser}>
              Change user
            </ChangeUserButton>
          </div> : 
          <ChangeUserButton onClick={onClickChangeUser}>
            No user
        </ChangeUserButton> }
        <button onClick={themeToggler}>Switch Theme</button>
      </LoginUserButton>
      <LogoutButton onClick={onClickSignOut}>Sign out</LogoutButton>
    </LoginUserNavigator>
  );
}

function mapStateToProps({ cache }) {
  const theme = cache.theme || localStorage.getItem('theme') || 'dark';
  return { current_user: cache.current_user, theme };
}

function dispatchToProps(dispatch, ownProps) {
  return {
    onClickChangeUser: () => {
      ownProps.history.push('/change_user');
    },
    onClickSignOut: () => {
      // todo
    },
    setThemeHandler: (theme) => {
      localStorage.setItem('theme', theme);
      dispatch(setTheme(theme));
    }
  }
}

export default connect(mapStateToProps, dispatchToProps)(Page);