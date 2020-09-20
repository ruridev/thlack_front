import styled from 'styled-components';

const ChannelNavigator = styled.div`
  grid-area: channel;
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
const ChannelButton = styled.div`
  padding: 8px;

  > a {
    cursor: pointer;
    text-decoration: none;
    color: black;
  }

  > a:hover {
    text-decoration: underline;
  }
`;

export { ChannelNavigator, NewChannel, ChannelButton };