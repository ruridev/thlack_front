import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Main, WorkingArea } from '../styles/NewWorkspace';
import { CREATE_WORKSPACE } from '../queries';

export default function Page(){
  const [createWorkspace] = useMutation(CREATE_WORKSPACE, {
    onCompleted({ createWorkspace: { workspace: { id } } }) {
      history.push(`/workspaces/${id}/new`);
    }
  });

  const [workspaceName, setWorkspaceName] = useState(null);
  const history = useHistory();

  const createWorkspaceHandler = () => {
    createWorkspace({
      variables: {
        name: workspaceName,
      },
    });
  }

  return (
    <Main>
      <WorkingArea>
        <div>
          <h2>Create Workspace</h2>
          <input type="name" placeholder="Team Thlack"  defaultValue={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)}></input>
          <button onClick={createWorkspaceHandler}>Create</button>
        </div>
      </WorkingArea>
    </Main>);
}