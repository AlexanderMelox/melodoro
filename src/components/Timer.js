import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from 'react'
import styled, { css } from 'styled-components/macro'
import colors from '../style/colors'
import { H1 } from './Headings'
import { minutesToMilliseconds, formatTime } from '../utils'
import { SettingsContext } from '../contexts/SettingsContext'
import { KUMBH_SANS, ROBOTO_SLAB, SPACE_MONO } from '../constants'

const SVGContainerSize = 267
const strokeWidth = 8
const radius = SVGContainerSize / 2 - strokeWidth * 2
const cx = SVGContainerSize / 2
const cy = SVGContainerSize / 2

const circumference = radius * 2 * Math.PI

const Timer = ({ minutes }) => {
  const [{ font }] = useContext(SettingsContext)

  // Converts the time from minutes to milliseconds
  const [startingMilliseconds, setStartingMilliSeconds] = useState(
    minutesToMilliseconds(minutes)
  )

  const [timerAction, setTimerAction] = useState('start')
  const [time, setTime] = useState(startingMilliseconds)

  // percent for circle progress bar
  const percent = (time / startingMilliseconds) * 100
  const offset = circumference - (percent / 100) * circumference

  // converts the time from milliseconds to a time format MM:SS
  const formattedTime = useMemo(() => formatTime(time), [time])

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timerAction !== 'start') {
        setTime((prevTime) => prevTime - 1000)
      }
    }, 1000)
    if (time <= 0) {
      setStartingMilliSeconds(minutesToMilliseconds(minutes))
      clearInterval(countdown)
      setTimerAction('restart')
    }
    return () => clearInterval(countdown)
  }, [timerAction, time, minutes])

  useEffect(() => {
    setTimerAction('start')
    setStartingMilliSeconds(minutesToMilliseconds(minutes))
    setTime(startingMilliseconds)
  }, [minutes, startingMilliseconds])

  const restart = useCallback(() => {
    setTime(startingMilliseconds)
    setTimerAction('start')
  }, [startingMilliseconds])

  const toggleTimerState = useCallback(() => {
    if (timerAction === 'start') {
      setTimerAction('pause')
    } else if (timerAction === 'restart') {
      restart()
    } else {
      setTimerAction('start')
    }
  }, [timerAction, restart])

  return (
    <OuterCircle>
      <InnerCircle>
        <SVG width={SVGContainerSize} height={SVGContainerSize}>
          <ProgressCircle
            r={radius}
            cx={cx}
            cy={cy}
            style={{ strokeDashoffset: offset }}
          />
        </SVG>
        <TimerContainer>
          <Time $font={font}>{formattedTime}</Time>
          <TimerAction
            onClick={toggleTimerState}
            $isStart={timerAction === 'start'}
          >
            {timerAction}
          </TimerAction>
        </TimerContainer>
      </InnerCircle>
    </OuterCircle>
  )
}

const flexCenter = `
  display: flex;
  justify-content: center;
  align-items: center;
`

export const OuterCircle = styled.div`
  ${flexCenter};
  width: 30rem;
  height: 30rem;
  grid-area: timer;
  border-radius: 50%;
  margin: 4.8rem auto 8rem;
  background-image: linear-gradient(to bottom right, #0e112a, #2e325a);
  box-shadow: -5rem -5rem 10rem 0 #272c5a, 5rem 5rem 10rem 0 #121530;
`

export const InnerCircle = styled.div`
  position: relative;
  ${flexCenter};
  width: 26.78rem;
  height: 26.78rem;
  border-radius: 50%;
  background-color: ${colors.dark2};
`

export const SVG = styled.svg``

export const ProgressCircle = styled.circle`
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke-width: ${strokeWidth};
  stroke: var(--selected-color);
  fill: transparent;
  stroke-linecap: round;
  stroke-dasharray: ${circumference} ${circumference};
  transition: all 100ms cubic-bezier(0, 0, 0.3, 1);
`

export const TimerContainer = styled.div`
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -35%);
`

const fontsStyleMap = {
  [KUMBH_SANS]: css``,
  [ROBOTO_SLAB]: css`
    letter-spacing: 0;
    transform: translateY(-1rem);
  `,
  [SPACE_MONO]: css`
    letter-spacing: -0.9rem;
    margin-right: 0.9rem;
    font-weight: normal;
    transform: translateY(-1rem);
  `,
}

export const Time = styled(H1)`
  font-family: var(--selected-font);
  ${({ $font }) => fontsStyleMap[$font]}
`

export const TimerAction = styled.span`
  display: inline-block;
  margin: 0.8rem 0;
  text-transform: uppercase;
  font-size: 1.4rem;
  font-family: var(--selected-font);

  letter-spacing: 1.3rem;
  /* 
    letter spacing adds extra space at the end, 
    so we offset it with a margin right of the same letter-spacing
   */
  margin-right: -1.3rem;
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      color: var(--selected-color);
    }
  }
`

export default Timer
