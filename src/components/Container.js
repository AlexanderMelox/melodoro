import styled from 'styled-components/macro'
import { breakpoints } from '../style'

const Container = styled.main`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 2.4rem 1fr 2.4rem;
  grid-template-rows: 10.1rem 6.3rem 42.7rem 1fr;
  grid-template-areas:
    '. header .'
    'navigation navigation navigation'
    '. timer .'
    '. settings .';

  ${breakpoints.tablet} {
    grid-template-rows: 16.7rem 6.3rem 66.3rem 13.1rem;
  }
`

export default Container
