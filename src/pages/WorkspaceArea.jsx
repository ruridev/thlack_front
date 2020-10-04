import React from 'react';
import { useParams } from 'react-router-dom';
import { WorkspaceNavigator, SearchWorkspace, NewWorkspace, WorkspaceButton } from '../styles/WorkspaceArea';
import { setCurrentWorkspace } from '../action/cache';
import { connect } from 'react-redux';
import { setMode } from '../action/cache';

const Page = ({
  workspaces,
  onClickSearchWorkspace,
  onClickNewWorkspace,
  onClickWorkspaceLink,
}) => {
  const { workspaceId } = useParams();

  return (
    <WorkspaceNavigator>
      <SearchWorkspace onClick={onClickSearchWorkspace}>Search</SearchWorkspace>
      <NewWorkspace onClick={onClickNewWorkspace }>+New Workspace</NewWorkspace>
      <div>
      {workspaces && workspaces.filter((workspace)=> workspace.id === workspaceId).map((workspace) => (
          <WorkspaceButton key={workspace.id}>
            <b><div onClick={() => onClickWorkspaceLink(workspace)}>{workspace.name}</div></b>
          </WorkspaceButton>
        ))}
      {workspaces && workspaces.filter((workspace)=> workspace.id !== workspaceId).map((workspace) => (
          <WorkspaceButton key={workspace.id}>
            <div onClick={() => onClickWorkspaceLink(workspace)}>{workspace.name}</div>
          </WorkspaceButton>
        ))}
      </div>
    </WorkspaceNavigator>
  );
}

function mapStateToProps({ workspaces }) {
  return { workspaces };
}

function dispatchToProps(dispatch, ownProps) {
  return {
    onClickSearchWorkspace: () => {
      ownProps.history.push('/workspaces');
    },
    onClickNewWorkspace: () => {
      ownProps.history.push('/workspaces/new');
    },
    onClickWorkspaceLink: (workspace) => {
      dispatch(setCurrentWorkspace(workspace));
      dispatch(setMode('welcome'));
      ownProps.history.push(`/workspaces/${workspace.id}`);
    },
  }
}

export default connect(mapStateToProps, dispatchToProps)(Page);