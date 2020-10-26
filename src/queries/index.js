import { gql } from '@apollo/client';

const GET_MY_WORKSPACES = gql`
  query getMyWorkspaces {
    myWorkspaces {
      id
      name
      owners {
        id
      }
      channels {
        id
        name
      }
    }
  }
`;

const GET_WORKSPACES = gql`
  query getWorkspaces {
    workspaces{
      id  
      name
      owners {
        id
      }
      channels{
        id
        name
        owners {
          id
        }
        workspace {
          id
          name
        }
      }
    }
  }
`;

const GET_WORKSPACE = gql`
  query getWorkspace($id: Int!) {
    workspace(id: $id) {
      name
      owners{
        id
      }
    }
  }
`;

const GET_WORKSPACE_WITH_CHANNELS = gql`
  query getWorkspaceWithChannels($id: Int!) {
    workspace(id: $id) {
      name
      owners {
        id
      }
      channels {
        id
        name
      }
    }
  }
`;

const GET_LOGIN_USER = gql`
  query getLoginUser($id: Int) {
    loginUser(id: $id){
      id
      name
      token
      account {
        users {
          id
          name
        }
      }
      workspaces{
        id  
        name
        owners {
          id
        }
        channels{
          id
          name
          owners {
            id
          }
        }
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

const SEARCH_WORKSPACES = gql`
  query SearchWorkspaces($name: String!) {
    searchWorkspaces(name: $name) {
      id
      name
    }
  }
`;

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
        name
        users {
          id
          name
        }
        owners {
          id
          name
        }
        workspace {
          id
          name
          channels {
            id
            name
          }
        }
      }
    }
  }
`;

const JOIN_CHANNEL = gql`
  mutation JoinChannel($workspace_id: Int!, $channel_id: Int!) {
    joinChannel(input: { workspaceId: $workspace_id, channelId: $channel_id }) {
      channel {
        id
        name
        users {
          id
          name
        }
        owners {
          id
          name
        }
        workspace {
          id
          name
          channels {
            id
            name
          }
        }
      }
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
        users {
          id
          name
        }
      }
      alreadyExists
    }
  }
`;

const GET_ACCOUNT = gql`
  query getAccount {
    account {
      users {
        id
        name
      }
    }
  }
`;

const GET_USER = gql`
  query getUser($id: Int!) {
    user(id: $id){
      id
      name
    }
  }
`;

const GET_USER_WITH_TOKEN = gql`
  query getUser($id: Int!) {
    user(id: $id){
      id
      name
      token
    }
  }
`;

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
      name
      token
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
        name
        channels {
          id
          name
        }
        owners {
          id
        }
      }
    }
  }
`;

const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: Int!) {
    deleteMessage(
      input: {
        id: $id
      }
    )
    {
      message {
        id
      }
    }
  }
`;

const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($body: String, $id: Int!) {
    updateMessage(input: { body: $body, id: $id }) {
      message {
        id
      }
    }
  }
`;


export {
  CREATE_MESSAGE, 
  GET_WORKSPACE, 
  GET_WORKSPACE_WITH_CHANNELS,
  JOIN_CHANNEL, 
  CREATE_CHANNEL,
  GET_LOGIN_USER, 
  GET_WORKSPACES,
  SEARCH_WORKSPACES,
  JOIN_WORKSPACE,
  CREATE_ACCOUNT,
  GET_ACCOUNT,
  GET_USER_WITH_TOKEN,
  GET_USER,
  CREATE_USER,
  CREATE_WORKSPACE,
  DELETE_MESSAGE,
  UPDATE_MESSAGE,
};