import React from 'react'
import GlobalStyle from './style/GlobalStyle'
import Container from './components/Container'
import Header from './components/Header'
import { H2 } from './components/Headings'

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <H2>pomodoro</H2>
        </Header>
      </Container>
    </>
  )
}

export default App
