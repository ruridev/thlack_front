import styled from 'styled-components';

const Main = styled.div`
  height: calc(100vh - 12px); 
  width: calc(100vw - 8px);
  top: 4px;
  left: 4px;
  position: fixed;
  display: grid;
  grid-gap: 4px;
  grid-template-areas:
    'left center right';
  grid-template-columns: auto 1fr auto;
`
const Left = styled.div`
  display: grid;
  grid-gap: 4px;
  grid-template-areas:
    'workspace'
    'channel';
  grid-template-rows: 1fr 1fr;
`
const Center = styled.div`
  border: 1px solid ${({ theme }) => theme.borderColor};
`
const Right = styled.div`
  display: grid;
  grid-gap: 4px;
  grid-template-areas:
    'user'
    'friend';
  grid-template-rows: 1fr 1fr;
`

export { Main, Left, Center, Right };