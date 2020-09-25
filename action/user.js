import axios from '../axios';
import * as Constants from '../constants';

const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';
const SIGN_OUT = 'SIGN_OUT';
const LOGIN_CHECK = 'LOGIN_CHECK';

const signInAction = login_user => {
  return { type: SIGN_IN, login_user };
};

const signIn = (email, password) => {
  return dispatch => {
    axios
      .post(Constants.API_SIGNIN, {
        email: email,
        password: password,
      })
      .then(res => dispatch(signInAction(res.data)));
  };
};

const signUpAction = login_user => {
  return { type: SIGN_UP, login_user };
};

const signUp = (name, email, password, password_confirmation) => {
  return dispatch => {
    axios
      .post(Constants.API_SIGNUP, {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      })
      .then(res => dispatch(signUpAction(res.data)));
  };
};

const signOut = () => {
  return { type: SIGN_OUT };
};

const loginCheckAction = login_user => {
  return { type: LOGIN_CHECK, login_user };
};

const loginCheck = token => {
  return dispatch => {
    axios.get(`${Constants.API_USERS}/me`).then(res => dispatch(loginCheckAction(res.data)));
  };
};

export { SIGN_IN, signIn, SIGN_UP, signUp, SIGN_OUT, signOut, LOGIN_CHECK, loginCheck };
