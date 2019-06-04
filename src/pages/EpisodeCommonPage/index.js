import React, { lazy, Suspense } from 'react'
import Navbar from '../../components/Navbar'
import Container from 'react-bootstrap/Container'  
const EpisodeCommonContainer = lazy (() => import('../../containers/EpisodeCommonContainer'))

const EpisodeCommonPage = () => (
  <>
    <Navbar />
    <Suspense fallback={<Container><h1>Loading…</h1></Container>}>
      <EpisodeCommonContainer />
    </Suspense>
  </>
)

export default EpisodeCommonPage