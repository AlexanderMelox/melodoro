import React, { useState } from 'react'
import GlobalStyle from './style/GlobalStyle'
import Container from './components/Container'
import Header from './components/Header'
import Nav from './components/Nav'
import Timer from './components/Timer'
import { H2 } from './components/Headings'

function App() {
  const [selectedTimer, setSelectedTimer] = useState('pomodoro')

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <H2>pomodoro</H2>
        </Header>
        <Nav
          selectedTimer={selectedTimer}
          setSelectedTimer={setSelectedTimer}
        />
        <Timer />
      </Container>
    </>
  )
}

export default App
