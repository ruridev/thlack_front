import React, { useState, useRef, useMemo, useCallback } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Main, Left, Center, Right } from '../styles/Workspace';
import { WorkspaceChannelPannel, UserArea, WorkspaceArea, ChannelArea, Chat, SearchWorkspace, FriendArea } from './';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { JOIN_CHANNEL, GET_WORKSPACES } from '../queries';
import { useLazyQuery, useMutation } from '@apollo/client';
import { fetchWorkspaces } from '../action/workspace';

const Page = ({ current_user, workspaces, fetchWorkspacesHandler }) => {
  console.log("😇 Workspace.jsx rendering");
  useEffect(() => {
    console.log("😇 Workspace.jsx useEffect");
  }, []);

  const history = useHistory();
  const { workspaceId, channelId } = useParams();
  const [mode, setMode] = useState('chat');
  
  const [joinChannel] = useMutation(JOIN_CHANNEL, {
    onCompleted(){
      setMode('chat');
    }
  });

  useEffect(() => {
    if(current_user){
      getWorkspaces();
    }
  }, [current_user])


  useEffect(() => {
    if(workspaceId && channelId) {
      joinChannel({variables: { workspace_id: parseInt(workspaceId), channel_id: parseInt(channelId) } });
    }
  }, [workspaceId, channelId]);
  
  useEffect(() => {
    if(current_user && workspaceId && channelId) {
      
    }
  }, [current_user, workspaceId, channelId]);  

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
`}
        </pre>
      </div>
    );
  }

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
    if(currentWorkspace && channelId) {
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
          <Route path="/workspaces/:workspaceId" component={Welcome} exact />
          <Route path="/workspaces/:workspaceId/:channelId" component={() => <Chat currentChannel={currentChannel} />} exact />
        </Switch>
        { workspaceId && mode === 'workspace_management' ? <Chat workspaceById={workspaceById} channelById={channelById} /> : null}
        { workspaceId && channelId && mode === 'channel_management' ? <Chat workspaceById={workspaceById} channelById={channelById} /> : null}
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