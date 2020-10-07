import { FETCH_USERS } from './user.action';

const user = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.users;
    default:
      return state;
  }
};

export default user;
