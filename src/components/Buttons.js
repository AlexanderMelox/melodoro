import styled from 'styled-components/macro'
import { colors } from '../style'

const buttonReset = `
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  cursor: pointer;

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

export const Button = styled.button`
  ${buttonReset}
  padding: 1.7rem 4.7rem;
  font-size: 1.6rem;
  border-radius: 26.5rem;
`

export const PrimaryButton = styled(Button)`
  background-color: ${colors.primary1};
  color: ${colors.light1};
`

export const IconButton = styled.button`
  ${buttonReset}
`
