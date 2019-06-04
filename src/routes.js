import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './containers/PrivateRoute'
import NotLoggedInRoute from './containers/NotLoggedInRoute'
import HomePage from './pages/HomePage'
import CharacterPage from './pages/CharactersPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EpisodeCommonPage from './pages/EpisodeCommonPage'

const Routes = () => (
  <Router>
    <NotLoggedInRoute exact path='/register' component={RegisterPage} />
    <NotLoggedInRoute exact path='/login' component={LoginPage} />
    <PrivateRoute exact path='/' component={HomePage} />
    <PrivateRoute exact path='/characters/' component={CharacterPage} />
    <PrivateRoute exact path='/episodecommon/' component={EpisodeCommonPage} />
  </Router>
)
export default Routes