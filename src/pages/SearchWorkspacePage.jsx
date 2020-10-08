import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { SEARCH_WORKSPACES, JOIN_WORKSPACE } from '../queries'
import { InputTextBox, SubmitButton, LinkButton } from '../styles';
import { Search, Title, WorkingArea } from '../styles/SearchWorkspace';
import { setCurrentWorkspace } from '../reducer/cache.action';
import { connect } from 'react-redux';
import SearchWorkspace from '../components/containers/SearchWorkspace';

const Page = ({ onClickWorkspaceLink }) => {
  const history = useHistory();
  const inputRef = useRef();

  const [searchWorkspaces, { data: searchWorkspacesData }] = useLazyQuery(
    SEARCH_WORKSPACES,
    {
      fetchPolicy: `network-only`,
    }
  );
  const [joinWorkspace] = useMutation(
    JOIN_WORKSPACE,
    {
      onCompleted({ joinWorkspace: { workspace } }) {
        onClickWorkspaceLink(workspace)
      }
    }
  );

  const searchWorkspacesHandler = useCallback(() => {
    if(inputRef.current.value.trim().length === 0){
      inputRef.current.focus();
      return false;
    }
    searchWorkspaces({ variables: { name: inputRef.current.value } })  
  }, [inputRef]);

  const joinWorkspaceHandler = useCallback((workspace_id) => {
    joinWorkspace({variables: { workspace_id: parseInt(workspace_id) } });
  }, []);

  return (
    <Search>
      <Title>
        Find Workspace
      </Title> 
      <WorkingArea>
        <SearchWorkspace />
      </WorkingArea>
    </Search>
  );
}

function dispatchToProps(dispatch, ownProps) {
  return {
    onClickWorkspaceLink: (workspace) => {
      dispatch(setCurrentWorkspace(workspace));
      ownProps.history.push(`/workspaces/${workspace.id}`);
    },
  }
}

export default connect(null, dispatchToProps)(Page);