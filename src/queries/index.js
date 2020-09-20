import { gql } from '@apollo/client';

const GET_MY_WORKSPACES = gql`
  query getMyWorkspaces {
    myWorkspaces {
      id
      name
    }
  }
`;

const GET_WORKSPACES = gql`
  query getWorkspaces {
    workspaces {
      id
      name
    }
  }
`;

const GET_CHANNELS = gql`
  query getChannels($workspace_id: Int!) {
    channels(id: $workspace_id) {
      id
      name
    }
  }
`;

const GET_LOGIN_USER = gql`
  query getLoginUser {
    loginUser{
      id
      name
    }
  }
`;

const JOIN_CHANNEL = gql`
  mutation JoinChannel($workspace_id: Int!, $channel_id: Int!) {
    joinChannel(input: { workspaceId: $workspace_id, channelId: $channel_id }) {
      channel {
        id
      }
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation CreateMessage($body: String, $channel_id: Int!) {
    createMessage(input: { body: $body, channelId: $channel_id }) {
      message {
        id
      }
    }
  }
`;


// 워크스페이스 검색하기
const SEARCH_WORKSPACES = gql`
  query SearchWorkspaces($name: String!) {
    searchWorkspaces(name: $name) {
      id
      name
    }
  }
`;

// 워크스페이스 입장 리퀘스트
const JOIN_REQUEST_WORKSPACE = gql`
mutation JoinRequestWorkspace(
  $workspace_id: Int!
) {
  joinRequestWorkspace(
    input: {
      workspace_id: $workspace_id
    }
  )
  {
    workspace {
      id
    }
  }
}
`;

const CREATE_CHANNEL = gql`
mutation CreateChannel(
  $name: String!,
  $workspace_id: Int!,
) {
  createChannel(
    input: {
      name: $name,
      workspaceId: $workspace_id
    }
  )
  {
    channel {
      id
    }
  }
}
`;

const GET_WORKSPACE = gql`
  query getWorkspace($id: Int!) {
    workspace(id: $id) {
      name
    }
  }
`;

const JOIN_WORKSPACE = gql`
  mutation JoinWorkspace($workspace_id: Int!) {
    joinWorkspace(input: { workspaceId: $workspace_id }) {
      workspace {
        id
      }
    }
  }
`;


const CREATE_ACCOUNT = gql`
  mutation CreateAccount(
    $identifier: String!,
    $providerId: String!,
    $displayName: String,
    $email: String!
  ) {
    createAccount(
      input: {
        credentials: {
          identifier: $identifier,
          providerId: $providerId
        },
        displayName: $displayName,
        email: $email
      }
    )
    {
      account {
        id
      }
      user {
        id
      }
    }
  }
`;




// 유저 가져오기
const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
    }
  }
`;

// 토큰 취득하기
const GET_USER_TOKEN = gql`
  query GetUserToken($user_id: Int!) {
    userToken(id: $user_id){
      id
      name
      token
    }
  }
`;

// 토큰 취득하기
const GET_USER = gql`
  query getUser($id: Int!) {
    user(id: $id){
      id
      name
    }
  }
`;

// 유저 새로 만들기
const CREATE_USER = gql`
mutation CreateUser(
  $name: String!
) {
  createUser(
    input: {
      name: $name
    }
  )
  {
    user {
      id
    }
  }
}
`;

const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace(
    $name: String!
  ) {
    createWorkspace(
      input: {
        name: $name
      }
    )
    {
      workspace {
        id
      }
    }
  }
`;

export {
  CREATE_MESSAGE, 
  GET_MY_WORKSPACES,
  GET_CHANNELS, 
  GET_LOGIN_USER, 
  JOIN_CHANNEL, 
  GET_WORKSPACES,
  CREATE_CHANNEL,
  GET_WORKSPACE, 
  SEARCH_WORKSPACES,
  JOIN_WORKSPACE,
  CREATE_ACCOUNT,
  GET_USERS,
  GET_USER_TOKEN,
  GET_USER,
  CREATE_USER,
  CREATE_WORKSPACE
};