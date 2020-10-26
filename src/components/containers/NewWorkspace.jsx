import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import NewWorkspace from '../presenters/new_workspace/NewWorkspace';
import { useCreateWorkspace } from '../../graphql/mutations'

const Container = () => {
  const inputRef = useRef();
  const history = useHistory();

  const createWorkspace = useCreateWorkspace(({ createWorkspace: { workspace } }) => {
    history.push(`/workspaces/${workspace.id}/new`);
  }, { storeAction: true });

  const createWorkspaceHandler = useCallback(() => {
    if(inputRef && inputRef.current) {
      if(inputRef.current.value.trim().length === 0){
        inputRef.current.focus();
        return false;
      }

      createWorkspace({
        name: inputRef.current.value,
      });
    }
  }, [inputRef, createWorkspace]);

  return (
    <NewWorkspace
      createWorkspaceHandler={createWorkspaceHandler}
      inputRef={inputRef} />
  );
}

export default React.memo(Container);