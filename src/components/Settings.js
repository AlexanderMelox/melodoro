import React, { useCallback, useState } from 'react'
import Modal from './Modal'
import styled from 'styled-components/macro'
import { motion } from 'framer-motion'
import settingsIcon from '../assets/icon-settings.svg'
import { IconButton } from './Buttons'

const Settings = () => {
  const [showModal, setShowModal] = useState(false)

  const openModal = useCallback(() => setShowModal(true), [])
  const closeModal = useCallback(() => setShowModal(false), [])

  return (
    <SettingsContainer>
      <SettingsIcon
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 60 }}
        whileTap={{ rotate: 360 }}
        onClick={openModal}
      >
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
  padding: 1rem 1rem 0.8rem;
  background: none;
  border: none;
`

export default Settings
