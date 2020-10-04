const FETCH_USERS= 'FETCH_USERS';

const fetchUsersAction = users => {
  return {
    type: FETCH_USERS, 
    users,
  }
}
const fetchUsers = users => {
  return dispatch => {
    dispatch(fetchUsersAction(users));
  }
}


export {
  FETCH_USERS,
  fetchUsers,
};
