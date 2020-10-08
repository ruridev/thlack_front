import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Main, Left, Center, Right } from '../styles/Workspace';
import { connect } from 'react-redux';
import { JOIN_CHANNEL, GET_WORKSPACES } from '../queries';
import { useLazyQuery, useMutation } from '@apollo/client';
import { fetchWorkspaces } from '../reducer/workspace.action';
import Chat from '../components/containers/Chat'
import WorkspaceChannelPannel from '../components/containers/WorkspaceChannelPannel'
import UserArea from '../components/containers/UserArea';
import FriendArea from '../components/containers/FriendArea';
import NewWorkspace from '../components/containers/NewWorkspace'
import NewChannel from '../components/containers/NewChannel'
import SearchWorkspacePage from '../components/containers/SearchWorkspacePage'

const Page = ({ current_user, workspaces, fetchWorkspacesHandler }) => {
  const { workspaceId, channelId } = useParams();
  const [mode, setMode] = useState('chat');
  
  const [joinChannel] = useMutation(JOIN_CHANNEL, {
    onCompleted(){
      setMode('chat');
    }
  });
  const [getWorkspaces] = useLazyQuery(GET_WORKSPACES, {
    fetchPolicy: `network-only`,
    onCompleted(data){
      fetchWorkspacesHandler(data.workspaces);
    }
  });

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
  }, [current_user])

  useEffect(() => {
    let flag = true;
    if(flag && workspaceId && channelId && channelId !== "new") {
      joinChannel({
        variables: {
          workspace_id: parseInt(workspaceId),
          channel_id: parseInt(channelId)
        }
      });
    }
    return function(){
      flag = false;
    }
  }, [workspaceId, channelId]);

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

  const txt = `
  ───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───
  ───█▒▒░░░░░░░░░▒▒█───
  ────█░░█░░░░░█░░█────
  ─▄▄──█░░░▀█▀░░░█──▄▄─
  █░░█─▀▄░░░░░░░▄▀─█░░█
  
  ╭╮╱╭┳━━━┳╮╱╱╭╮╱╱╭━━━╮╭╮╭╮╭┳━━━┳━━━┳╮╱╱╭━━━╮
  ┃┃╱┃┃╭━━┫┃╱╱┃┃╱╱┃╭━╮┃┃┃┃┃┃┃╭━╮┃╭━╮┃┃╱╱╰╮╭╮┃
  ┃╰━╯┃╰━━┫┃╱╱┃┃╱╱┃┃╱┃┃┃┃┃┃┃┃┃╱┃┃╰━╯┃┃╱╱╱┃┃┃┃
  ┃╭━╮┃╭━━┫┃╱╭┫┃╱╭┫┃╱┃┃┃╰╯╰╯┃┃╱┃┃╭╮╭┫┃╱╭╮┃┃┃┃
  ┃┃╱┃┃╰━━┫╰━╯┃╰━╯┃╰━╯┃╰╮╭╮╭┫╰━╯┃┃┃╰┫╰━╯┣╯╰╯┣╮
  ╰╯╱╰┻━━━┻━━━┻━━━┻━━━╯╱╰╯╰╯╰━━━┻╯╰━┻━━━┻━━━┻╯
  ╭━━━━┳╮╱╭┳━━┳━━━╮╭━━┳━━━╮╭━━━━┳╮╱╭┳╮╱╱╭━━━┳━━━┳╮╭━╮
  ┃╭╮╭╮┃┃╱┃┣┫┣┫╭━╮┃╰┫┣┫╭━╮┃┃╭╮╭╮┃┃╱┃┃┃╱╱┃╭━╮┃╭━╮┃┃┃╭╯
  ╰╯┃┃╰┫╰━╯┃┃┃┃╰━━╮╱┃┃┃╰━━╮╰╯┃┃╰┫╰━╯┃┃╱╱┃┃╱┃┃┃╱╰┫╰╯╯
  ╱╱┃┃╱┃╭━╮┃┃┃╰━━╮┃╱┃┃╰━━╮┃╱╱┃┃╱┃╭━╮┃┃╱╭┫╰━╯┃┃╱╭┫╭╮┃
  ╱╱┃┃╱┃┃╱┃┣┫┣┫╰━╯┃╭┫┣┫╰━╯┃╱╱┃┃╱┃┃╱┃┃╰━╯┃╭━╮┃╰━╯┃┃┃╰╮
  ╱╱╰╯╱╰╯╱╰┻━━┻━━━╯╰━━┻━━━╯╱╱╰╯╱╰╯╱╰┻━━━┻╯╱╰┻━━━┻╯╰━╯
  ╭━━━┳━━━┳━━━╮╭━━━┳╮╱╱╭┳━━━┳━━━┳╮╱╱╭┳━━━┳━╮╱╭┳━━━╮╭━━━╮
  ┃╭━━┫╭━╮┃╭━╮┃┃╭━━┫╰╮╭╯┃╭━━┫╭━╮┃╰╮╭╯┃╭━╮┃┃╰╮┃┃╭━━╋┫╭━╮┃
  ┃╰━━┫┃╱┃┃╰━╯┃┃╰━━╋╮┃┃╭┫╰━━┫╰━╯┣╮╰╯╭┫┃╱┃┃╭╮╰╯┃╰━━┫┃╰━━╮
  ┃╭━━┫┃╱┃┃╭╮╭╯┃╭━━╯┃╰╯┃┃╭━━┫╭╮╭╯╰╮╭╯┃┃╱┃┃┃╰╮┃┃╭━━┻┻━━╮┃
  ┃┃╱╱┃╰━╯┃┃┃╰╮┃╰━━╮╰╮╭╯┃╰━━┫┃┃╰╮╱┃┃╱┃╰━╯┃┃╱┃┃┃╰━━╮┃╰━╯┣╮
  ╰╯╱╱╰━━━┻╯╰━╯╰━━━╯╱╰╯╱╰━━━┻╯╰━╯╱╰╯╱╰━━━┻╯╱╰━┻━━━╯╰━━━┻╯
  ╭╮╱╭┳━━━┳━━━┳━━━┳╮╱╱╭╮╭╮╱╭┳━━━┳━━━┳╮╭━┳━━┳━╮╱╭┳━━━╮╭╮
  ┃┃╱┃┃╭━╮┃╭━╮┃╭━╮┃╰╮╭╯┃┃┃╱┃┃╭━╮┃╭━╮┃┃┃╭┻┫┣┫┃╰╮┃┃╭━╮┃┃┃
  ┃╰━╯┃┃╱┃┃╰━╯┃╰━╯┣╮╰╯╭╯┃╰━╯┃┃╱┃┃┃╱╰┫╰╯╯╱┃┃┃╭╮╰╯┃┃╱╰╯┃┃
  ┃╭━╮┃╰━╯┃╭━━┫╭━━╯╰╮╭╯╱┃╭━╮┃╰━╯┃┃╱╭┫╭╮┃╱┃┃┃┃╰╮┃┃┃╭━╮╰╯
  ┃┃╱┃┃╭━╮┃┃╱╱┃┃╱╱╱╱┃┃╱╱┃┃╱┃┃╭━╮┃╰━╯┃┃┃╰┳┫┣┫┃╱┃┃┃╰┻━┃╭╮
  ╰╯╱╰┻╯╱╰┻╯╱╱╰╯╱╱╱╱╰╯╱╱╰╯╱╰┻╯╱╰┻━━━┻╯╰━┻━━┻╯╱╰━┻━━━╯╰╯
  `;

  return (
    <Main>
      <Left>
        <WorkspaceChannelPannel />
      </Left>
      <Center>
        <Switch>
          <Route path="/workspaces" component={() => <SearchWorkspacePage /> } exact />
          <Route path="/workspaces/new" component={NewWorkspace} exact />
          <Route path="/workspaces/:workspaceId" component={Welcome} exact />
          <Route path="/workspaces/:workspaceId/new" component={NewChannel} exact />
          <Route path="/workspaces/:workspaceId/:channelId" component={Chat} exact />
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

function dispatchToProps(dispatch) {
  return {
    fetchWorkspacesHandler: (workspaces) => {
      dispatch(fetchWorkspaces(workspaces));
    }
  }
}

export default connect(mapStateToProps, dispatchToProps)(Page);