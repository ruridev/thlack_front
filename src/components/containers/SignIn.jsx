import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import { auth, signInWithGoogle, signInWithGithub } from '../../firebase/firebase.utils';
import { CREATE_ACCOUNT } from '../../queries'
import { signOut, signIn } from '../../reducer/account.action';
import { setCurrentAccount } from '../../reducer/cache.action';
import SignIn from '../presenters/home/SignIn';

const Page = ({ signOutHandler, signInHandler, setTokenHandler, removeTokenHandler, setCurrentAccountHandler }) => {
  const history = useHistory();

  const [createAccount] = useMutation(
    CREATE_ACCOUNT,
    {
      onCompleted({ createAccount }) {
        // Account 생성에 성공한 경우
        setCurrentAccountHandler(createAccount.account);
        history.push('/change_user');
      }
    });

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
    },
    setCurrentAccountHandler: (account) => {
      dispatch(setCurrentAccount(account));
    }
  }
}

export default connect(null, dispatchToProps)(Page);