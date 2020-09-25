import styled from 'styled-components';

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;

  @media (max-width: 768px) {
    grid-template-areas:
      'left center right';
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
  }

  @media (min-width: 768px) {
    grid-template-areas:
      'left center right';
    grid-template-columns: auto 1fr auto;
  }
`
const Left = styled.div`
  display: grid;
  grid-template-areas:
    'workspace'
    'channel';
  grid-template-rows: 1fr 1fr;
  
  @media (max-width: 768px) {
    display: none;
  }
`
const Center = styled.div`
  @media (max-width: 768px) {
    display: block;
  }
`
const Right = styled.div`
  display: grid;
  grid-template-areas:
    'user'
    'friend';
  grid-template-rows: 1fr 1fr;

  @media (max-width: 768px) {
    display: none;
  }
`

const MobileBar = styled.div`
  grid-area: mobile;
  position: fixed;
  right: 0px;
  z-index: 999;
  @media (max-width: 768px) {
    display: block;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

export { Main, Left, Center, Right, MobileBar };