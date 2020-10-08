import React, { useCallback, useMemo } from 'react';
import { ChannelNavigator, NewChannel, ChannelButton } from '../../styles/ChannelArea';
import ChannelItemList from '../presenters/channel_area/ChannelItemList';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const Container = ({ user, workspaces }) => {
  const history = useHistory();
  const { workspaceId, channelId } = useParams();

  const workspace = useMemo(() => {
    if(workspaceId && workspaces){
      const _workspace = workspaces.filter(workspace => workspace.id === workspaceId)[0];

      if(_workspace) {
        return _workspace;
      }
    }
  }, [workspaces, workspaceId]);

  const onClickJoinChannel = useCallback((channel_id) => {
    history.push(`/workspaces/${workspaceId}/${channel_id}`);
  }, [workspaceId]);

  const onClickNewChannel = useCallback(()=> {
    history.push(`/workspaces/${workspaceId}/new`);  
  }, [workspaceId]);

  const isOwner = useMemo(() => {
    if(user && workspace) {
      return workspace.owners.filter(owner => owner.id === user.id).length > 0;
    }
  }, [user, workspace]);

  const channels = useMemo(() => {
    if(workspace){
      return workspace.channels;
    }

    return [];
  }, [workspace])

  return (
    <ChannelNavigator>
      { isOwner &&
      <NewChannel onClick={onClickNewChannel} >+New Channel</NewChannel> }
      <ChannelItemList
        channels={channels}
        selectedChannelId={channelId}
        onClickJoinChannel={onClickJoinChannel} />
    </ChannelNavigator>
  );
}

function mapStateToProps({ cache: { current_user }, workspaces }) {
  return { user: current_user, workspaces };
}

export default connect(mapStateToProps, null)(Container);