import React from 'react';
import { Main, WorkingArea } from '../../../styles/ChangeUser';
import SelectUser from './SelectUser'
import NewUser from './NewUser'

const Component = ({ users, getLoginUserHandler, createUserHandler, inputRef}) => {
  return (
    <Main>
      <WorkingArea>
        <h2>Select user</h2>
        <SelectUser users={users} getLoginUserHandler={getLoginUserHandler} />
        <p>------- or -------</p>
        <NewUser createUserHandler={createUserHandler} inputRef={inputRef} />
      </WorkingArea>
    </Main>
  );
}

export default Component;