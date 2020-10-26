import React from 'react';
import { ClickableListItem } from '../../../styles';

const Container = ({ workspaces, selectedWorkspaceId, onClickWorkspaceLink }) => {
  return (workspaces.map(workspace => (
    <ClickableListItem key={workspace.id}>
      <div onClick={() => onClickWorkspaceLink(workspace.id)}>
        {workspace.id === selectedWorkspaceId ? 
          <b>{workspace.name}</b>
        : `${workspace.name}`}
      </div>
    </ClickableListItem>
  )));
}

export default Container;