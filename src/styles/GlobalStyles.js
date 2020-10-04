import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.color};
    transition: all 0.50s linear;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  button {
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.color};
    border: 1px solid ${({ theme }) => theme.borderColor};
  }

  a {
    color: ${({ theme }) => theme.color};
    text-decoration: none;
    
    :hover {
      text-decoration: underline;
    }
  }

  hr {
    border: 1px solid ${({ theme }) => theme.borderColor};
  }

  input[type=text] {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.color};
    border:  1px solid ${({ theme }) => theme.borderColor};
  }
`