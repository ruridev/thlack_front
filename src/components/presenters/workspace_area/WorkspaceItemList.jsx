import React from 'react';
import { WorkspaceButton } from '../../../styles/WorkspaceArea';

const Container = ({ workspaces, selectedWorkspaceId, onClickWorkspaceLink }) => {
  return (workspaces.map(workspace => (
    <WorkspaceButton key={workspace.id}>
      <div onClick={() => onClickWorkspaceLink(workspace.id)}>
        {workspace.id == selectedWorkspaceId ? 
          <b>{workspace.name}</b>
        : `${workspace.name}`}
      </div>
    </WorkspaceButton>
  )));
}

export default Container;