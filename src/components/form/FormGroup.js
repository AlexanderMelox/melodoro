import styled from 'styled-components/macro'

const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 0.8rem;
  }
`

export default FormGroup
