import styled from 'styled-components';

const LoginUserNavigator = styled.div`
  grid-area: user;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const LoginUserButton = styled.div`
  padding: 8px;
`;

const LoginUserImage = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const ChangeUserButton = styled.div`
  padding-bottom: 8px;
  text-align: center;
  font-size: 0.7rem;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const LogoutButton = styled.div`
  padding-bottom: 8px;
  text-align: center;
  font-size: 0.7rem;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export {
  LoginUserNavigator,
  LoginUserButton,
  LoginUserImage,
  ChangeUserButton,
  LogoutButton
};