import { createContext, useCallback, useState } from 'react'
import { KUMBH_SANS } from '../constants'

// TODO: get this from local storage
const initialState = {
  timer: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 10,
  },
  selectedTimer: 'pomodoro',
  font: KUMBH_SANS,
  color: 'primary1',
}

export const SettingsContext = createContext()

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(initialState)

  const setSelectedTimer = useCallback(
    (selectedTimer) => setSettings({ ...settings, selectedTimer }),
    [settings, setSettings]
  )

  const actions = {
    setSelectedTimer,
    setSettings,
  }

  return (
    <SettingsContext.Provider value={[settings, actions]}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider
