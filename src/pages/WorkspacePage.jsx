import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Main, Left, Center, Right } from '../styles/Workspace';
import { connect } from 'react-redux';
import Chat from '../components/containers/Chat'
import WorkspaceChannelPannel from '../components/containers/WorkspaceChannelPannel'
import UserArea from '../components/containers/UserArea';
import FriendArea from '../components/containers/FriendArea';
import NewWorkspace from '../components/containers/NewWorkspace'
import NewChannel from '../components/containers/NewChannel'
import SearchWorkspace from '../components/containers/SearchWorkspace'
import UserProfile from '../components/containers/UserProfile'
import { useJoinChannel } from '../graphql/mutations';
import { useGetWorkspaces } from '../graphql/queries';

const Page = ({ current_user, workspaces }) => {
  const { workspaceId, channelId } = useParams();
  const [mode, setMode] = useState('chat');
  
  const joinChannel = useJoinChannel(() => {
    setMode('chat');
  }, {});
  const getWorkspaces = useGetWorkspaces(() => { 
  }, { storeAction: true });

  const currentWorkspace = useMemo(() => {
    if(workspaces && workspaceId) {
      const workspace = workspaces.filter(workspace => workspace.id === workspaceId)[0];

      if(workspace){
        return workspace;
      }
    }
    return { id: 0, name: '?', channels: [], owners: [] };
  }, [workspaces, workspaceId]);

  useEffect(() => {
    let flag = true;
    if(flag && current_user){
      getWorkspaces();
    }
    return function() {
      flag = false;
    }
  }, [current_user, getWorkspaces])

  useEffect(() => {
    let flag = true;
    if(flag && workspaceId && channelId && channelId !== "new") {
      joinChannel({
        workspace_id: parseInt(workspaceId),
        channel_id: parseInt(channelId)
      });
    }
    return function(){
      flag = false;
    }
  }, [joinChannel, workspaceId, channelId]);

  const Welcome = () => {
    return (
      <div style={{padding: '8px'}}>
        <h1>{currentWorkspace.name}</h1>
        <pre>
{`
───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───
───█▒▒░░░░░░░░░▒▒█───
────█░░█░░░░░█░░█────
─▄▄──█░░░▀█▀░░░█──▄▄─
█░░█─▀▄░░░░░░░▄▀─█░░█
─▄▄──█░░░▀█▀░░░█──▄▄─
────█░░█░░░░░█░░█────
────▀▄▄▄▀▀▀▀▀▀▀▀▄▄▄▀────
`}
        </pre>
      </div>
    );
  }

  // ───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───
  // ───█▒▒░░░░░░░░░▒▒█───
  // ────█░░█░░░░░█░░█────
  // ─▄▄──█░░░▀█▀░░░█──▄▄─
  // █░░█─▀▄░░░░░░░▄▀─█░░█
  
  // ╭╮╱╭┳━━━┳╮╱╱╭╮╱╱╭━━━╮╭╮╭╮╭┳━━━┳━━━┳╮╱╱╭━━━╮
  // ┃┃╱┃┃╭━━┫┃╱╱┃┃╱╱┃╭━╮┃┃┃┃┃┃┃╭━╮┃╭━╮┃┃╱╱╰╮╭╮┃
  // ┃╰━╯┃╰━━┫┃╱╱┃┃╱╱┃┃╱┃┃┃┃┃┃┃┃┃╱┃┃╰━╯┃┃╱╱╱┃┃┃┃
  // ┃╭━╮┃╭━━┫┃╱╭┫┃╱╭┫┃╱┃┃┃╰╯╰╯┃┃╱┃┃╭╮╭┫┃╱╭╮┃┃┃┃
  // ┃┃╱┃┃╰━━┫╰━╯┃╰━╯┃╰━╯┃╰╮╭╮╭┫╰━╯┃┃┃╰┫╰━╯┣╯╰╯┣╮
  // ╰╯╱╰┻━━━┻━━━┻━━━┻━━━╯╱╰╯╰╯╰━━━┻╯╰━┻━━━┻━━━┻╯
  // ╭━━━━┳╮╱╭┳━━┳━━━╮╭━━┳━━━╮╭━━━━┳╮╱╭┳╮╱╱╭━━━┳━━━┳╮╭━╮
  // ┃╭╮╭╮┃┃╱┃┣┫┣┫╭━╮┃╰┫┣┫╭━╮┃┃╭╮╭╮┃┃╱┃┃┃╱╱┃╭━╮┃╭━╮┃┃┃╭╯
  // ╰╯┃┃╰┫╰━╯┃┃┃┃╰━━╮╱┃┃┃╰━━╮╰╯┃┃╰┫╰━╯┃┃╱╱┃┃╱┃┃┃╱╰┫╰╯╯
  // ╱╱┃┃╱┃╭━╮┃┃┃╰━━╮┃╱┃┃╰━━╮┃╱╱┃┃╱┃╭━╮┃┃╱╭┫╰━╯┃┃╱╭┫╭╮┃
  // ╱╱┃┃╱┃┃╱┃┣┫┣┫╰━╯┃╭┫┣┫╰━╯┃╱╱┃┃╱┃┃╱┃┃╰━╯┃╭━╮┃╰━╯┃┃┃╰╮
  // ╱╱╰╯╱╰╯╱╰┻━━┻━━━╯╰━━┻━━━╯╱╱╰╯╱╰╯╱╰┻━━━┻╯╱╰┻━━━┻╯╰━╯
  // ╭━━━┳━━━┳━━━╮╭━━━┳╮╱╱╭┳━━━┳━━━┳╮╱╱╭┳━━━┳━╮╱╭┳━━━╮╭━━━╮
  // ┃╭━━┫╭━╮┃╭━╮┃┃╭━━┫╰╮╭╯┃╭━━┫╭━╮┃╰╮╭╯┃╭━╮┃┃╰╮┃┃╭━━╋┫╭━╮┃
  // ┃╰━━┫┃╱┃┃╰━╯┃┃╰━━╋╮┃┃╭┫╰━━┫╰━╯┣╮╰╯╭┫┃╱┃┃╭╮╰╯┃╰━━┫┃╰━━╮
  // ┃╭━━┫┃╱┃┃╭╮╭╯┃╭━━╯┃╰╯┃┃╭━━┫╭╮╭╯╰╮╭╯┃┃╱┃┃┃╰╮┃┃╭━━┻┻━━╮┃
  // ┃┃╱╱┃╰━╯┃┃┃╰╮┃╰━━╮╰╮╭╯┃╰━━┫┃┃╰╮╱┃┃╱┃╰━╯┃┃╱┃┃┃╰━━╮┃╰━╯┣╮
  // ╰╯╱╱╰━━━┻╯╰━╯╰━━━╯╱╰╯╱╰━━━┻╯╰━╯╱╰╯╱╰━━━┻╯╱╰━┻━━━╯╰━━━┻╯
  // ╭╮╱╭┳━━━┳━━━┳━━━┳╮╱╱╭╮╭╮╱╭┳━━━┳━━━┳╮╭━┳━━┳━╮╱╭┳━━━╮╭╮
  // ┃┃╱┃┃╭━╮┃╭━╮┃╭━╮┃╰╮╭╯┃┃┃╱┃┃╭━╮┃╭━╮┃┃┃╭┻┫┣┫┃╰╮┃┃╭━╮┃┃┃
  // ┃╰━╯┃┃╱┃┃╰━╯┃╰━╯┣╮╰╯╭╯┃╰━╯┃┃╱┃┃┃╱╰┫╰╯╯╱┃┃┃╭╮╰╯┃┃╱╰╯┃┃
  // ┃╭━╮┃╰━╯┃╭━━┫╭━━╯╰╮╭╯╱┃╭━╮┃╰━╯┃┃╱╭┫╭╮┃╱┃┃┃┃╰╮┃┃┃╭━╮╰╯
  // ┃┃╱┃┃╭━╮┃┃╱╱┃┃╱╱╱╱┃┃╱╱┃┃╱┃┃╭━╮┃╰━╯┃┃┃╰┳┫┣┫┃╱┃┃┃╰┻━┃╭╮
  // ╰╯╱╰┻╯╱╰┻╯╱╱╰╯╱╱╱╱╰╯╱╱╰╯╱╰┻╯╱╰┻━━━┻╯╰━┻━━┻╯╱╰━┻━━━╯╰╯

  return (
    <Main>
      <Left>
        <WorkspaceChannelPannel />
      </Left>
      <Center>
        <Switch>
          <Route path="/workspaces" component={() => <SearchWorkspace /> } exact />
          <Route path="/workspaces/new" component={NewWorkspace} exact />
          <Route path="/workspaces/:workspaceId" component={Welcome} exact />
          <Route path="/workspaces/:workspaceId/new" component={NewChannel} exact />
          <Route path="/workspaces/:workspaceId/:channelId" component={Chat} exact />
          <Route path="/users/:userId" component={UserProfile} exact />
        </Switch>
        { workspaceId && mode === 'workspace_management' ? <Chat /> : null}
        { workspaceId && channelId && mode === 'channel_management' ? <Chat /> : null}
      </Center>
      <Right>
        <UserArea />
        <FriendArea />
      </Right>
    </Main>
  );
}

function mapStateToProps({ cache: { current_user, current_workspace }, workspaces }) {
  return { current_user, current_workspace, workspaces };
}

export default connect(mapStateToProps, null)(Page);