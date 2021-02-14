import React from 'react'
import styled from 'styled-components/macro'
import settingsIcon from '../assets/icon-settings.svg'
import { IconButton } from './Buttons'

const Settings = () => {
  return (
    <SettingsContainer>
      <SettingsIcon>
        <img src={settingsIcon} alt="Open settings modal" />
      </SettingsIcon>
    </SettingsContainer>
  )
}

const SettingsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  grid-area: settings;
`

const SettingsIcon = styled(IconButton)`
  padding: 1rem;
  background: none;
  border: none;
`

export default Settings
