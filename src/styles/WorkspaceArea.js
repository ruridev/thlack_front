import styled from 'styled-components';

const WorkspaceNavigator = styled.div`
  grid-area: workspace;
  max-height: calc(50vh - 8px); 
  border: 1px solid ${({ theme }) => theme.borderColor};
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

const SearchWorkspace = styled.div`
  padding: 8px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

export { WorkspaceNavigator, NewWorkspace, SearchWorkspace };