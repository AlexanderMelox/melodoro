import { createGlobalStyle } from 'styled-components/macro'
import colors from './colors'
import typography from './typography'

const { fonts } = typography

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    overflow: hidden;
    font-family:  ${fonts[0]};
    background-color: ${colors.dark1};
    color: ${colors.primary4};
    font-weight: bold;
  }
`

export default GlobalStyle
