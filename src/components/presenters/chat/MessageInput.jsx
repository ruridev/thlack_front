import React, { useCallback } from 'react';
import { SubmitButton, TextArea } from '../../../styles';
import { MessageInputArea } from '../../../styles/Chat';

const Presenter = ({ sendMessageHandler, inputRef }) => {
  const keyPress = useCallback((e) => {
    if (e.key === 'Enter' && e.shiftKey){
      sendMessageHandler();
    }
  }, [sendMessageHandler]);

  return (
    <MessageInputArea>
      <TextArea
        onKeyPress={keyPress}
        ref={inputRef}
        placeholder="Press shift + enter to send a message"
      />
      <SubmitButton onClick={sendMessageHandler}> {`${'>>'}`} </SubmitButton>
    </MessageInputArea>
  );
}

export default React.memo(Presenter);