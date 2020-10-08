import React from 'react';
import { InputTextBox, SubmitButton } from '../../../styles';

const Component = ({ createUserHandler, inputRef }) => {
  return (
    <div>
      <InputTextBox type="text" placeholder="New user" ref={inputRef}></InputTextBox>
      <SubmitButton onClick={createUserHandler}>Create</SubmitButton>
    </div>
  );
}

export default Component;