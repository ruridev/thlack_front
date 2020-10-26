import styled from 'styled-components';

const ChannelNavigator = styled.div`
  grid-area: channel;
  max-height: calc(50vh - 8px); 
  border: 1px solid ${({ theme }) => theme.borderColor};
  overflow: hidden;
  :hover {
    overflow: auto;
  }
`;

const NewChannel = styled.div`
  padding: 8px;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export { ChannelNavigator, NewChannel };