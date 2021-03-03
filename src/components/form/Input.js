import styled from 'styled-components/macro'
import { colors, breakpoints } from '../../style'

const Input = styled.input`
  background-color: ${colors.light2};
  border: none;
  padding: 1.1rem 1.6rem;
  border-radius: 1rem;
  width: 14rem;
  font: inherit;
  color: ${colors.dark1};
  font-size: 1.4rem;

  &[type='number'] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  ${breakpoints.tablet} {
    padding: 1.8rem 1.6rem 1.5rem;
  }
`

export default Input
