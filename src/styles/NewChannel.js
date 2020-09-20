import styled from 'styled-components';

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas: 
    ". . ."
    ". a ."
    ". . .";
  grid-template-columns: auto 153px auto;
  grid-template-rows: auto 100px auto;
`

const WorkingArea = styled.div`
  grid-area: a;
  text-align: center;
`

export { Main, WorkingArea };