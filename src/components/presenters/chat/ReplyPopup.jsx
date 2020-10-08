import React from 'react';
import { ListPopup, LinkButton } from '../../../styles';
import { ReplyTitle } from '../../../styles/Chat';
import Popup from 'reactjs-popup';
import MessageItemReadonly from './MessageItemReadonly';

const Presenter = ({
  message
}) => {
  return (
    <Popup trigger={<LinkButton> ↪︎<ReplyTitle> {message.reply_messages.length} Comment(s)</ReplyTitle></LinkButton>} keepTooltipInside=".message-list">
      <ListPopup>
        {message.reply_messages.map(reply_message => <MessageItemReadonly key={reply_message.id} message={reply_message} />)}
      </ListPopup>
    </Popup>
  );
}
export default React.memo(Presenter);