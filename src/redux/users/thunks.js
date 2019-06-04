import {
  loginError,
  loginSuccess,
  loginRequest,
  addUserError,
  addUserRequest,
  addUserSuccess,
  loginOff
} from './index'

const uuidv1 = require('uuid/v1');

const fakeLogin = (email, password, state) => {
  const { users, userList } = state.users
  
  return userList.find(userId => {
    return (
      users[userId].email === email &&
      users[userId].password === password
    )
  })
}

const fakeAddUser = ({email, password, name, state}) => {
  const {
    users,
    userList
  } = state.users

  const emailExists = userList.some(uid => users[uid].email === email)

  const toReturn = {}

  if (!emailExists) {
    toReturn.newId = uuidv1()
  } else {
    toReturn.error = 'Ya existe este usuario.'
  }

  return toReturn
}

export const login = (email, password) => (dispatch, getState) => {
  dispatch(loginRequest())

  const userId = fakeLogin(email, password, getState())

  if (userId) {
    localStorage.setItem('userId', userId)
    dispatch(loginSuccess(userId))
  } else {
    dispatch(loginError('Password o email incorrecto'))
  }
}

export const addUser = ({email, password, name}) => (dispatch, getState) => {
  dispatch(addUserRequest())

  const response = fakeAddUser({
    email,
    password,
    name,
    state: getState()
  })

  const {
    error,
    newId
  } = response

  if (!error) {
    //localStorage.setItem('userId', newId)
    dispatch(addUserSuccess({
      id: newId,
      email,
      name,
      password
    }))
  } else {
    dispatch(addUserError(error))
  }
}
export const closeSesion = () => (dispatch, getState) => {
  localStorage.clear();
  dispatch(loginOff())
}
