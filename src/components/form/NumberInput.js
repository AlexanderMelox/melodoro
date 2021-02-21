import { useCallback, forwardRef } from 'react'
import styled from 'styled-components/macro'
import Input from './Input'

const NumberInput = forwardRef(({ setValue, ...props }, ref) => {
  const increment = (event) => {
    event.stopPropagation()
    setValue((prev) => prev + 1)
  }
  const decrement = (event) => {
    event.stopPropagation()
    setValue((prev) => prev - 1)
  }

  return (
    <InputContainer>
      <Input ref={ref} type="number" {...props} />
      <IconsContainer>
        <IconUp onClick={increment} />
        <IconDown onClick={decrement} />
      </IconsContainer>
    </InputContainer>
  )
})

const IconUp = ({ ...props }) => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="14" height="7" {...props}>
    <path fill="none" stroke="#1E213F" strokeWidth="2" d="M1 6l6-4 6 4" />
  </SVG>
)

const IconDown = ({ ...props }) => (
  <SVG xmlns="http://www.w3.org/2000/svg" width="14" height="7" {...props}>
    <path fill="none" stroke="#1E213F" strokeWidth="2" d="M1 1l6 4 6-4" />
  </SVG>
)

const SVG = styled.svg`
  opacity: 0.25;
`

const InputContainer = styled.div`
  position: relative;

  :hover ${SVG} {
    opacity: 1;
  }
`

const IconsContainer = styled.div`
  position: absolute;
  top: 0.8rem;
  right: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 2rem;
  cursor: pointer;
`

export default NumberInput
