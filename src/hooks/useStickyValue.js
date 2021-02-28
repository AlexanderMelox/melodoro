import { useState, useEffect } from 'react'
import ls from 'local-storage'

const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const stickyValue = ls.get(key)
    return stickyValue !== null ? stickyValue : defaultValue
  })

  useEffect(() => {
    ls.set(key, value)
  }, [key, value])

  return [value, setValue]
}

export default useStickyState
