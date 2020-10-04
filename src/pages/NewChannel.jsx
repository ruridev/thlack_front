import React, { useRef, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_CHANNEL, JOIN_CHANNEL } from '../queries'
import { LinkButton, InputTextBox, SubmitButton } from '../styles/';
import { Main, WorkingArea } from '../styles/NewChannel';
import { addChannel } from '../action/workspace';
import { setMode } from '../action/cache';
import { connect } from 'react-redux';


const Page = ({ current_workspace, addChannelHandler, setModeHandler }) => {
  const inputRef = useRef();
  const { workspaceId } = useParams();
  const history = useHistory();

  const [joinChannel] = useMutation(JOIN_CHANNEL, {
    onCompleted({ joinChannel: { channel } }){
      setModeHandler('chat');
      history.push(`/workspaces/${workspaceId}/${channel.id}`);
    }
  });

  const [createChannel] = useMutation(CREATE_CHANNEL, {
    onCompleted({createChannel: { channel }}){
      addChannelHandler(workspaceId, channel)
      setModeHandler('chat');
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
    <Main>
      <WorkingArea>
        <div>
          <h2>Create a channel in ”{current_workspace && `${current_workspace.name}”`}</h2>
          <InputTextBox type="text" placeholder="general" ref={inputRef}></InputTextBox>
          <SubmitButton onClick={createChannelHandler}>Create</SubmitButton>
          <br />
          {current_workspace?.channels && current_workspace.channels.length > 0 && <p>↓ Already exist? ↓</p> }
          {current_workspace?.channels && current_workspace.channels.map((channel) => <LinkButton key={channel.id} onClick={() => { history.push(`/workspaces/${workspaceId}/${channel.id}`)}}>{channel.name}</LinkButton>)}
        </div>
      </WorkingArea>
    </Main>);
}

function mapStateToProps({ cache: { current_workspace } }) {
  return { current_workspace };
}

function dispatchToProps(dispatch, ownProps) {
  return {
    addChannelHandler: (workspace_id, channel) => {
      dispatch(addChannel(workspace_id, channel));
    },
    setModeHandler: (mode) => {
      dispatch(setMode(mode));
    }
  }
}

export default connect(mapStateToProps, dispatchToProps)(Page);