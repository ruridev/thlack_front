import React from 'react';
import WorkspaceItemList from './WorkspaceItemList'
import { WorkspaceNavigator, SearchWorkspace, NewWorkspace } from '../../../styles/WorkspaceArea';

const Presenter = ({ 
  workspaces,
  selectedWorkspaceId,
  onClickWorkspaceLink,
  onClickSearchWorkspace,
  onClickNewWorkspace,
}) => {
  return (
    <WorkspaceNavigator>
      <SearchWorkspace onClick={onClickSearchWorkspace}>Search</SearchWorkspace>
      <NewWorkspace onClick={onClickNewWorkspace }>+New Workspace</NewWorkspace>
      <WorkspaceItemList workspaces={workspaces} selectedWorkspaceId={selectedWorkspaceId} onClickWorkspaceLink={onClickWorkspaceLink} />
    </WorkspaceNavigator>
  );
}

export default React.memo(Presenter);