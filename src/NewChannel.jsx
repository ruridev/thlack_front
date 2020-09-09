import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, useHistory, useParams } from 'react-router-dom';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { auth, signInWithGoogle, signInWithGithub } from './firebase/firebase.utils';

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas: 
    ". . ."
    ". a ."
    ". . .";
  grid-template-columns: auto 153px auto;
  grid-template-rows: auto 100px auto;
`

const WorkingArea = styled.div`
  grid-area: a;
  text-align: center;
`

// 워크스페이스 가져오기
const GET_WORKSPACE = gql`
  query getWorkspace($id: Int!) {
    workspace(id: $id) {
      name
    }
  }
`;


// 워크스페이스 새로 만들기
const CREATE_CHANNEL = gql`
mutation CreateChannel(
  $name: String!,
  $workspace_id: Int!,
) {
  createChannel(
    input: {
      name: $name,
      workspaceId: $workspace_id
    }
  )
  {
    channel {
      id
    }
  }
}
`;

export default function Page({loginUser, setLoginUser, loginAccount, setLoginAccount}){
  const [getWorkspace, { called, loading, data }] = useLazyQuery(GET_WORKSPACE);
  const [createChannel, { _ }] = useMutation(CREATE_CHANNEL);
  const { workspace_id } = useParams();
  const [channelName, setChannelName] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if(workspace_id){
      getWorkspace({
        variables: {
          id: parseInt(workspace_id)
        },
      });
    }
    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, [workspace_id])

  const createChannelHandler = () => {
    async function f(){
      const channel = await createChannel({
        variables: {
          name: channelName,
          workspace_id: parseInt(workspace_id)
        },
      });
      
      history.push(`/workspaces/${workspace_id}/${channel.data.createChannel.channel.id}`)
    };
    f();
  }

  return (
    <Main>
      <WorkingArea>
        <div>
          <h2>{data && data.workspace.name}</h2>
          <input type="name" placeholder="New Channel name"  defaultValue={channelName} onChange={(e) => setChannelName(e.target.value)}></input>
          <button onClick={createChannelHandler}>Create</button>
        </div>
      </WorkingArea>
    </Main>);
}