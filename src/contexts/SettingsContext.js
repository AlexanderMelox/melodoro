import { createContext, useCallback, useState, useEffect } from 'react'
import ls from 'local-storage'
import { KUMBH_SANS } from '../constants'

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
  const [settings, setSettings] = useState(() => {
    const settingsFromLS = ls.get('settings')

    return settingsFromLS !== null ? settingsFromLS : defaultSettings
  })

  const setSelectedTimer = useCallback(
    (selectedTimer) => setSettings({ ...settings, selectedTimer }),
    [settings, setSettings]
  )

  const actions = {
    setSelectedTimer,
    setSettings,
  }

  useEffect(() => setSettings(ls.get('settings')), [])

  useEffect(() => {
    ls.set('settings', settings)
  }, [settings])

  return (
    <SettingsContext.Provider value={[settings, actions]}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider
