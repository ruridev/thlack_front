import React from 'react';
import { InputTextBox, SubmitButton } from '../../../styles';

const Presenter = ({ createWorkspaceHandler, inputRef }) => {
  return (<>
    <InputTextBox type="text" placeholder="Team Thlack" ref={inputRef}></InputTextBox>
    <SubmitButton onClick={createWorkspaceHandler}>Create</SubmitButton>
  </>);
}

export default React.memo(Presenter);