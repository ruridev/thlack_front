import styled from 'styled-components';

const Search = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas:
    'top'
    'middle';
  grid-template-rows: 64px auto;
`;

const Title = styled.h2`
  grid-area: top;
  text-align: center;
  margin: 0 auto;
  color: rgba(0, 0, 0, 0.6);
`;

const WorkingArea = styled.div`
  grid-area: middle;
  overflow: auto;
  position: relative;
  margin: 0 auto;
`;

const JoinButton = styled.a`
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export { Search, Title, WorkingArea, JoinButton };