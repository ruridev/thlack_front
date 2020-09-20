import styled from 'styled-components';

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas:
    'left center right';
  grid-template-columns: auto 1fr auto;
`
const Left = styled.div`
  display: grid;
  grid-template-areas:
    'workspace'
    'channel';
  grid-template-rows: 1fr 1fr;
`
const Center = styled.div`
`
const Right = styled.div`
  display: grid;
  grid-template-areas:
    'user'
    'friend';
  grid-template-rows: 1fr 1fr;
`

export { Main, Left, Center, Right };