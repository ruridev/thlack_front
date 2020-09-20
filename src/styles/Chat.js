import styled from 'styled-components';

const Chat = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas:
    'top'
    'middle'
    'bottom';
  grid-template-rows: 64px auto minmax(10px, 60px);
`;

const WorkspaceChannelName = styled.h2`
  grid-area: top;
  text-align: center;
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.6);
`;

const MessageList = styled.div`
  grid-area: middle;
  overflow: auto;
  position: relative;
`;

const Message = styled.div`
  white-space: pre-line;
  margin: 8px;
`;

const MessageInputArea = styled.div`
  grid-area: bottom;
`;

const MessageInput = styled.textarea`
  width: 99%;
`;

export {
  Chat,
  WorkspaceChannelName,
  MessageList, 
  Message, 
  MessageInputArea,
  MessageInput, 
};

