import React from 'react'
import styled from 'styled-components'
import colors from '../style/colors'

const SVGContainerSize = 267
const strokeWidth = 8
const radius = SVGContainerSize / 2 - strokeWidth * 2
const cx = SVGContainerSize / 2
const cy = SVGContainerSize / 2

const circumference = radius * 2 * Math.PI
const percent = 50
const offset = circumference - (percent / 100) * circumference

const Timer = () => {
  return (
    <OuterCircle>
      <InnerCircle>
        <SVG width={SVGContainerSize} height={SVGContainerSize}>
          <ProgressCircle r={radius} cx={cx} cy={cy} />
        </SVG>
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
  stroke-dashoffset: ${offset};
`

export default Timer