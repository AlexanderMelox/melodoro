import { useContext } from 'react'
import styled from 'styled-components/macro'
import { rgba, setLightness } from 'polished'
import colors from '../style/colors'
import { SettingsContext } from '../contexts/SettingsContext'

const timers = ['pomodoro', 'shortBreak', 'longBreak']
const timerMap = {
  pomodoro: 'pomodoro',
  shortBreak: 'short break',
  longBreak: 'long break',
}

const Nav = ({ selectedTimer, setSelectedTimer }) => {
  const [{ color }] = useContext(SettingsContext)

  return (
    <NavContainer>
      <NavList>
        {timers.map((timer) => (
          <NavListItem
            key={timer}
            $active={timer === selectedTimer}
            $color={color}
            onClick={() => setSelectedTimer(timer)}
          >
            {timerMap[timer]}
          </NavListItem>
        ))}
      </NavList>
    </NavContainer>
  )
}

export const NavContainer = styled.nav`
  position: relative;
  min-width: 32.7rem;
  height: 6.3rem;
  background-color: ${colors.dark2};
  border-radius: 3.15rem;
  grid-area: navigation;
  padding: 0.8rem 0.6rem;
  margin: 0 auto;
  font-family: var(--selected-font);
`

export const NavList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
`

export const NavListItem = styled.li`
  padding: 1.7rem 2.3rem;
  font-size: 1.2rem;
  background-color: ${({ $active, $color }) =>
    $active ? colors[$color] : 'transparent'};
  color: ${({ $active }) =>
    $active ? colors.dark1 : rgba(colors.primary4, 0.4)};
  border-radius: 2.65rem;
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      background-color: ${({ $active, $color }) =>
        $active ? setLightness(0.8, colors[$color]) : 'transparent'};
    }
  }
`

export default Nav
