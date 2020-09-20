import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { SEARCH_WORKSPACES, JOIN_WORKSPACE } from '../queries'
import { Search, Title, WorkingArea, JoinButton} from '../styles/SearchWorkspace';

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

  const searchWorkspacesHandler = () => {
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
        <input type="text" onChange={(e) => { setWorkspaceName(e.target.value)}} onKeyDown={(e) => { if(e.keyCode == 13) { searchWorkspacesHandler(workspaceName) } }}  placeholder="workspace name"></input>
        <button onClick={()=>searchWorkspacesHandler(workspaceName)}>검색</button>
        {searchWorkspacesData && searchWorkspacesData.searchWorkspaces.map((workspace) => 
          <div key={workspace.id}>
            {workspace.name} &nbsp; <JoinButton onClick={() => {joinWorkspaceHandler(workspace.id)}}>참가하기</JoinButton>
          </div>
        )}
      </WorkingArea>
    </Search>
  );
}