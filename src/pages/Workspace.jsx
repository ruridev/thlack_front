import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { auth } from '../firebase/firebase.utils';
import { useMutation, useLazyQuery } from '@apollo/client';
import { LinkButton } from '../styles';
import { Main, Left, Center, Right, MobileBar } from '../styles/Workspace';

import { CREATE_MESSAGE, GET_MY_WORKSPACES, GET_WORKSPACE_WITH_CHANNELS, GET_LOGIN_USER, JOIN_CHANNEL } from '../queries'
import { UserArea, FriendArea, WorkspaceArea, ChannelArea, Chat, SearchWorkspace } from './';

export default function Page({ cableApp, loginUser, setLoginUserHandler, loginAccount, setLoginAccount }) {
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [getMyWorkspaces, { data: myWorkspacesData }] = useLazyQuery(GET_MY_WORKSPACES, {
    fetchPolicy: `network-only`,
  });

  const [getWorkspaceWithChannels, { data: workspaceData }] = useLazyQuery(GET_WORKSPACE_WITH_CHANNELS, {
    fetchPolicy: `network-only`,
    onCompleted({ workspace: { channels }}) {
      if (channelId === undefined) {
        if (channels.length === 0) {
          setMode('no_channel');
        }else{
          setMode('welcome');
        }
      }
    }
  });

  const [getLoginUser] = useLazyQuery(GET_LOGIN_USER, {
    fetchPolicy: `network-only`,
    onCompleted({loginUser}){
      setLoginUserHandler(loginUser);
    }
  });

  const [joinChannel] = useMutation(JOIN_CHANNEL, {
    onCompleted(){
      setMode('chat');
    }
  });

  const { workspaceId, channelId } = useParams();
  const [workspace_id, setWorkspaceId] = useState(workspaceId);
  const [channel_id, setChannelId] = useState(channelId);

  const [mode, setMode] = useState('chat');

  const history = useHistory();

  useEffect(() => {
    let flag = true;

    if(flag) {
      auth.onAuthStateChanged((user) => {
        if (user === undefined || user === null) {
          setLoginAccount(null);
          history.push('/');
        } else if (user.email !== null) {
          if(!loginAccount) {
            setLoginAccount(user);
          }

          async function f (){
          if(!myWorkspacesData){
            await getMyWorkspaces({ variables: {} });
          }
          if(!loginUser){
            await getLoginUser();
          }
        }
        f();

        }

      });
    }

    return function(){
      flag = false;
    }
  }, []);

  useEffect(() => {
    let flag = true;

    if (flag){
      if (loginUser){
        if(workspace_id) {
          async function f (){
            await getWorkspaceWithChannels({ variables: { id: parseInt(workspace_id) } });
          }
          f();
        }
      }
    }

    return function(){
      flag = false;
    };
  }, [workspace_id]);

  useEffect(() => {
    let flag = true;

    if(flag) {
      if (loginUser && workspace_id && channel_id) {
        joinChannel({variables: { workspace_id: parseInt(workspace_id), channel_id: parseInt(channel_id) } });
      }
    }

    return function(){
      flag = false
    };
  }, [channel_id]);

  const workspaceById = (id) => {
    if (workspace_id && myWorkspacesData) {

      return myWorkspacesData.myWorkspaces.filter((workspace) => workspace.id === id)[0];
    }else {
      return { name: '?' };
    }
  };

  const channelById = (id) => {
    if (channel_id && workspaceData) {
      return workspaceData.workspace.channels.filter((channel) => channel.id === id)[0];
    }else {
      return { name: '?' };
    }
  };

  const leftRef = useRef();
  const rightRef = useRef();
  const centerRef = useRef();
  const mobileToggle = () => {
    if(leftRef?.current && rightRef?.current){
      if(leftRef.current.style.display === "block") {
        leftRef.current.style.display = "none";
      }else {
        leftRef.current.style.display = "block";
      }
      
      if(rightRef.current.style.display === "block") {
        rightRef.current.style.display = "none";
      }else {
        rightRef.current.style.display = "block";
      }
      
      if(centerRef.current.style.display !== "none") {
        centerRef.current.style.display = "none";
      }else {
        centerRef.current.style.display = "block";
      }
    }
  }

  // -------------------------------------------------------------------------------------- //
  const onClickNewWorkspace = () => {
    history.push('/workspaces/new');
  }

  const onClickWorkspaceLink = (_workspaceId) => {
    history.push(`/workspaces/${_workspaceId}`);
    setWorkspaceId(_workspaceId)
  }

  const onClickNewChannel = () => {
    history.push(`/workspaces/${workspaceId}/new`)
  }
  
  const onClickChannelLink = (_channelId) => {
    history.push(`/workspaces/${workspaceId}/${_channelId}`)
    setChannelId(_channelId)
    setMode('chat');
  }

  const onClickChangeUser = () => {
    history.push('/change_user');
  }

  const onClickSignOut = () => {
    history.push('/signout');
  }

  const onClickSearchWorkspace = () => {
    setMode('search');
  }
  //--------------------------- PARAMS -------------------------//

  const workspaceAreaParams = () => {
    return {
      loginUser,
      workspaceId: workspace_id,
      onClickWorkspaceLink,
      onClickNewWorkspace,
      myWorkspacesData,
      onClickSearchWorkspace,
    }
  }

  const channelAreaParams = () => {
    return {
      loginUser,
      workspaceId: workspace_id,
      channelId: channel_id,
      onClickNewChannel,
      onClickChannelLink,
      workspaceData,
    }
  }

  const chatParams = () => {
    return {
      loginUser,
      onClickNewChannel,
      workspaceById,
      workspaceId: workspace_id,
      channelById,
      channelId: channel_id,
      cableApp,
      createMessage,
    }
  }

  const userAreaParam = () => {
    return {
      loginUser,
      loginAccount,
      onClickChangeUser,
      onClickSignOut,
    }
  }

  const friendAreaParam = () => {
    const friendIds = [];
    return {
      loginUser,
      friendIds,
    }
  }

  const NoChannel = () => {
    return (
      <div style={{padding: '8px'}}>
        채널이 한개도 없는 워크스페이스에요! <br /> 
        하나 만들어면 어때요? 
        <Link to={`/workspaces/${workspaceId}/new`}>좋아요</Link>
      </div>
    );
  }

  const Welcome = () => {
    return (
      <div style={{padding: '8px'}}>
        어서오세요! <br />
        이 워크스페이스에는 아래와 같은 채널들이 있어용.<br />
        👇👇👇👇👇👇👇<br />
        {workspaceData?.workspace.channels.map((channel) => <LinkButton onClick={() => { history.push(`/workspaces/${workspace_id}/${channel.id}`)}}>{channel.name}</LinkButton>)}
      </div>
    );
  }
  
  return (
    <Main>
      <MobileBar><a onClick={mobileToggle}>🍔</a></MobileBar>
      <Left ref={leftRef}>
        <WorkspaceArea {...workspaceAreaParams()} />
        <ChannelArea {...channelAreaParams()} />
      </Left>
      <Center ref={centerRef}>
        { (!workspaceId && !channelId) || mode == 'search' ? <SearchWorkspace {...chatParams()} /> : null}
        { workspaceId && channelId && mode == 'chat' ? <Chat {...chatParams()} /> : null}
        { workspaceId && mode == 'workspace_management' ? <Chat {...chatParams()} /> : null}
        { workspaceId && channelId && mode == 'channel_management' ? <Chat {...chatParams()} /> : null}
        {mode == 'no_channel' ? <NoChannel /> : null }
        {mode == 'welcome' ? <Welcome /> : null }
      </Center>
      <Right ref={rightRef}>
        <UserArea {...userAreaParam()} />
        <FriendArea {...friendAreaParam()} />
      </Right>
    </Main>
  );
}
