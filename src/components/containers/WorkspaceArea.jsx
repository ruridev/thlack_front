import React, {  useCallback } from 'react';
import {  useHistory, useParams } from 'react-router-dom';
import { WorkspaceNavigator, SearchWorkspace, NewWorkspace } from '../../styles/WorkspaceArea';
import WorkspaceItemList from '../presenters/workspace_area/WorkspaceItemList'
import { connect } from 'react-redux';
const Container = ({ workspaces }) => {

  const history = useHistory();
  const { workspaceId } = useParams();

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
      <WorkspaceItemList workspaces={workspaces} selectedWorkspaceId={workspaceId} onClickWorkspaceLink={onClickWorkspaceLink} />
    </WorkspaceNavigator>
  );
}

function mapStateToProps({ workspaces }) {
  return { workspaces };
}

export default connect(mapStateToProps, null)(Container);