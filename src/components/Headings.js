import styled from 'styled-components/macro'
import colors from '../style/colors'

export const H1 = styled.h1`
  font-size: 8rem;
  letter-spacing: -0.4rem;
  line-height: 1.2;
`

export const H2 = styled.h2`
  font-size: 2.8rem;
  line-height: 1.2;

  text-align: center;
`

export const H4 = styled.h4`
  font-weight: bold;
  font-size: 1.1rem;
  letter-spacing: 0.5rem;
  color: ${colors.dark2};
  text-transform: uppercase;
  text-align: ${({ $align }) => $align || 'left'};
`
