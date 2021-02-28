import { createContext, useCallback } from 'react'
import { KUMBH_SANS } from '../constants'
import useStickyValue from '../hooks/useStickyValue'

const defaultSettings = {
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
  const [settings, setSettings] = useStickyValue(defaultSettings, 'settings')

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
