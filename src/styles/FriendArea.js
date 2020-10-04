import styled from 'styled-components';

const FriendsNavigator = styled.div`
  grid-area: friend;
  border: 1px solid ${({ theme }) => theme.borderColor};

  overflow: hidden;
  :hover {
    overflow: auto;
  }
`;
const FriendButton = styled.div`
  padding: 8px;
`;

export {
  FriendsNavigator,
  FriendButton,
};

