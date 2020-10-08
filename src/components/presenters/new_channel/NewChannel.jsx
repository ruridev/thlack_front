import React from 'react';
import { AlignCenterWrapper, AlignCenter } from '../../../styles';
import NewChannelInput from './NewChannelInput';

const Presenter = ({ currentWorkspaceName, createChannelHandler, inputRef }) => {
  return (
    <AlignCenterWrapper>
      <AlignCenter>
        <div>
          <h2>Create a channel in ”{currentWorkspaceName}”</h2>
          <NewChannelInput 
            createChannelHandler={createChannelHandler}
            inputRef={inputRef} />
        </div>
      </AlignCenter>
    </AlignCenterWrapper>);
}

export default React.memo(Presenter);