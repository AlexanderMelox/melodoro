import React, { useCallback, useState } from 'react'
import Modal from './Modal'
import styled from 'styled-components/macro'
import settingsIcon from '../assets/icon-settings.svg'
import { IconButton } from './Buttons'

const Settings = () => {
  const [showModal, setShowModal] = useState(false)

  const openModal = useCallback(() => setShowModal(true), [])
  const closeModal = useCallback(() => setShowModal(false), [])

  return (
    <SettingsContainer>
      <SettingsIcon onClick={openModal}>
        <img src={settingsIcon} alt="Open settings modal" />
      </SettingsIcon>
      <Modal open={showModal} closeModal={closeModal} />
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
