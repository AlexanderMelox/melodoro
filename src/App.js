import React, { useContext } from 'react'
import GlobalStyle from './style/GlobalStyle'
import Container from './components/Container'
import Header from './components/Header'
import Nav from './components/Nav'
import Timer from './components/Timer'
import { H2 } from './components/Headings'
import Settings from './components/Settings'
import { SettingsContext } from './contexts/SettingsContext'

function App() {
  const [{ selectedTimer, timer, font, color }, actions] = useContext(
    SettingsContext
  )

  return (
    <>
      <GlobalStyle $selectedFont={font} $selectedColor={color} />
      <Container>
        <Header>
          <H2>melodoro</H2>
        </Header>
        <Nav
          selectedTimer={selectedTimer}
          setSelectedTimer={actions.setSelectedTimer}
        />
        <Timer minutes={timer[selectedTimer]} />
        <Settings />
      </Container>
    </>
  )
}

export default App
