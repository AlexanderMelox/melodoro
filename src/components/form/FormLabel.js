import styled from 'styled-components/macro'
import { colors, breakpoints } from '../../style'

const FormLabel = styled.label`
  font-weight: bold;
  font-size: 1.2rem;
  color: ${colors.dark1};
  opacity: 0.4;

  ${breakpoints.tablet} {
    margin-bottom: 0.8rem;
  }
`

export default FormLabel
