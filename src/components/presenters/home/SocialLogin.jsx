import React from 'react';
import { SocialServiceButton } from '../../../styles/Home';

const Presenter = ({ signInWithGoogle, signInWithGithub }) => {
  return(<>
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
  </>);
}

export default React.memo(Presenter);