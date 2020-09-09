import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
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

// 워크스페이스 새로 만들기
const CREATE_WORKSPACE = gql`
mutation CreateWorkspace(
  $name: String!
) {
  createWorkspace(
    input: {
      name: $name
    }
  )
  {
    workspace {
      id
    }
  }
}
`;

export default function Page({loginUser, setLoginUser, loginAccount, setLoginAccount}){
  const [createWorkspace, { loadingCreateWorkspace, errorCreateWorkspace, dataCreateWorkspace }] = useMutation(CREATE_WORKSPACE);
  const [workspaceName, setWorkspaceName] = useState(null);
  const history = useHistory();

  const createWorkspaceHandler = () => {
    console.log(workspaceName);

    if(workspaceName) {
      async function f(){
        const workspace = await createWorkspace({
          variables: {
            name: workspaceName
          },
        });
        
        history.push(`/workspaces/${workspace.data.createWorkspace.workspace.id}/channels/new`)
      };
      f();
    }
  }

  return (
    <Main>
      <WorkingArea>
        <input type="name" placeholder="New Workspace name" defaultValue={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)}></input>
        <button onClick={createWorkspaceHandler}>Create</button>
      </WorkingArea>
    </Main>);
}