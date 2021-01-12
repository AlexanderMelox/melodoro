import styled from 'styled-components'
import { rgba } from 'polished'
import colors from '../style/colors'

const timers = ['pomodoro', 'short break', 'long break']

const Nav = ({ selectedTimer, setSelectedTimer }) => {
  return (
    <NavContainer>
      <NavList>
        {timers.map((timer) => (
          <NavListItem
            $active={timer === selectedTimer}
            onClick={() => setSelectedTimer(timer)}
          >
            {timer}
          </NavListItem>
        ))}
      </NavList>
    </NavContainer>
  )
}

export const NavContainer = styled.nav`
  max-width: 32.7rem;
  height: 6.3rem;
  background-color: ${colors.dark2};
  border-radius: 3.15rem;
  grid-area: navigation;
  padding: 0.8rem 0.6rem;
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
  padding: 1.8rem 2.1rem 1.6rem;
  font-size: 1.2rem;
  background-color: ${({ $active }) =>
    $active ? colors.primary1 : 'transparent'};
  color: ${({ $active }) =>
    $active ? colors.dark1 : rgba(colors.primary4, 0.4)};
  border-radius: 2.65rem;
`

export default Nav
