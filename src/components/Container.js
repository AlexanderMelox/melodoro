import styled from 'styled-components'

const Container = styled.main`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-columns: 2.4rem 1fr 2.4rem;
  grid-template-rows: 10.1rem 6.3rem 1fr 7.6rem;
  grid-template-areas:
    '. header .'
    '. navigation .'
    '. timer .'
    '. settings .';
`

export default Container
