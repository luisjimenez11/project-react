import React, { lazy, Suspense } from 'react'
import Navbar from '../../components/Navbar'
import Container from 'react-bootstrap/Container'
const CharacterContainer = lazy (() => import('../../containers/CharacterContainer'))

const CharacterPage = () => (
  <>
    <Navbar />
    <Suspense fallback={<Container><h1>Loading…</h1></Container>}>
      <CharacterContainer />
    </Suspense>
  </>
)

export default CharacterPage