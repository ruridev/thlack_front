import styled from 'styled-components';

const Chat = styled.div`
  height: calc(100vh - 12px); 
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
  color: ${({ theme }) => theme.workspaceChannelNameColor};
`;

const MessageList = styled.div`
  grid-area: middle;
  overflow: auto; 
`;

const Message = styled.div`
  white-space: pre-line;
  padding: 8px;

  :hover {
    background-color: ${({ theme }) => theme.hoverBackground};
  }

  blockquote {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    border-left: 4px solid ${({ theme }) => theme.mdBlockquoteLineColor};
    padding: 4px 8px; 
    
    p {
      margin-block-start: 0;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      color: ${({ theme }) => theme.mdBlockquoteColor};
    }
  }

  pre {
    background-color: ${({ theme }) => theme.mdCodeBackgroundColor};
    color: ${({ theme }) => theme.mdCodeColor};
    border: 1px solid ${({ theme }) => theme.mdCodeBorderColor};

    padding: 8px;
  }

  del {
    color: ${({ theme }) => theme.mdDelColor};
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

const ReplyTitle = styled.small`
  :hover::before {
    content:"Check the ";
  }
`;


export {
  Chat,
  WorkspaceChannelName,
  MessageList, 
  Message, 
  MessageInputArea,
  ReplyTitle,
};

