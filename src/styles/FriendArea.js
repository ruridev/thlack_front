import styled from 'styled-components';

const FriendsNavigator = styled.div`
  grid-area: friend;
  overflow: hidden;
  :hover {
    overflow: auto;
  }
`;
const FriendButton = styled.div`
  background-color: black;
  color: white;
  padding: 8px;
`;

export {
  FriendsNavigator,
  FriendButton,
};

