import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_WORKSPACE } from '../../queries';
import { setCurrentWorkspace } from '../../reducer/cache.action'
import { addWorkspace } from '../../reducer/workspace.action'
import { connect } from 'react-redux';
import NewWorkspace from '../presenters/new_workspace/NewWorkspace';

const Container = ({ dispatchCreateWorkspace, }) => {
  const inputRef = useRef();
  const history = useHistory();

  const [createWorkspace] = useMutation(CREATE_WORKSPACE, {
    onCompleted({ createWorkspace: { workspace } }) {
      dispatchCreateWorkspace(workspace)
      history.push(`/workspaces/${workspace.id}/new`);
    }
  });

  const createWorkspaceHandler = useCallback(() => {
    if(inputRef.current.value.trim().length === 0){
      inputRef.current.focus();
      return false;
    }

    createWorkspace({
      variables: {
        name: inputRef.current.value,
      },
    });
  }, [inputRef]);

  return (<>
    <NewWorkspace
      createWorkspaceHandler={createWorkspaceHandler}
      inputRef={inputRef} />
  </>);
}

function dispatchToProps(dispatch) {
  return {
    dispatchCreateWorkspace: (workspace) => {
      dispatch(addWorkspace(workspace));
      dispatch(setCurrentWorkspace(workspace));
    },
  }
}

export default connect(null, dispatchToProps)(Container);