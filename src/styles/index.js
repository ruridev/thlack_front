import styled from 'styled-components';

const LinkDiv = styled.div`
  cursor: pointer;

  :hover{
    text-decoration: underline dotted navy;
    background-color: ${({ theme }) => theme.hoverBackground};
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
  color: ${({ theme }) => theme.color};
`

const InputTextBox = styled.input`
  border: 1px solid ${({ theme }) => theme.borderColor};
  margin: 4px;
  
  @media (max-width: 768px) {
    font-size: 16px !important;
  }
`

const SubmitButton = styled.button`
  margin: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.color};
`

const ListPopup = styled.div`
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  max-width: 500px;
  max-height: 500px;
  overflow: auto;
  box-shadow: 8px 8px 0px 0 ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.backgroundColor};

  div {
    margin: 4px;
  }
`

const TextArea = styled.textarea`
  width: calc(100% - 8px);
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.color};
  
  @media (max-width: 768px) {
    font-size: 16px !important;
  }

  :focus {
    outline: none;
}
`;


const AlignCenterWrapper = styled.div`
  display: grid;
  grid-template-areas: 
    ". . . ."
    ". ac ac ."
    ". . . .";
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  `

const AlignCenter = styled.div`
  grid-area: ac;
  text-align: center;
`


export { 
  LinkDiv,
  LinkButton, 
  InputTextBox,
  SubmitButton,
  SmallLinkButton,
  ListPopup,
  TextArea,
  AlignCenterWrapper,
  AlignCenter,
};