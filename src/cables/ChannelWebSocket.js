import React, { useEffect, useState } from 'react';

export default function ChannelWebSocket({ cableApp, updateApp, channelId }){
  useEffect(() =>{
    let flag = true;
    
    if(flag && channelId){
      cableApp.channel = cableApp.cable.subscriptions.create({
          channel: 'WorkspacesChannel',
          channel_id: channelId
      }, 
      {
          received: (updatedChannel) => {
            updateApp(updatedChannel)
          }
      })
    }
    return function(){
      flag = false;
    }
  }, [channelId]);

  return (
      <div></div>
  )
}

