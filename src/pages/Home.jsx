import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { auth, signInWithGoogle, signInWithGithub } from '../firebase/firebase.utils';

const Home = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-areas: 
    ". . ."
    ". signin ."
    ". . .";
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr 1fr 1fr;
`
const SignIn = styled.div`
  grid-area: signin;
  padding: 4px;
  border: 1px solid #000000;
  text-align: center;
`

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

export default function Page({loginUser, setLoginUser, loginAccount, setLoginAccount, initFunction}){
  const [createAccount, { loading, error, data: accountData }] = useMutation(CREATE_ACCOUNT);

  const history = useHistory();

  useEffect(() => {
    if(initFunction){
      initFunction();
    }

    auth.onAuthStateChanged((user) => {
      if(user === undefined || user === null){
        setLoginAccount(null);

        history.push('/');
      }else if(user.email !== null){
        console.log('Home effect');
        setLoginAccount(user);

        user.getIdToken(true).then(function(idToken) {
          if(localStorage.getItem('kind') !== 'user') {
            localStorage.setItem('kind', 'account')
            localStorage.setItem('token', idToken)
            async function f(){
              const account = await createAccount({
                variables: {
                  identifier: user.uid,
                  providerId: user.providerData[0].providerId,
                  displayName: user.displayName,
                  email: user.email,
                },
              });
            }
            f();
          }
          history.push('/change_user');
        });
      }
    });

    const cleanup = () => {
      console.log('cleanup!');
    };
    return cleanup;
  }, []);


  if (loading) return <div>loading...</div>;
  if (error)   return <div>error... {error[0]}</div>;

  return(
    <Home>
      <SignIn>
        <div>
          <h1>
            Thlack
            
          </h1>
        </div> 
        <hr />
        <p>
          <button onClick={signInWithGoogle}>
            <b><font color="blue">G</font>
            <font color="red">o</font>
            <font color="orange">o</font>
            <font color="blue">g</font>
            <font color="green">l</font>
            <font color="red">e</font></b>
            </button>&nbsp;
          <button onClick={signInWithGithub}>
            <b>GitHub</b>
          </button>
        </p>
      </SignIn>
    </Home>
  )
}