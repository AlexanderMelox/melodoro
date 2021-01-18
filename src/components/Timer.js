import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components/macro'
import colors from '../style/colors'
import { H1 } from './Headings'
import { minutesToMilliseconds, formatTime } from '../utils'

const SVGContainerSize = 267
const strokeWidth = 8
const radius = SVGContainerSize / 2 - strokeWidth * 2
const cx = SVGContainerSize / 2
const cy = SVGContainerSize / 2

const circumference = radius * 2 * Math.PI

const Timer = () => {
  const startingMilliseconds = minutesToMilliseconds(25)
  const [time, setTime] = useState(startingMilliseconds)

  const percent = (time / startingMilliseconds) * 100
  const offset = circumference - (percent / 100) * circumference

  useEffect(() => {
    const countdown = setInterval(() => {
      setTime((prevTime) => prevTime - 1000)
    }, 1000)
    return () => clearInterval(countdown)
  }, [])

  const formattedTime = useMemo(() => formatTime(time), [time])

  return (
    <OuterCircle>
      <InnerCircle>
        <SVG width={SVGContainerSize} height={SVGContainerSize}>
          <ProgressCircle r={radius} cx={cx} cy={cy} $offset={offset} />
        </SVG>
        <TimerContainer>
          <Time>{formattedTime}</Time>
          <TimerAction>pause</TimerAction>
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
  margin: 4.8rem auto 0;
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
  stroke: ${colors.primary1};
  fill: transparent;
  stroke-linecap: round;
  stroke-dasharray: ${circumference} ${circumference};
  stroke-dashoffset: ${({ $offset }) => $offset};
`

export const TimerContainer = styled.div`
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -35%);
`

export const Time = styled(H1)``

export const TimerAction = styled.span`
  display: inline-block;
  margin: 0.8rem 0;
  text-transform: uppercase;
  font-size: 1.4rem;
  letter-spacing: 1.3rem;
  cursor: pointer;
`

export default Timer
