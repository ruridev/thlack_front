import React from 'react';
import { AlignCenterWrapper, AlignCenter } from '../../../styles';
import NewWorkspaceInput from './NewWorkspaceInput';

const Presenter = ({ createWorkspaceHandler, inputRef }) => {
  return (
    <AlignCenterWrapper>
      <AlignCenter>
        <div>
          <h2>Create Workspace</h2>
          <NewWorkspaceInput
            createWorkspaceHandler={createWorkspaceHandler}
            inputRef={inputRef}
            />
        </div>
      </AlignCenter>
    </AlignCenterWrapper>
  );
}

export default React.memo(Presenter);