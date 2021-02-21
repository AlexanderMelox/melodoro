import React, { useCallback, useState, useRef } from 'react'
import NumberInput from '../components/form/NumberInput'
import FormGroup from '../components/form/FormGroup'
import FormLabel from '../components/form/FormLabel'

const useNumberInput = ({ initialValue = 0, name = '' }) => {
  const inputRef = useRef()
  const [value, setValue] = useState(initialValue)

  const updateValue = useCallback((event) => {
    setValue(parseInt(event.target.value))
    setTimeout(() => {
      inputRef.current.focus()
    }, 0)
  }, [])

  const onBlur = useCallback(() => {
    if (isNaN(value)) {
      setValue(initialValue)
    }
  }, [value, initialValue])

  // Component that renders the number input
  const Component = () => {
    return (
      <FormGroup>
        <FormLabel htmlFor={name}>{name}</FormLabel>
        <NumberInput
          ref={inputRef}
          id={name}
          value={value}
          setValue={setValue}
          onChange={updateValue}
          onBlur={onBlur}
          name={name}
          min={0}
          max={60}
          step={1}
        />
      </FormGroup>
    )
  }

  return [Component, value]
}

export default useNumberInput
