import React, { useRef, useCallback, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { isReference, useMutation } from '@apollo/client';
import { CREATE_CHANNEL } from '../../queries'
import { addChannel } from '../../reducer/workspace.action';
import NewChannel from '../presenters/new_channel/NewChannel';

const Container = ({ workspaces, addChannelHandler }) => {
  const inputRef = useRef();
  const { workspaceId } = useParams();
  const history = useHistory();

  const [createChannel] = useMutation(CREATE_CHANNEL, {
    onCompleted({createChannel: { channel }}){
      addChannelHandler(workspaceId, channel)
      history.push(`/workspaces/${workspaceId}/${channel.id}`);
    }
  });

  const createChannelHandler = useCallback(() => {
    if(inputRef && inputRef.current){
      if(inputRef.current.value.trim().length === 0){
        inputRef.current.focus();
        return false;
      }

      createChannel({
        variables: {
          name: inputRef.current.value,
          workspace_id: parseInt(workspaceId)
        },
      });
    }
  }, [inputRef, createChannel]);

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
    <NewChannel 
      currentWorkspaceName={currentWorkspace?.name}
      createChannelHandler={createChannelHandler}
      inputRef={inputRef} />
  );
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

export default connect(mapStateToProps, dispatchToProps)(Container);