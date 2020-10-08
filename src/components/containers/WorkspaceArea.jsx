import React, {  useCallback } from 'react';
import {  useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import WorkspaceArea from '../presenters/workspace_area/WorkspaceArea'

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
    <WorkspaceArea 
      onClickSearchWorkspace={onClickSearchWorkspace}
      onClickNewWorkspace={onClickNewWorkspace}
      workspaces={workspaces}
      selectedWorkspaceId={workspaceId}
      onClickWorkspaceLink={onClickWorkspaceLink}
    />
  );
}

function mapStateToProps({ workspaces }) {
  return { workspaces };
}

export default connect(mapStateToProps, null)(Container);