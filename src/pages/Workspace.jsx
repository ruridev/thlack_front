import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Main, Left, Center, Right } from '../styles/Workspace';
import { UserArea, SearchWorkspace, FriendArea } from './';
import Chat from '../components/containers/Chat'
import { connect } from 'react-redux';
import { JOIN_CHANNEL, GET_WORKSPACES } from '../queries';
import { useLazyQuery, useMutation } from '@apollo/client';
import { fetchWorkspaces } from '../reducer/workspace.action';
import WorkspaceChannelPannel from '../components/containers/WorkspaceChannelPannel'
import NewWorkspacePage from './NewWorkspacePage'
import NewChannelPage from './NewChannelPage'

const Page = ({ current_user, workspaces, fetchWorkspacesHandler }) => {
  const history = useHistory();
  const { workspaceId, channelId } = useParams();
  const [mode, setMode] = useState('chat');
  
  const [joinChannel] = useMutation(JOIN_CHANNEL, {
    onCompleted(){
      setMode('chat');
    }
  });

  useEffect(() => {
    let flag = true;
    if(flag){
      if(current_user){
        getWorkspaces();
      }
    }
    return function() {
      flag = false;
    }
  }, [current_user])

  useEffect(() => {
    let flag = true;
    if(flag) {
      if(workspaceId && channelId && channelId !== "new") {
        joinChannel({variables: { workspace_id: parseInt(workspaceId), channel_id: parseInt(channelId) } });
      }
    }
    return function(){
      flag = false;
    }
  }, [workspaceId, channelId]);

  const workspaceById = (id) => {
    console.log('getWorkspace id: ', id);

    if (workspaceId && workspaces) {
      const workspace = workspaces.filter((workspace) => workspace.id === id);
      if(workspace.length > 0){
        return workspace[0];
      }
    }

    return { name: '?' };
  }

  const channelById = (id) => {
    if (channelId && workspaces) {
      return workspaceById(workspaceId).channels.filter((channel) => channel.id === id)[0] || { name: '?' };
    }else {
      return { name: '?' };
    }
  };

  const rightRef = useRef();
  const centerRef = useRef();

  //--------------------------- PARAMS -------------------------//

  const Welcome = () => {
    return (
      <div style={{padding: '8px'}}>
        <h1>{workspaceById(workspaceId).name}</h1>
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
  const currentWorkspace = useMemo(() => {
    if(workspaces && workspaceId) {
      const workspace = workspaces.filter(workspace => workspace.id === workspaceId)[0];

      if(workspace){
        return workspace;
      }
    }
    return { id: 0, name: '?', channels: [], owners: [] };
  }, [workspaces, workspaceId]);

  const currentChannel = useMemo(() => {
    if(currentWorkspace && channelId && channelId !== "new") {
      const channel = currentWorkspace.channels.filter(channel => channel.id === channelId)[0];

      if(channel){
        return channel;
      }
    }
    return { id: 0, name: '?', owners: [], workspace: { name: '?' } };
  }, [currentWorkspace, channelId]);
  

  const [getWorkspaces] = useLazyQuery(GET_WORKSPACES, {
    fetchPolicy: `network-only`,
    onCompleted(data){
      fetchWorkspacesHandler(data.workspaces);
    }
  });

  const isWorkspaceOwner = useMemo(() => {
    if(current_user && currentWorkspace){
      return currentWorkspace.owners.filter(owner => owner.id === current_user.id).length > 0;
    }
  }, [current_user, currentWorkspace]);

  return (
    <Main>
      <Left>
        <WorkspaceChannelPannel history={history} currentWorkspace={currentWorkspace} workspaces={workspaces} currentWorkspaceId={workspaceId} currentChannelId={channelId} isWorkspaceOwner={isWorkspaceOwner} />
      </Left>
      <Center ref={centerRef}>
        <Switch>
          <Route path="/workspaces" component={() => <SearchWorkspace history={history} /> } exact />
          <Route path="/workspaces/new" component={NewWorkspacePage} exact />
          <Route path="/workspaces/:workspaceId" component={Welcome} exact />
          <Route path="/workspaces/:workspaceId/new" component={NewChannelPage} exact />
          <Route path="/workspaces/:workspaceId/:channelId" component={Chat} exact />
        </Switch>
        { workspaceId && mode === 'workspace_management' ? <Chat /> : null}
        { workspaceId && channelId && mode === 'channel_management' ? <Chat /> : null}
      </Center>
      <Right ref={rightRef}>
        <UserArea history={history} />
        <FriendArea history={history} />
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