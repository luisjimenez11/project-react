import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { loginSuccess as loginSuccessCreator } from '../../redux/users/'

const NotLoggedInRoute = props => {
  const {
    loggedIn,
    component: Component,
    setUserId,
    ...rest
  } = props

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (userId && !loggedIn) {
      setUserId(userId)
    }
  }, [])

  return (
    <Route
      {...rest}
      render={props => {
        if (loggedIn || userId) {
          return <Redirect to='/project-react' />
        } else {
          return <Component {...props} />
        }
      }}
    />
  )
}

const msp = state => {
  const {
    loggedIn
  } = state.users

  return {
    loggedIn
  }
}

const mdp = {
  setUserId: loginSuccessCreator
}

export default connect(msp, mdp)(NotLoggedInRoute)
