import React, { useEffect } from 'react';

export default function ChannelWebSocker({cableApp, updateApp, channelId}){
  useEffect(() =>{
    cableApp.channel = cableApp.cable.subscriptions.create({
        channel: 'WorkspacesChannel',
        channel_id: channelId
    }, 
    {
        received: (updatedChannel) => {
          updateApp(updatedChannel)
        }
    })
  },[cableApp.cable.subscriptions, cableApp.channel, updateApp, channelId]);

  return (
      <div></div>
  )
}

