import React from 'react';
import NewWorkspace from '../components/containers/NewWorkspace';
import { AlignCenterWrapper, AlignCenter } from '../styles';

const Page = () => {
  return (
    <AlignCenterWrapper>
      <AlignCenter>
        <div>
          <h2>Create Workspace</h2>
          <NewWorkspace />
        </div>
      </AlignCenter>
    </AlignCenterWrapper>);
}

export default React.memo(Page);