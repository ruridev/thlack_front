import styled from 'styled-components';

const LinkDiv = styled.div`
  cursor: pointer;

  :hover{
    text-decoration: underline dotted navy;
  }

  @media (max-width: 768px) {
    font-size: 16px !important;
  }
`

const LinkButton = styled.a`
  cursor: pointer;

  margin: 4px; 

  :hover{
    text-decoration: underline dotted navy;
  }

  @media (max-width: 768px) {
    font-size: 16px !important;
  }
`
const SmallLinkButton = styled(LinkButton)`
  font-size: small;
`

const InputTextBox = styled.input`
  border: 1px solid #cccccc;
  margin: 4px;
  
  @media (max-width: 768px) {
    font-size: 16px !important;
  }
`

const SubmitButton = styled.button`
  margin: 4px;
`

const ListPopup = styled.div`
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 4px;
  max-width: 500px;
  max-height: 500px;
  overflow: auto;
  box-shadow: 8px 8px 0px 0 rgba(0, 0, 0, .5);

  div {
    margin: 4px;
  }
`

export { 
  LinkDiv,
  LinkButton, 
  InputTextBox,
  SubmitButton,
  SmallLinkButton,
  ListPopup,
};