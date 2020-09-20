import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { auth, signInWithGoogle, signInWithGithub } from '../firebase/firebase.utils';
import { CREATE_ACCOUNT } from '../queries'
import { Home, SignIn } from '../styles/Home';

export default function Page(props){
  const { loginAccount, setLoginAccount, initFunction } = props;
  const [createAccount] = useMutation(
    CREATE_ACCOUNT,
    {
      onCompleted({createAccount: { account }}) {
        if(account){
          history.push('/change_user');
        }
      }
    });

  const history = useHistory();

  useEffect(() => {
    let flag = true;
    if(flag) {
      if(initFunction){
        initFunction();
      }

      auth.onAuthStateChanged((user) => {
        if(user === undefined || user === null){
          localStorage.setItem('kind', null)
          localStorage.setItem('token', null)
          setLoginAccount(null);
          history.push('/');
        }else if(user.email !== null && loginAccount == null){
          setLoginAccount(user);
          user.getIdToken(true).then(function(idToken) {
            localStorage.setItem('kind', 'account')
            localStorage.setItem('token', idToken)
            createAccount({
              variables: {
                identifier: user.uid,
                providerId: user.providerData[0].providerId,
                displayName: user.displayName,
                email: user.email,
              },
            });
          });
        }
      });
    }
  });

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