import styled from 'styled-components/macro'
import { breakpoints } from '../../style'

const NumberInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${breakpoints.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`

export default NumberInputWrapper
