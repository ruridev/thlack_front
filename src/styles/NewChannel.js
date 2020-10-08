import styled from 'styled-components';

const Main = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas: 
    ". . . ."
    ". a a ."
    ". . . .";
  grid-template-columns: auto 200px auto;
  grid-template-rows: auto 200px auto;
`

const WorkingArea = styled.div`
  grid-area: a;
  text-align: center;
`

export { Main, WorkingArea};