import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config = require('./config.json')

firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  appId: config.appId,
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

const githubProvider = new firebase.auth.GithubAuthProvider();
githubProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGithub = () => auth.signInWithPopup(githubProvider);

export default firebase;