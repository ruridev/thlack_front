import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { SEARCH_WORKSPACES, JOIN_WORKSPACE } from '../queries'
import { InputTextBox, SubmitButton, LinkButton } from '../styles';
import { Search, Title, WorkingArea } from '../styles/SearchWorkspace';

export default function Page(props){
  const [searchWorkspaces, { data: searchWorkspacesData }] = useLazyQuery(
    SEARCH_WORKSPACES,
    {
      fetchPolicy: `network-only`,
    }
  );
  const [joinWorkspace] = useMutation(
    JOIN_WORKSPACE,
    {
      onCompleted({ joinWorkspace: { workspace } }) {
        history.push(`/workspaces/${workspace.id}`);
      }
    }
  );

  const [workspaceName, setWorkspaceName] = useState('');
  const history = useHistory();
  const inputRef = useRef();

  const searchWorkspacesHandler = () => {
    if(workspaceName.trim().length === 0){
      inputRef.current.focus();
      return false;
    }
    searchWorkspaces({ variables: { name: workspaceName } })  
  }
  const joinWorkspaceHandler = (workspace_id) => {
    joinWorkspace({ variables: { workspace_id: parseInt(workspace_id) } });
  }

  return (
    <Search>
      <Title>
        워크스페이스 찾기
      </Title> 
      <WorkingArea>
        <InputTextBox type="text" onChange={(e) => { setWorkspaceName(e.target.value)}} onKeyDown={(e) => { if(e.keyCode == 13) { searchWorkspacesHandler(workspaceName) } }}  placeholder="workspace name" ref={inputRef} ></InputTextBox>
        <SubmitButton onClick={()=>searchWorkspacesHandler(workspaceName)}>검색</SubmitButton>
        {searchWorkspacesData && searchWorkspacesData.searchWorkspaces.length == 0 && <div>Not Found T.T </div>}
        {searchWorkspacesData && searchWorkspacesData.searchWorkspaces.map((workspace) => 
          <div key={workspace.id}>
            {workspace.name} &nbsp; <LinkButton onClick={() => {joinWorkspaceHandler(workspace.id)}}>참가하기</LinkButton>
          </div>
        )}
      </WorkingArea>
    </Search>
  );
}