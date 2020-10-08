import React from 'react';
import { SubmitButton, ListPopup, LinkDiv, TextArea } from '../../../styles';
import Popup from 'reactjs-popup';

const Presenter = ({ message, editInputRef, editMessageHandler }) => {
  return (
    <Popup trigger={<LinkDiv>Modify</LinkDiv>} nested modal onOpen={() => { editInputRef.current.focus(); }}>
      <ListPopup>
        <TextArea
          defaultValue={message.body}
          ref={editInputRef}
          cols={70}
          rows={8}
        />
        <SubmitButton onClick={() => { editMessageHandler(message.id) }}>Modify</SubmitButton>
      </ListPopup>
    </Popup>
  );
}

export default React.memo(Presenter);