import React, { useEffect } from 'react';
import { WorkspaceArea, ChannelArea } from './';

const Page = ({
  currentWorkspace,
  workspaces,
  currentWorkspaceId,
  currentChannelId,
  history,
  isWorkspaceOwner,
}) => {
  console.log("😇 WorkspaceChannelPannel.jsx rendering");
  useEffect(() => {
  console.log("😇 WorkspaceChannelPannel.jsx useEffect");
  }, []);

  return (
    <>
      <WorkspaceArea history={history} workspaces={workspaces} currentWorkspaceId={currentWorkspaceId} />
      <ChannelArea history={history} channels={currentWorkspace?.channels} currentWorkspaceId={currentWorkspaceId} currentChannelId={currentChannelId} isWorkspaceOwner={isWorkspaceOwner} />
    </>
  );
}

export default Page;