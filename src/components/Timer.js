import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  useRef
} from 'react';
import styled, { css } from 'styled-components/macro';
import { motion } from 'framer-motion';
import colors from '../style/colors';
import { H1 } from './Headings';
import { minutesToMilliseconds, formatTime } from '../utils';
import { SettingsContext } from '../contexts/SettingsContext';
import { KUMBH_SANS, ROBOTO_SLAB, SPACE_MONO } from '../constants';
import { breakpoints, media } from '../style';

const useTimerMath = ({
  SVGContainerSize,
  time,
  startingMilliseconds,
  strokeWidth = 8,
  addToRadius = 0
}) => {
  const radius = useMemo(
    () => SVGContainerSize / 2 - strokeWidth * 2 + addToRadius,
    [SVGContainerSize, strokeWidth, addToRadius]
  );
  const cx = useMemo(() => SVGContainerSize / 2, [SVGContainerSize]);
  const cy = useMemo(() => SVGContainerSize / 2, [SVGContainerSize]);
  const circumference = useMemo(() => radius * 2 * Math.PI, [radius]);
  // percent for circle progress bar
  const percent = useMemo(
    () => (time / startingMilliseconds) * 100,
    [time, startingMilliseconds]
  );
  const offset = useMemo(
    () => circumference - (percent / 100) * circumference,
    [circumference, percent]
  );

  return {
    SVGContainerSize,
    strokeWidth,
    radius,
    cx,
    cy,
    circumference,
    percent,
    offset
  };
};

const ProgressCircleSmall = ({ time, startingMilliseconds }) => {
  const {
    SVGContainerSize,
    strokeWidth,
    radius,
    cx,
    cy,
    circumference,
    offset
  } = useTimerMath({ SVGContainerSize: 267, time, startingMilliseconds });

  return (
    <SVG width={SVGContainerSize} height={SVGContainerSize}>
      <StyledProgressCircle
        r={radius}
        cx={cx}
        cy={cy}
        style={{
          strokeDashoffset: offset,
          strokeWidth,
          strokeDasharray: `${circumference} ${circumference}`
        }}
      />
    </SVG>
  );
};

const ProgressCircleLarge = ({ time, startingMilliseconds }) => {
  const {
    SVGContainerSize,
    strokeWidth,
    radius,
    cx,
    cy,
    circumference,
    offset
  } = useTimerMath({
    SVGContainerSize: 339,
    time,
    startingMilliseconds,
    strokeWidth: 11,
    addToRadius: 15
  });

  return (
    <SVG width={SVGContainerSize} height={SVGContainerSize}>
      <StyledProgressCircle
        r={radius}
        cx={cx}
        cy={cy}
        style={{
          strokeDashoffset: offset,
          strokeWidth,
          strokeDasharray: `${circumference} ${circumference}`
        }}
      />
    </SVG>
  );
};

const Timer = React.forwardRef(({ minutes }, ref) => {
  const [{ font }] = useContext(SettingsContext);
  let audio = useRef(new Audio('/alarm-kitchen.mp3'));

  const [isLargerThan768, setIsLargerThan768] = useState(
    window.matchMedia(media.tablet).matches
  );

  // Converts the time from minutes to milliseconds
  const [startingMilliseconds, setStartingMilliSeconds] = useState(
    minutesToMilliseconds(minutes)
  );

  const [timerAction, setTimerAction] = useState('start');
  const [time, setTime] = useState(startingMilliseconds);

  // converts the time from milliseconds to a time format MM:SS
  const formattedTime = useMemo(() => formatTime(time), [time]);

  // play the alarm
  const playSound = useCallback(() => {
    audio.current.play();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timerAction !== 'start') {
        setTime(prevTime => prevTime - 1000);
      }
    }, 1000);
    if (time <= 0) {
      setStartingMilliSeconds(minutesToMilliseconds(minutes));
      clearInterval(countdown);
      setTimerAction('restart');
      playSound();
    }
    return () => clearInterval(countdown);
  }, [timerAction, time, minutes, playSound]);

  useEffect(() => {
    setTimerAction('start');
    setStartingMilliSeconds(minutesToMilliseconds(minutes));
    setTime(startingMilliseconds);
  }, [minutes, startingMilliseconds]);

  const restart = useCallback(() => {
    setTime(startingMilliseconds);
    setTimerAction('start');
  }, [startingMilliseconds]);

  const toggleTimerState = useCallback(() => {
    if (timerAction === 'start') {
      setTimerAction('pause');
    } else if (timerAction === 'restart') {
      restart();
    } else {
      setTimerAction('start');
    }
  }, [timerAction, restart]);

  useEffect(() => {
    const onResize = () => {
      setIsLargerThan768(window.matchMedia(media.tablet).matches);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <OuterCircle ref={ref}>
      <InnerCircle>
        {isLargerThan768 ? (
          <ProgressCircleLarge
            time={time}
            startingMilliseconds={startingMilliseconds}
          />
        ) : (
          <ProgressCircleSmall
            time={time}
            startingMilliseconds={startingMilliseconds}
          />
        )}

        <TimerContainer>
          <Time $font={font}>{formattedTime}</Time>
          <TimerAction
            onClick={toggleTimerState}
            $isStart={timerAction === 'start'}
          >
            <motion.div whileHover={{ y: -3 }} whileTap={{ y: -2 }}>
              {timerAction}
            </motion.div>
          </TimerAction>
        </TimerContainer>
      </InnerCircle>
    </OuterCircle>
  );
});

const flexCenter = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OuterCircle = styled(motion.div)`
  ${flexCenter};
  width: 30rem;
  height: 30rem;
  grid-area: timer;
  border-radius: 50%;
  margin: 4.8rem auto 8rem;
  background-image: linear-gradient(to bottom right, #0e112a, #2e325a);
  box-shadow: -5rem -5rem 10rem 0 #272c5a, 5rem 5rem 10rem 0 #121530;

  ${breakpoints.tablet} {
    width: 41rem;
    height: 41rem;
    margin: 10.9rem auto 14.4rem;
  }

  ${breakpoints.tablet} {
    margin: 4.5rem auto 6.3rem;
  }
`;

export const InnerCircle = styled.div`
  position: relative;
  ${flexCenter};
  width: 26.78rem;
  height: 26.78rem;
  border-radius: 50%;
  background-color: ${colors.dark2};

  ${breakpoints.tablet} {
    width: 36.6rem;
    height: 36.6rem;
  }
`;

export const SVG = styled.svg``;

export const StyledProgressCircle = styled.circle`
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  stroke: var(--selected-color);
  fill: transparent;
  stroke-linecap: round;
  transition: all 100ms cubic-bezier(0, 0, 0.3, 1);
`;

export const TimerContainer = styled.div`
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -35%);
`;

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
  `
};

export const Time = styled(H1)`
  font-family: var(--selected-font);
  ${({ $font }) => fontsStyleMap[$font]}
  line-height: 1;

  ${breakpoints.tablet} {
    margin-bottom: 4.8rem;
    transform: translate(0, 1.6rem);
  }
`;

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

  ${breakpoints.tablet} {
    font-size: 1.6rem;
  }
`;

export default Timer;
