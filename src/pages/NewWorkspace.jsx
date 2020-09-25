import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { InputTextBox, SubmitButton } from '../styles';
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
          <InputTextBox type="name" placeholder="Team Thlack"  defaultValue={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)}></InputTextBox>
          <SubmitButton onClick={createWorkspaceHandler}>만들기</SubmitButton>
        </div>
      </WorkingArea>
    </Main>);
}