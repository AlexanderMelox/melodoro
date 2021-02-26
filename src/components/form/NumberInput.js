import React, { useCallback, useRef } from 'react'
import styled from 'styled-components/macro'
import FormGroup from './FormGroup'
import FormLabel from './FormLabel'
import Input from './Input'

const NumberInput = ({
  value = 0,
  onChange = () => {},
  name = '',
  min = 0,
  max = 60,
  step = 1,
  setValue,
}) => {
  const startingValue = useRef(value)

  const increment = (event) => {
    event.stopPropagation()
    setValue((prev) => ({ ...prev, [name]: prev[name] + 1 }))
  }
  const decrement = (event) => {
    event.stopPropagation()
    setValue((prev) => ({ ...prev, [name]: prev[name] - 1 }))
  }

  const onBlur = useCallback(() => {
    if (!value) {
      setValue((prev) => ({ ...prev, [name]: startingValue.current }))
    }
  }, [value, name, setValue])

  return (
    <FormGroup>
      <FormLabel htmlFor={name}>{name}</FormLabel>
      <InputContainer>
        <Input
          type="number"
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          min={min}
          max={max}
          step={step}
        />
        <IconsContainer>
          <IconUp onClick={increment} />
          <IconDown onClick={decrement} />
        </IconsContainer>
      </InputContainer>
    </FormGroup>
  )
}

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
