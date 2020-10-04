import actionCreator from '../action/index';
const { SIGN_IN, SIGN_OUT } = actionCreator.account;

const account = (state = [], action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.login_account;
    case SIGN_OUT:
      return null;
    default:
      return state;
  }
};

export default account;
