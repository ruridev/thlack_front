import React, { useCallback } from 'react';
import { LoginUserNavigator, LoginUserButton, ChangeUserButton, LogoutButton } from '../styles/UserArea';
import { connect } from 'react-redux';
import { setTheme } from '../action/cache';

const Page = ({ theme, current_user, history, onClickSignOut, setThemeHandler }) => {
  const themeToggler = useCallback(() => {
    setThemeHandler(theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  const onClickChangeUser = useCallback(() => {
    history.push('/change_user');
  }, []);

  return (
    <LoginUserNavigator>
      <LoginUserButton>
        {/*<LoginUserImage>
          <img src={cache && cache['current_user'] && cache['current_user'].photoURL} alt="img" width='30'></img>
        </LoginUserImage>*/}
          <div>
            <center>{current_user?.name}</center>
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

function mapStateToProps({ cache: { current_user, theme } }) {
  const currentTheme = theme || localStorage.getItem('theme') || 'dark';
  return { current_user, theme: currentTheme };
}

function dispatchToProps(dispatch) {
  return {
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