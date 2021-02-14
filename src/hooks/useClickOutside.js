import { useEffect } from 'react'

const useClickOutside = ({ ref, condition }, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target) && condition) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default useClickOutside
