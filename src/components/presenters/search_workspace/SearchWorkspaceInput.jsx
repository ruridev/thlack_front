import React, { useCallback } from 'react';
import { LinkButton, InputTextBox, SubmitButton } from '../../../styles';

const Presenter = ({ inputRef, searchWorkspacesHandler, searchWorkspacesData, joinWorkspaceHandler }) => {
  const keyDown = useCallback((e) => {
    if(e.keyCode === 13){
      searchWorkspacesHandler();
    }
  }, [searchWorkspacesHandler]);

  return (<>
    <InputTextBox
      type="text"
      onKeyDown={keyDown}
      placeholder="Workspace name"
      ref={inputRef} />
    <SubmitButton onClick={searchWorkspacesHandler}>Find</SubmitButton>
    {searchWorkspacesData && searchWorkspacesData.searchWorkspaces.length === 0 && <div>404 Not found :p </div>}
        {searchWorkspacesData && searchWorkspacesData.searchWorkspaces.map((workspace) => 
          <div key={workspace.id}>
            {workspace.name} &nbsp; <LinkButton onClick={() => {joinWorkspaceHandler(workspace.id)}}>Join</LinkButton>
          </div>
        )}
  </>);
}

export default React.memo(Presenter);