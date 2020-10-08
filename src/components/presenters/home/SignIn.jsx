import React from 'react';
import SocialLogin from './SocialLogin';
import { SignIn } from '../../../styles/Home'

const Presenter = ({
  signInWithGoogle,
  signInWithGithub,
}) => {
  return(
    <SignIn>
      <div>
        <h1>Thlack</h1>
      </div> 
      <hr />
      <p>
        <SocialLogin
          signInWithGoogle={signInWithGoogle}
          signInWithGithub={signInWithGithub} />
      </p>
    </SignIn>
  )
}

export default React.memo(Presenter);