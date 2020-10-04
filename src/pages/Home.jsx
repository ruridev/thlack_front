import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import { auth, signInWithGoogle, signInWithGithub } from '../firebase/firebase.utils';
import { CREATE_ACCOUNT } from '../queries'
import { signOut, signIn } from '../action/account';
import { setCurrentAccount, setToken, removeToken } from '../action/cache';
import { Home, SignIn, SocialServiceButton } from '../styles/Home';

const Page = ({ signOutHandler, signInHandler, setTokenHandler, removeTokenHandler, setCurrentAccountHandler }) => {
  const [createAccount] = useMutation(
    CREATE_ACCOUNT,
    {
      onCompleted({ createAccount }) {
        // Account 생성에 성공한 경우
        setCurrentAccountHandler(createAccount.account);
        history.push('/change_user');
      }
    });

  const history = useHistory();

  useEffect(() => {
    let flag = true;
    if(flag) {
      auth.onAuthStateChanged((firebaseAccount) => {
        if(!firebaseAccount) {
          removeTokenHandler();
          signOutHandler();
          history.push('/');
        }else if(!!(firebaseAccount?.email)){
          signInHandler(firebaseAccount)
          firebaseAccount.getIdToken(true).then(function(idToken) {
            setTokenHandler(idToken);
            createAccount({
              variables: {
                identifier: firebaseAccount.uid,
                providerId: firebaseAccount.providerData[0].providerId,
                displayName: firebaseAccount.displayName,
                email: firebaseAccount.email,
              },
            });
          });
        }
      });
    }
  }, []);

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
          <SocialServiceButton onClick={signInWithGoogle}>
            <b><font color="blue">G</font>
            <font color="red">o</font>
            <font color="orange">o</font>
            <font color="blue">g</font>
            <font color="green">l</font>
            <font color="red">e</font></b>
            </SocialServiceButton>&nbsp;
          <SocialServiceButton  onClick={signInWithGithub}>
            <b>GitHub</b>
          </SocialServiceButton>
        </p>
      </SignIn>
    </Home>
  )
}

function dispatchToProps(dispatch) {
  return {
    signInHandler: (account) => {
      dispatch(signIn(account));
    },
    signOutHandler: () => {
      dispatch(signOut());
    },
    setTokenHandler: (value) => {
      dispatch(setToken({ kind: 'account', value }))
      localStorage.setItem('kind', 'account')
      localStorage.setItem('token', value)
    },
    removeTokenHandler: () => {
      dispatch(removeToken())
      localStorage.setItem('kind', null)
      localStorage.setItem('token', null)
    },
    setCurrentAccountHandler: (account) => {
      dispatch(setCurrentAccount(account));
    }
  }
}

export default connect(null, dispatchToProps)(Page);