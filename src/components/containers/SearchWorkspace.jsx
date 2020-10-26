import React, { useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useJoinWorkspace } from '../../graphql/mutations';
import { useSearchWorkspaces } from '../../graphql/queries';
import SearchWorkspace from '../presenters/search_workspace/SearchWorkspace';

const Page = ({ onClickWorkspaceLink }) => {
  const history = useHistory();
  const inputRef = useRef();

  const [workspacesData, setWorkspacesData] = useState();
  
  const searchWorkspaces = useSearchWorkspaces((data) => {
    setWorkspacesData(data);
  }, { storeAction: true });

  const joinWorkspace = useJoinWorkspace(({ joinWorkspace: { workspace } }) => {
    history.push(`/workspaces/${workspace.id}`);
  }, { storeAction: true });

  const searchWorkspacesHandler = useCallback(() => {
    if(inputRef.current.value.trim().length === 0){
      inputRef.current.focus();
      return false;
    }
    searchWorkspaces({
      name: inputRef.current.value,
    });
  }, [searchWorkspaces, inputRef]);

  const joinWorkspaceHandler = useCallback((workspace_id) => {
    joinWorkspace({ workspace_id: parseInt(workspace_id) });
  }, [joinWorkspace]);

  return (
    <SearchWorkspace 
      inputRef={inputRef}
      searchWorkspacesHandler={searchWorkspacesHandler}
      searchWorkspacesData={workspacesData}
      joinWorkspaceHandler={joinWorkspaceHandler} />
  );
}

export default React.memo(Page);