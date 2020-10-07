const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';

const signInAction = login_account => {
  return {
    type: SIGN_IN, 
    login_account,
  }
}
const signIn = login_account => {
  return dispatch => {
    dispatch(signInAction(login_account));
  }
}

const signOutAction = () => {
  return {
    type: SIGN_OUT, 
  }
}

const signOut = () => {
  return dispatch => {
    dispatch(signOutAction());
  }
}

export {
  SIGN_IN,
  signIn,
  SIGN_OUT,
  signOut,
};
