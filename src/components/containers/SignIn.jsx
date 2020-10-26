import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, signInWithGoogle, signInWithGithub } from '../../firebase/firebase.utils';
import { signOut, signIn } from '../../reducer/account.action';
import { setCurrentAccount } from '../../reducer/cache.action';
import SignIn from '../presenters/home/SignIn';
import { useCreateAccount } from '../../graphql/mutations';

const Page = ({ signOutHandler, signInHandler, setTokenHandler, removeTokenHandler }) => {
  const history = useHistory();

  const createAccount = useCreateAccount(() => {
    history.push('/change_user');
  }, { storeAction: true });

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
              identifier: firebaseAccount.uid,
              providerId: firebaseAccount.providerData[0].providerId,
              displayName: firebaseAccount.displayName,
              email: firebaseAccount.email,
            });
          });
        }
      });
    }
  }, [history, signInHandler, removeTokenHandler, signOutHandler, setTokenHandler, createAccount]);

  return(
    <SignIn
      signInWithGoogle={signInWithGoogle}
      signInWithGithub={signInWithGithub} />
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
      localStorage.setItem('kind', 'account')
      localStorage.setItem('token', value)
    },
    removeTokenHandler: () => {
      localStorage.setItem('kind', null)
      localStorage.setItem('token', null)
    }
  }
}

export default connect(null, dispatchToProps)(Page);