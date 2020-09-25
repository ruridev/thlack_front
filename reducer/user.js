import actionCreator from '../action/index';
import cookie from 'cookie-machine';
const { SIGN_IN, SIGN_UP, SIGN_OUT, LOGIN_CHECK } = actionCreator.user;

const user = (state = null, action) => {
  switch (action.type) {
    case SIGN_IN:
      cookie.set('token', action.login_user.token);
      return action.login_user;
    case SIGN_UP:
      cookie.set('token', action.login_user.token);
      return action.login_user;
    case SIGN_OUT:
      cookie.remove('token');
      return {};
    case LOGIN_CHECK:
      return action.login_user;
    default:
      return state;
  }
};

export default user;
