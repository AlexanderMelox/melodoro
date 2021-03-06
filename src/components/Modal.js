import React, {
  useRef,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react'
import styled from 'styled-components/macro'
import { rgba } from 'polished'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { IconButton, PrimaryButton } from './Buttons'
import { colors } from '../style'
import closeIcon from '../assets/icon-close.svg'
import checkIcon from '../assets/icon-check.svg'
import useClickOutside from '../hooks/useClickOutside'
import { H4 } from './Headings'
import { KUMBH_SANS, ROBOTO_SLAB, SPACE_MONO } from '../constants'
import { RadioGroup, RadioLabel, NumberInput, NumberInputWrapper } from './form'
import { fontTypeToCSSFontFamily } from '../utils'
import { SettingsContext } from '../contexts/SettingsContext'
import { breakpoints } from '../style'

// portal query selector
const modalRoot = document.getElementById('modal-root')

const variants = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    close: {
      opacity: 0,
    },
  },
  modal: {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2 },
    },
    close: {
      opacity: 0,
      y: 100,
      transition: { when: 'afterChildren', staggerChildren: 0.1 },
    },
  },
  modalSection: {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  },
}

// To map over and create the font radio buttons
const fontOptions = [KUMBH_SANS, ROBOTO_SLAB, SPACE_MONO]

// To map over and create the color radio buttons
const colorOptions = ['primary1', 'primary2', 'primary3']

const Modal = ({ open = false, closeModal }) => {
  const modalRef = useRef()
  const [{ timer, font, color }, actions] = useContext(SettingsContext)

  const [selectedFont, setSelectedFont] = useState(font)
  const [selectedColor, setSelectedColor] = useState(color)

  const [timeInputs, setTimeInputs] = useState({
    pomodoro: timer.pomodoro,
    shortBreak: timer.shortBreak,
    longBreak: timer.longBreak,
  })

  const onTimerInputChange = useCallback(
    ({ target: { value, name } }) => {
      setTimeInputs({
        ...timeInputs,
        [name]: value ? parseInt(value) : value,
      })
    },
    [timeInputs, setTimeInputs]
  )

  // closes the modal if clicked outside of it
  useClickOutside({ ref: modalRef, condition: open }, () => {
    closeModal()
  })

  const onFontSelection = useCallback(
    (event) => setSelectedFont(event.target.value),
    []
  )

  const onColorSelection = useCallback(
    (event) => setSelectedColor(event.target.value),
    []
  )

  // runs when you submit the modal
  const applyChanges = (event) => {
    event.preventDefault()
    actions.setSettings((prev) => ({
      ...prev,
      timer: {
        pomodoro: timeInputs.pomodoro,
        shortBreak: timeInputs.shortBreak,
        longBreak: timeInputs.longBreak,
      },
      font: selectedFont,
      color: selectedColor,
    }))
    closeModal()
  }

  const resetValues = useCallback(() => {
    setTimeInputs({
      pomodoro: timer.pomodoro,
      shortBreak: timer.shortBreak,
      longBreak: timer.longBreak,
    })
    setSelectedFont(font)
    setSelectedColor(color)
  }, [timer, color, font])

  useEffect(() => resetValues(), [open, resetValues])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    }
    return () => (document.body.style.overflow = 'initial')
  }, [open])

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
              <form onSubmit={applyChanges}>
                <ModalSection variants={variants.modalSection}>
                  <ModalSectionTitle>Time (minutes)</ModalSectionTitle>
                  <NumberInputWrapper>
                    <NumberInput
                      value={timeInputs.pomodoro}
                      onChange={onTimerInputChange}
                      setValue={setTimeInputs}
                      name="pomodoro"
                    />
                    <NumberInput
                      value={timeInputs.shortBreak}
                      onChange={onTimerInputChange}
                      setValue={setTimeInputs}
                      name="shortBreak"
                    />
                    <NumberInput
                      value={timeInputs.longBreak}
                      onChange={onTimerInputChange}
                      setValue={setTimeInputs}
                      name="longBreak"
                    />
                  </NumberInputWrapper>
                </ModalSection>
                <ModalSection variants={variants.modalSection} $inline>
                  <ModalSectionTitle>Font</ModalSectionTitle>
                  <RadioGroup onChange={onFontSelection}>
                    {fontOptions.map((font) => (
                      <FontRadioLabel
                        key={font}
                        $font={font}
                        $selected={font === selectedFont}
                        htmlFor={font}
                      >
                        <input
                          id={font}
                          defaultChecked={font === selectedFont}
                          type="radio"
                          value={font}
                          name="font"
                        />
                        <span>Aa</span>
                      </FontRadioLabel>
                    ))}
                  </RadioGroup>
                </ModalSection>
                <ModalSection variants={variants.modalSection} $inline>
                  <ModalSectionTitle>Color</ModalSectionTitle>
                  <RadioGroup onChange={onColorSelection}>
                    {colorOptions.map((color) => (
                      <ColorRadioLabel
                        key={color}
                        $color={color}
                        htmlFor={color}
                      >
                        <input
                          id={color}
                          defaultChecked={color === selectedColor}
                          type="radio"
                          value={color}
                          name="color"
                        />

                        <span>
                          {color === selectedColor && (
                            <img src={checkIcon} alt="color selected" />
                          )}
                        </span>
                      </ColorRadioLabel>
                    ))}
                  </RadioGroup>
                </ModalSection>
                <SubmitButton type="submit">Apply</SubmitButton>
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
  z-index: 9000;
`

const ModalContainer = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-height: 54.9rem;
  max-width: 54rem;
  margin-top: 4.6rem;
  border-radius: 1.5rem;
  background-color: ${colors.light1};
  z-index: 5;

  ${breakpoints.tablet} {
    align-self: center;
    margin-top: -2.6rem;
  }
`

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.4rem;
  border-bottom: 1px solid ${colors.borders.gray1};

  ${breakpoints.tablet} {
    padding: 3.4rem 4rem 2.5rem;
  }
`

const ModalTitle = styled.h2`
  font-weight: bold;
  font-size: 2rem;
  color: ${colors.dark2};

  ${breakpoints.tablet} {
    font-size: 2.8rem;
  }
`

const ModalBody = styled.div`
  padding: 2.4rem;
  position: relative;

  ${breakpoints.tablet} {
    padding: 2.4rem 4rem;
  }
`

const ModalSection = styled(motion.div)`
  padding-bottom: 2.4rem;

  &:not(&:last-of-type) {
    border-bottom: 1px solid ${colors.borders.gray1};
    margin-bottom: 2.4rem;
  }

  ${(props) =>
    props.$inline &&
    `
    ${breakpoints.tablet} {
      display: flex;
      justify-content: space-between;
      align-items: center;

      ${ModalSectionTitle} {
        margin: 0;
      }
    }
  `}
`

const ModalSectionTitle = styled(H4)`
  text-align: center;
  margin-bottom: 1.6rem;

  ${breakpoints.tablet} {
    font-size: 1.3rem;
    text-align: left;
    margin-bottom: 2.3rem;
  }
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

const ColorRadioLabel = styled(RadioLabel)`
  span {
    background-color: ${({ $color }) => colors[$color]};
  }
`

const SubmitButton = styled(PrimaryButton)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
`

export default Modal
