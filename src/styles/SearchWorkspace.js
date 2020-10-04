import styled from 'styled-components';

const Search = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas:
    'top2'
    'middle2';
  grid-template-rows: 64px auto;
`;

const Title = styled.h2`
  grid-area: top2;
  text-align: center;
  margin: 0 auto;
`;

const WorkingArea = styled.div`
  grid-area: middle2;
  overflow: auto;
  position: relative;
  margin: 0 auto;
`;


export { Search, Title, WorkingArea };