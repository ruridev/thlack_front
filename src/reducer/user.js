import actionCreator from '../action/index';
const { FETCH_USERS } = actionCreator.user;

const user = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.users;
    default:
      return state;
  }
};

export default user;
