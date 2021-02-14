import React, { useState } from 'react'
import GlobalStyle from './style/GlobalStyle'
import Container from './components/Container'
import Header from './components/Header'
import Nav from './components/Nav'
import Timer from './components/Timer'
import { H2 } from './components/Headings'
import Settings from './components/Settings'

// this will be replace from the settings modal
const timerMap = {
  pomodoro: 25,
  'short break': 5,
  'long break': 10,
}

function App() {
  const [selectedTimer, setSelectedTimer] = useState('pomodoro')

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <H2>melodoro</H2>
        </Header>
        <Nav
          selectedTimer={selectedTimer}
          setSelectedTimer={setSelectedTimer}
        />
        <Timer minutes={timerMap[selectedTimer]} />
        <Settings />
      </Container>
    </>
  )
}

export default App
