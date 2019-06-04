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
    <NotLoggedInRoute exact path='/project-react/register' component={RegisterPage} />
    <NotLoggedInRoute exact path='/project-react/login' component={LoginPage} />
    <PrivateRoute exact path='/project-react/' component={HomePage} />
    <PrivateRoute exact path='/project-react/characters/' component={CharacterPage} />
    <PrivateRoute exact path='/project-react/episodecommon/' component={EpisodeCommonPage} />
  </Router>
)
export default Routes