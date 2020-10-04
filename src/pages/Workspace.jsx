import React, { useRef } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Main, Left, Center, Right } from '../styles/Workspace';
import { UserArea, WorkspaceArea, ChannelArea, Chat, SearchWorkspace, FriendArea } from './';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setMode } from '../action/cache';

const Page = ({ current_user, mode, cableApp, workspaces, 
  setModeHandler }) => {
  const { workspaceId, channelId } = useParams();

  useEffect(() => {
    if(current_user && workspaceId && channelId) {
      setModeHandler('chat');
    }
  }, [current_user, workspaceId, channelId]);
  const history = useHistory();

  const workspaceById = (id) => {
    if (workspaceId && workspaces) {
      return workspaces.filter((workspace) => workspace.id === id)[0] || { name: '?' };
    }else {
      return { name: '?' };
    }
  };

  const channelById = (id) => {
    if (channelId && workspaces) {
      return workspaceById(workspaceId).channels.filter((channel) => channel.id === id)[0] || { name: '?' };
    }else {
      return { name: '?' };
    }
  };

  const leftRef = useRef();
  const rightRef = useRef();
  const centerRef = useRef();

  //--------------------------- PARAMS -------------------------//
  const NoChannel = () => {
    return (
      <div style={{padding: '8px'}}>
        It's a workspace with no channels. <br /> 
        Why don't you make one?
        <Link to={`/workspaces/${workspaceId}/new`}>Okay</Link>
      </div>
    );
  }

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
  
  return (
    <Main>
      <Left ref={leftRef}>
        <WorkspaceArea history={history} />
        <ChannelArea workspaceById={workspaceById} history={history} />
      </Left>
      <Center ref={centerRef}>
        { (!workspaceId && !channelId) || mode === 'search' ? <SearchWorkspace history={history} /> : null}
        { workspaceId && channelId && mode === 'chat' ? <Chat cableApp={cableApp} workspaceById={workspaceById} channelById={channelById} /> : null}
        { workspaceId && mode === 'workspace_management' ? <Chat workspaceById={workspaceById} channelById={channelById} /> : null}
        { workspaceId && channelId && mode === 'channel_management' ? <Chat workspaceById={workspaceById} channelById={channelById} /> : null}
        {mode === 'no_channel' ? <NoChannel /> : null }
        {mode === 'welcome' ? <Welcome /> : null }
      </Center>
      <Right ref={rightRef}>
        <UserArea history={history} />
        <FriendArea history={history} />
      </Right>
    </Main>
  );
}

function mapStateToProps({ cache: { current_user, current_workspace, mode }, workspaces }) {
  return { current_user, current_workspace, mode, workspaces };
}


function dispatchToProps(dispatch) {
  return {
    setModeHandler: (mode) => {
      dispatch(setMode(mode));
    },
  }
}

export default connect(mapStateToProps, dispatchToProps)(Page);