import React, { useEffect, useCallback } from 'react';
import { WorkspaceNavigator, SearchWorkspace, NewWorkspace, WorkspaceButton } from '../styles/WorkspaceArea';
import { setCurrentWorkspace } from '../action/cache';


const Page = ({
  workspaces,
  currentWorkspaceId,
  history,
}) => {
  console.log("😇 WorkspaceArea.jsx rendering");
  useEffect(() => {
    console.log("😇 WorkspaceArea.jsx useEffect");
  }, []);

  const onClickSearchWorkspace = useCallback(() => {
    history.push('/workspaces');
  }, []);
  
  const onClickNewWorkspace = useCallback(() => {
    history.push('/workspaces/new');
  }, []);

  const onClickWorkspaceLink = useCallback((workspace_id) => {
    history.push(`/workspaces/${workspace_id}`);
  }, []);

  return (
    <WorkspaceNavigator>
      <SearchWorkspace onClick={onClickSearchWorkspace}>Search</SearchWorkspace>
      <NewWorkspace onClick={onClickNewWorkspace }>+New Workspace</NewWorkspace>
      <div>
        {workspaces && workspaces.map((workspace) => (
          <WorkspaceButton key={workspace.id}>
            {workspace.id == currentWorkspaceId ? <b><div onClick={() => onClickWorkspaceLink(workspace.id)}>{workspace.name}</div></b>
            : <div onClick={() => onClickWorkspaceLink(workspace.id)}>{workspace.name}</div>}
          </WorkspaceButton>
        ))}
      </div>
    </WorkspaceNavigator>
  );
}

export default Page;