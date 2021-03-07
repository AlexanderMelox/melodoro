import styled from 'styled-components/macro'
import { H2 } from './Headings'
import { breakpoints } from '../style'

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: header;

  ${H2} {
    font-size: 2.4rem;

    ${breakpoints.tablet} {
      font-size: 3.2rem;
    }
  }

  /* media queries for tablet */
  ${breakpoints.tablet} {
    align-items: flex-start;
    padding-top: 8rem;
  }

  /* media queries for desktop */
  ${breakpoints.tablet} {
    align-items: center;
    padding: 0;
  }
`

export default Header
