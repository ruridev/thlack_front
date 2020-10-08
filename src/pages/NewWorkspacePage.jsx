import React from 'react';
import NewWorkspace from '../components/containers/NewWorkspace';
import { Main, WorkingArea } from '../styles/NewWorkspace';

const Page = () => {
  return (
    <Main>
      <WorkingArea>
        <div>
          <h2>Create Workspace</h2>
          <NewWorkspace />
        </div>
      </WorkingArea>
    </Main>);
}

export default React.memo(Page);