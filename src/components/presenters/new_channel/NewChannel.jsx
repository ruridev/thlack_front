import React from 'react';
import { InputTextBox, SubmitButton } from '../../../styles/';


const Presenter = ({ createChannelHandler, inputRef }) => {
  return (<>
    <InputTextBox type="text" placeholder="general" ref={inputRef}></InputTextBox>
    <SubmitButton onClick={createChannelHandler}>Create</SubmitButton>
  </>);
}

export default Presenter;