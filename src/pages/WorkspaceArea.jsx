import React from 'react';
import { WorkspaceNavigator, SearchWorkspace, NewWorkspace, WorkspaceButton } from '../styles/WorkspaceArea';

export default function Page(props){
  return (
    <WorkspaceNavigator>
      <SearchWorkspace onClick={props.onClickSearchWorkspace}>Search</SearchWorkspace>
      <NewWorkspace onClick={props.onClickNewWorkspace}>+New</NewWorkspace>
      <div>
      {props.myWorkspacesData?.myWorkspaces.filter((workspace)=> workspace.id === props.workspaceId).map((workspace) => (
          <WorkspaceButton key={workspace.id}>
            <b>{workspace.name}</b>
          </WorkspaceButton>
        ))}
      {props.myWorkspacesData?.myWorkspaces.filter((workspace)=> workspace.id !== props.workspaceId).map((workspace) => (
          <WorkspaceButton key={workspace.id}>
            <div onClick={() => props.onClickWorkspaceLink(workspace.id)}>{workspace.name}</div>
          </WorkspaceButton>
        ))}
      </div>
    </WorkspaceNavigator>
  );
}