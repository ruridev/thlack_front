import styled from 'styled-components';

const Home = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;

  @media (max-width: 768px) {
    grid-template-areas: 
      ". . . ."
      ". signin signin ."
      ". signin signin ."
      ". . . .";
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 768px) {
    grid-template-areas: 
      ". . ."
      ". signin ."
      ". . .";
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 1fr 1fr 1fr;
  }
  
`
const SignIn = styled.div`
  grid-area: signin;
  padding: 4px;
  border: 1px solid #000000;
  text-align: center;
`

const SocialServiceButton = styled.button`
  
`

export { Home, SignIn, SocialServiceButton};