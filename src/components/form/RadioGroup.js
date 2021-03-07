import styled from 'styled-components/macro'
import { breakpoints } from '../../style'

const RadioGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${breakpoints.tablet} {
    justify-content: flex-end;
  }
`

export default RadioGroup
