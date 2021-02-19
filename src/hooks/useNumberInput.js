import React, { useCallback, useState } from 'react'
import NumberInput from '../components/form/NumberInput'
import FormGroup from '../components/form/FormGroup'
import FormLabel from '../components/form/FormLabel'

const useNumberInput = ({ initialValue = 0, name = '' }) => {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((event) => setValue(event.target.value))

  const Component = () => {
    return (
      <FormGroup>
        <FormLabel htmlFor={name}>{name}</FormLabel>
        <NumberInput
          id={name}
          type="number"
          value={value}
          onChange={onChange}
          name={name}
        />
      </FormGroup>
    )
  }

  return [Component, value]
}

export default useNumberInput
