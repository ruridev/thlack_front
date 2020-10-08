import React, { useRef, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_CHANNEL, JOIN_CHANNEL } from '../../queries'
import { addChannel } from '../../reducer/workspace.action';
import { connect } from 'react-redux';
import NewChannel from '../presenters/new_channel/NewChannel';

const Container = ({ addChannelHandler }) => {
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
  }, [inputRef, workspaceId]);


  return (
    <NewChannel 
      createChannelHandler={createChannelHandler}
      inputRef={inputRef} />
  );
}

function dispatchToProps(dispatch, ownProps) {
  return {
    addChannelHandler: (workspace_id, channel) => {
      dispatch(addChannel(workspace_id, channel));
    }
  }
}

export default connect(null, dispatchToProps)(Container);