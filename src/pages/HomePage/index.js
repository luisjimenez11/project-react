import React, { lazy, Suspense } from 'react'
import Navbar from '../../components/Navbar'
import Container from 'react-bootstrap/Container'  
const EpisodeContainer = lazy (() => import('../../containers/EpisodeContainer'))


const HomePage = () => (
  <>
    <Navbar />
    <Suspense fallback={<Container><h1>Loading…</h1></Container>}>
      <EpisodeContainer />
    </Suspense>
  </>
)

export default HomePage