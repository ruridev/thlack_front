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
`;

const Message = styled.div`
  white-space: pre-line;
  padding: 8px;

  :hover {
    background-color: #dddddd;
  }

  blockquote {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    border-left: 4px solid #999999;
    padding: 4px 8px; 
    
    p {
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      color: #555555;
    }
  }

  pre {
    background-color: black;
    color: #99ff00;
    padding: 8px;
  }

  del {
    color: #aaaaaa;
  }

  ul {
    padding-inline-start: 24px;
  }
`;

const MessageInputArea = styled.div`
  grid-area: bottom;
  display: grid;
  grid-template-columns: auto 100px;

`;

const MessageInput = styled.textarea`
  width: 100%;
  margin: 4px;
  border: 1px solid #cccccc;
  
  @media (max-width: 768px) {
    font-size: 16px !important;
  }
`;

const ReplyTitle = styled.small`
  :hover::after {
    content:"을 확인하기";
  }
`;

export {
  Chat,
  WorkspaceChannelName,
  MessageList, 
  Message, 
  MessageInputArea,
  MessageInput, 
  ReplyTitle,
};

