import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { AlignCenterWrapper, AlignCenter } from '../styles';
import { addChannel } from '../reducer/workspace.action';
import { connect } from 'react-redux';
import NewChannel from '../components/containers/NewChannel';

const Page = ({ workspaces }) => {
  const { workspaceId } = useParams();
  
  const currentWorkspace = useMemo(() => {
    if(workspaces && workspaceId) {
      const workspace = workspaces.filter(workspace => workspace.id === workspaceId)[0];

      if(workspace){
        return workspace;
      }
    }
    return { id: 0, name: '?', channels: [], owners: [] };
  }, [workspaces, workspaceId]);

  return (
    <AlignCenterWrapper>
      <AlignCenter>
        <div>
          <h2>Create a channel in ”{currentWorkspace && `${currentWorkspace.name}”`}</h2>
          <NewChannel />
        </div>
      </AlignCenter>
    </AlignCenterWrapper>);
}

function mapStateToProps({ workspaces }) {
  return { workspaces };
}

function dispatchToProps(dispatch, ownProps) {
  return {
    addChannelHandler: (workspace_id, channel) => {
      dispatch(addChannel(workspace_id, channel));
    }
  }
}

export default connect(mapStateToProps, dispatchToProps)(Page);