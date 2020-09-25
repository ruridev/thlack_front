import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { GET_WORKSPACE_WITH_CHANNELS, CREATE_CHANNEL } from '../queries'
import { LinkButton, InputTextBox, SubmitButton } from '../styles/';
import { Main, WorkingArea } from '../styles/NewChannel';

export default function Page(){
  const [getWorkspaceWithChannels, { data: workspaceData }] = useLazyQuery(GET_WORKSPACE_WITH_CHANNELS);

  const { workspaceId } = useParams();

  const [createChannel] = useMutation(CREATE_CHANNEL, {
    onCompleted({createChannel: { channel: { id } }}){
      history.push(`/workspaces/${workspaceId}/${id}`);
    }
  });

  const [channelName, setChannelName] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let flag = true;
    if (flag) {
      if (workspaceId) {
        getWorkspaceWithChannels({variables: { id: parseInt(workspaceId) }});
      }
    }

    return function (){
      flag = false;
    }
  }, [workspaceId])

  const createChannelHandler = () => {
    createChannel({
      variables: {
        name: channelName,
        workspace_id: parseInt(workspaceId)
      },
    });
  }

  return (
    <Main>
      <WorkingArea>
        <div>
          <h2>{workspaceData && workspaceData.workspace.name}</h2>
          <InputTextBox type="name" placeholder="general"  defaultValue={channelName} onChange={(e) => setChannelName(e.target.value)}></InputTextBox>
          <SubmitButton onClick={createChannelHandler}>Create</SubmitButton>
          <br />
          {workspaceData && workspaceData.workspace.channels.length > 0 && <p>👇 만들려는 채널이 이미 존재하나요? 👇</p> }
          {workspaceData && workspaceData.workspace.channels.map((channel) => <LinkButton onClick={() => { history.push(`/workspaces/${workspaceId}/${channel.id}`)}}>{channel.name}</LinkButton>)}
        </div>
      </WorkingArea>
    </Main>);
}