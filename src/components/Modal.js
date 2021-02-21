import React, { useRef, useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import { rgba } from 'polished'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { IconButton } from './Buttons'
import { colors } from '../style'
import closeIcon from '../assets/icon-close.svg'
import useClickOutside from '../hooks/useClickOutside'
import useNumberInput from '../hooks/useNumberInput'
import { H4 } from './Headings'
import { KUMBH_SANS, ROBOTO_SLAB, SPACE_MONO } from '../constants'
import { RadioGroup, RadioLabel } from './form'
import { fontTypeToCSSFontFamily } from '../utils'

// portal query selector
const modalRoot = document.getElementById('modal-root')

const variants = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    close: { opacity: 0 },
  },
  modal: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    close: { opacity: 0, y: 100 },
  },
}

// To map over and create the font radio buttons
const fontOptions = [KUMBH_SANS, ROBOTO_SLAB, SPACE_MONO]

const Modal = ({ open = false, closeModal }) => {
  const modalRef = useRef()
  const [selectedFont, setSelectedFont] = useState(KUMBH_SANS)

  // TODO: switch these initial values to a global state
  const [PomodoroInput, pomodoroTime] = useNumberInput({
    name: 'pomodoro',
    initialValue: 25,
  })
  const [ShortBreakInput, shortBreakTime] = useNumberInput({
    name: 'short break',
    initialValue: 5,
  })
  const [LongBreakInput, longBreakTime] = useNumberInput({
    name: 'long break',
    initialValue: 15,
  })

  // closes the modal if clicked outside of it
  useClickOutside({ ref: modalRef, condition: open }, () => {
    closeModal()
  })

  const onFontSelection = useCallback(
    (event) => setSelectedFont(event.target.value),
    []
  )

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
              <form>
                <ModalSection>
                  <H4 $align="center" $mb="1.6rem">
                    Time (minutes)
                  </H4>
                  <PomodoroInput />
                  <ShortBreakInput />
                  <LongBreakInput />
                </ModalSection>
                <ModalSection>
                  <H4 $align="center" $mb="1.6rem">
                    Font
                  </H4>
                  <RadioGroup onChange={onFontSelection}>
                    {fontOptions.map((font, i) => (
                      <FontRadioLabel
                        key={font}
                        $font={font}
                        $selected={font === selectedFont}
                        htmlFor={font}
                      >
                        <input
                          id={font}
                          defaultChecked={i === 0}
                          type="radio"
                          value={font}
                          name="font"
                        />
                        <span>Aa</span>
                      </FontRadioLabel>
                    ))}
                  </RadioGroup>
                </ModalSection>
              </form>
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
  margin-bottom: 2.4rem;
  border-bottom: 1px solid ${colors.borders.gray1};
`

const FontRadioLabel = styled(RadioLabel)`
  span {
    font-size: 1.5rem;
    font-weight: normal;
    font-family: ${({ $font }) => fontTypeToCSSFontFamily($font)};
    background-color: ${({ $selected }) =>
      $selected ? colors.dark2 : colors.light2};
    color: ${({ $selected }) =>
      $selected ? colors.light1 : rgba(colors.dark1, 0.73)};
  }
`

export default Modal
