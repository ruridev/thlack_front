import React from 'react';
import { AlignCenterWrapper, AlignCenter } from '../../../styles';
import SearchWorkspaceInput from './SearchWorkspaceInput';

const Presenter = ({ inputRef, searchWorkspacesHandler, searchWorkspacesData, joinWorkspaceHandler }) => {
  return ( 
    <AlignCenterWrapper>
      <AlignCenter>
        <h2>
          Find Workspace
        </h2>
        <SearchWorkspaceInput 
          inputRef={inputRef}
          searchWorkspacesHandler={searchWorkspacesHandler}
          searchWorkspacesData={searchWorkspacesData}
          joinWorkspaceHandler={joinWorkspaceHandler} />
      </AlignCenter>
    </AlignCenterWrapper>
  );
}

export default React.memo(Presenter);