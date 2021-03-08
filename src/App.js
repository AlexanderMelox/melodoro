import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import GlobalStyle from './style/GlobalStyle'
import Container from './components/Container'
import Header from './components/Header'
import Nav from './components/Nav'
import Timer from './components/Timer'
import { H2 } from './components/Headings'
import Settings from './components/Settings'
import { SettingsContext } from './contexts/SettingsContext'

const variants = {
  container: {
    visible: { transition: { staggerChildren: 0.1 } },
  },
  fadeInTop: {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

const AnimatedHeader = motion(Header)
const AnimatedNav = motion(Nav)
const AnimatedTimer = motion(Timer)
const AnimatedSettings = motion(Settings)

function App() {
  const [{ selectedTimer, timer, font, color }, actions] = useContext(
    SettingsContext
  )

  return (
    <>
      <GlobalStyle $selectedFont={font} $selectedColor={color} />
      <Container
        initial="hidden"
        animate="visible"
        variants={variants.container}
      >
        <AnimatedHeader variants={variants.fadeInTop}>
          <H2>melodoro</H2>
        </AnimatedHeader>
        <AnimatedNav
          variants={variants.fadeInTop}
          selectedTimer={selectedTimer}
          setSelectedTimer={actions.setSelectedTimer}
        />
        <AnimatedTimer
          variants={variants.fadeInTop}
          minutes={timer[selectedTimer]}
        />
        <AnimatedSettings variants={variants.fadeIn} />
      </Container>
    </>
  )
}

export default App
