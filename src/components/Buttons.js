import styled from 'styled-components/macro'

const buttonReset = `
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;

  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;

  line-height: normal;

  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  -webkit-appearance: none;

  &:focus {
    outline: none;
    border: none;
  }
`

export const IconButton = styled.button`
  ${buttonReset};
`
