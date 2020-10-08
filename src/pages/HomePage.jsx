import React from 'react';
import { Home } from '../styles/Home';
import SignIn from '../components/containers/SignIn';

const Page = () => {
  return(
    <Home>
      <SignIn />
    </Home>
  )
}

export default React.memo(Page);