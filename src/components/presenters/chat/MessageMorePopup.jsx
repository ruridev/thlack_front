import React from 'react';
import { SmallLinkButton, ListPopup, LinkDiv, LinkButton } from '../../../styles';
import MessageEditPopup from './MessageEditPopup';
import Popup from 'reactjs-popup';

const Presenter = ({
  isOwner,
  message,
  deleteMessageHandler,
  onClickReplyMessage,
  editInputRef,
  editMessageHandler
}) => {
  return (
    <Popup trigger={<SmallLinkButton>More</SmallLinkButton>} position="right center" nested>
      <ListPopup>
        {isOwner && <MessageEditPopup message={message} editInputRef={editInputRef} editMessageHandler={editMessageHandler} />}
        {isOwner && <LinkDiv onClick={() => deleteMessageHandler(message.id)}>Delete</LinkDiv>}
        <LinkDiv onClick={() => onClickReplyMessage(message.id)}>Reply</LinkDiv>
      </ListPopup>
    </Popup>
  );
}
 
export default React.memo(Presenter);