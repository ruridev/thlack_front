import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { GET_WORKSPACE, CREATE_CHANNEL } from '../queries'
import { Main, WorkingArea } from '../styles/NewChannel';

export default function Page(){
  const [getWorkspace, { data: workspaceData }] = useLazyQuery(GET_WORKSPACE);

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
        getWorkspace({variables: { id: parseInt(workspaceId) }});
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
          <input type="name" placeholder="general"  defaultValue={channelName} onChange={(e) => setChannelName(e.target.value)}></input>
          <button onClick={createChannelHandler}>Create</button>
        </div>
      </WorkingArea>
    </Main>);
}