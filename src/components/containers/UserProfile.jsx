import React, { useEffect, useState, useRef, useCallback } from 'react';
import { AlignCenterWrapper, AlignLeft } from '../../styles'
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown'
import { GearIcon, XIcon } from '@primer/octicons-react'

const Container = () => {
  const dummy_user = {
    id: 0,
    name: '또치',
    comment: `
## 한줄 자기소개 타이틀

한줄 자기소개는 이러하다.

### 두줄 자기소개 타이틀

두줄 자기소개는

이러하다. 자기소개란 단어를 계속보니까 기분이 뭔가 이상하다.
    `
  }

  const inputRef = useRef();
  const [comment, setComment] = useState(dummy_user.comment);


  const UserProfile = styled.div`
    padding: 8px;
  `

  const UserComment = styled.div`
  `;

  const [mode, setMode] = useState('not changed');
  
  const changeMode = (_mode) => {
    if(_mode === 'not changed' && inputRef.current.value !== dummy_user.comment){
      if(!window.confirm('수정된 프로필이 파기됩니다!! 괜찮아요?')){
        return;
      }
    }
    setMode(_mode);  
    if(inputRef && inputRef.current){
      inputRef.current.focus();
    }
  }

  const onChangeComment = useCallback((e) => {
    setComment(e.target.value);
  }, [setComment]);

  return (
    <>
      <UserProfile>
        {mode}
        <div style={{textAlign: 'right'}}>
          { mode === 'not changed' ?
            <span onClick={() => changeMode('edit')}><GearIcon size={16} /></span>
          : <span onClick={() => changeMode('not changed')}><XIcon size={16} /></span>
          }
        </div>
        <h2>{dummy_user.name}</h2>
        <UserComment>
          { mode === 'edit' ? 
            <div>
              <textarea defaultValue={comment} onChange={onChangeComment} style={{width: '100%', height: '300px'}}></textarea>
              <input type="button" onClick={() => changeMode('preview')} value="미리보기"></input>
            </div>
          : <div>
              <ReactMarkdown source={dummy_user.comment} />
              { mode === 'preview' && <input type="button" onClick={() => changeMode('edit')} value="계속해서 수정하기"></input> }
            </div>
          }
        </UserComment>
        {mode !== 'not changed' && <input type="button" value="저장하기" disabled={inputRef?.current?.value === dummy_user.comment ? true: false}></input>}
      </UserProfile>
    </>
  );
}

export default React.memo(Container);