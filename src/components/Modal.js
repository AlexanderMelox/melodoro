import React, { useRef } from 'react'
import styled from 'styled-components/macro'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { IconButton } from './Buttons'
import colors from '../style/colors'
import closeIcon from '../assets/icon-close.svg'
import useClickOutside from '../hooks/useClickOutside'
import { H4 } from './Headings'

// portal query selector
const modalRoot = document.getElementById('modal-root')

const variants = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: 'beforeChildren' } },
    close: { opacity: 0 },
  },
  modal: {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, y: 0 },
    close: { opacity: 0, y: 100 },
  },
}

const Modal = ({ open = false, closeModal }) => {
  const modalRef = useRef()

  // closes the modal if clicked outside of it
  useClickOutside({ ref: modalRef, condition: open }, () => {
    closeModal()
  })

  return createPortal(
    <AnimatePresence>
      {open && (
        <ModalBackdrop
          initial="hidden"
          animate="visible"
          exit="close"
          variants={variants.backdrop}
        >
          <ModalContainer ref={modalRef} variants={variants.modal}>
            <ModalHeader>
              <ModalTitle>Settings</ModalTitle>
              <IconButton onClick={closeModal}>
                <img src={closeIcon} alt="Close modal" />
              </IconButton>
            </ModalHeader>
            <ModalBody>
              <ModalSection>
                <H4 $align="center">Time (minutes)</H4>
              </ModalSection>
            </ModalBody>
          </ModalContainer>
        </ModalBackdrop>
      )}
    </AnimatePresence>,
    modalRoot
  )
}

const ModalBackdrop = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
`

const ModalContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 90%;
  min-height: 54.9rem;
  max-width: 54rem;
  margin-top: 4.6rem;
  border-radius: 1.5rem;
  background-color: ${colors.light1};
`

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.4rem;
  border-bottom: 1px solid ${colors.borders.gray1};
`

const ModalTitle = styled.h2`
  font-weight: bold;
  font-size: 2rem;
  color: ${colors.dark2};
`

const ModalBody = styled.div`
  padding: 2.4rem;
`

const ModalSection = styled.div`
  padding-bottom: 2.4rem;
  border-bottom: 1px solid ${colors.borders.gray1};
`

export default Modal
