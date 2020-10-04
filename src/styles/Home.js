import styled from 'styled-components';

const Home = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;

  grid-template-areas: 
    ". . ."
    ". signin ."
    ". . .";
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr 1fr 1fr;
  
`
const SignIn = styled.div`
  grid-area: signin;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  text-align: center;
`

const SocialServiceButton = styled.button`
  
`

export { Home, SignIn, SocialServiceButton};