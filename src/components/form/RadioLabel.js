import styled from 'styled-components/macro'
import { colors } from '../../style'

const RadioLabel = styled.label`
  span {
    position: relative;
    display: inline-block;
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.8rem;
    border-radius: 50%;
    cursor: pointer;

    &::before {
      content: '';
      display: none;
      position: absolute;
      top: -0.5rem;
      left: -0.5rem;
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      border: 2px solid ${colors.light2};
    }

    &:hover::before {
      display: block;
    }
  }

  input {
    opacity: 0;
    width: 0px;
    height: 0px;

    &:focus + span::before {
      display: block;
    }
  }
`

export default RadioLabel
