import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setTheme } from '../../reducer/cache.action';
import LoginUser from '../presenters/user/LoginUser';

const Container = ({ theme, current_user, onClickSignOut, setThemeHandler }) => {
  const history = useHistory();

  const themeToggler = useCallback(() => {
    setThemeHandler(theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  const onClickChangeUser = useCallback(() => {
    history.push('/change_user');
  }, []);

  return (
    <LoginUser 
      user_name={current_user?.name}
      onClickSignOut={onClickSignOut}
      themeToggler={themeToggler}
      onClickChangeUser={onClickChangeUser} />
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

export default connect(mapStateToProps, dispatchToProps)(Container);