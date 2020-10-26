import React, { useEffect } from 'react';
import { useGetAccount, useLoginUser } from '../graphql/queries';

const Page = () => {
  const getAccount = useGetAccount(() => {
  }, { storeAction: true });
  const getLoginUser = useLoginUser(() => {
  }, { storeAction: true });

  useEffect(() => {
    let flag = true;

    if(flag){
      let tokenKind = localStorage.getItem('kind');
      if(tokenKind === 'account') {
        async function f(){
          await getAccount();
        }
        f();
      }

      tokenKind = localStorage.getItem('kind');

      if(tokenKind === 'user') {
        async function f(){
          await getLoginUser();
        }
        f();
      }
    }

    return function() {
      flag = false;
    }
  }, [getAccount, getLoginUser]);

  return <></>;
}

export default React.memo(Page);