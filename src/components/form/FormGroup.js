import styled from 'styled-components/macro'
import { breakpoints } from '../../style'

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 0.8rem;
  }

  ${breakpoints.tablet} {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 14rem;

    &:not(:last-of-type) {
      margin-bottom: 0;
    }
  }
`

export default FormGroup
