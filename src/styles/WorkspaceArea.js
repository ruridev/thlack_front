import styled from 'styled-components';

const WorkspaceNavigator = styled.div`
  grid-area: workspace;
  background-color: black;
  color: white;
  overflow: hidden;

  :hover {
    overflow: auto;
  }
`;

const NewWorkspace = styled.div`
  padding: 8px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const WorkspaceButton = styled.div`
  padding: 8px;
  cursor: pointer;
  text-decoration: none;
  color: white;

  :hover {
    text-decoration: underline;
  }
`;

const SearchWorkspace = styled.div`
  padding: 8px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

export { WorkspaceNavigator, NewWorkspace, WorkspaceButton, SearchWorkspace };