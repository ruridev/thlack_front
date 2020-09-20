import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { auth } from '../firebase/firebase.utils';
import { useMutation, useLazyQuery } from '@apollo/client';
import { Main, Left, Center, Right } from '../styles/Workspace';
import { CREATE_MESSAGE, GET_MY_WORKSPACES, GET_CHANNELS, GET_LOGIN_USER, JOIN_CHANNEL } from '../queries'
import { UserArea, FriendArea, WorkspaceArea, ChannelArea, Chat, SearchWorkspace } from './';

export default function Page({ cableApp, loginUser, setLoginUserHandler, loginAccount, setLoginAccount }) {
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const [getMyWorkspaces, { data: myWorkspacesData }] = useLazyQuery(GET_MY_WORKSPACES, {
    fetchPolicy: `network-only`,
  });

  const [getChannels, { data: channelsData }] = useLazyQuery(GET_CHANNELS, {
    fetchPolicy: `network-only`,
    onCompleted({channels}) {
      if (channelId === undefined) {
        if (channels.length === 0) {
          setMode('no_channel');
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
          await getChannels({ variables: { workspace_id: parseInt(workspace_id) } });
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
    if (channel_id && channelsData) {
      return channelsData.channels.filter((channel) => channel.id === id)[0];
    }else {
      return { name: '?' };
    }
  };

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
      channelId: channel_id,
      onClickNewChannel,
      onClickChannelLink,
      channelsData,
    }
  }

  const chatParams = () => {
    return {
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
      <div>
        채널이 한개도 없는 워크스페이스에요! <br /> 
        하나 만들어면 어때요? 
        <Link to={`/workspaces/${workspaceId}/new`}>좋아요</Link>
      </div>
    );
  }
  
  return (
    <Main>
      <Left>
        <WorkspaceArea {...workspaceAreaParams()} />
        <ChannelArea {...channelAreaParams()} />
      </Left>
      <Center>
        { (!workspaceId && !channelId) || mode == 'search' ? <SearchWorkspace {...chatParams()} /> : null}
        { workspaceId && channelId && mode == 'chat' ? <Chat {...chatParams()} /> : null}
        { workspaceId && mode == 'workspace_management' ? <Chat {...chatParams()} /> : null}
        { workspaceId && channelId && mode == 'channel_management' ? <Chat {...chatParams()} /> : null}
        {mode == 'no_channel' ? <NoChannel /> : null }
      </Center>
      <Right>
        <UserArea {...userAreaParam()} />
        <FriendArea {...friendAreaParam()} />
      </Right>
    </Main>
  );
}
