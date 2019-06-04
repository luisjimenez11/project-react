const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_ERROR = 'LOGIN_ERROR'

const LOGIN_OFF = 'LOGIN_OFF'

const ADD_USER_REQUEST = 'ADD_USER_REQUEST'
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'
const ADD_USER_ERROR = 'ADD_USER_ERROR'

const ADD_FAVORITE_EPISODE = 'ADD_FAVORITE_EPISODE'
const ADD_FAVORITE_CHARACTER = 'ADD_FAVORITE_CHARACTERS'

export const loginRequest = () => ({
  type: LOGIN_REQUEST
})

export const loginSuccess = userId => ({
  type: LOGIN_SUCCESS,
  payload: {
    userId
  }
})

export const loginError = error => ({
  type: LOGIN_ERROR,
  payload: {
    error
  }
})

export const loginOff = () => ({
  type: LOGIN_OFF,
})

export const addUserRequest = () => ({
  type: ADD_USER_REQUEST
})

export const addUserSuccess = ({name, password, email, id}) => ({
  type: ADD_USER_SUCCESS,
  payload: {
    name,
    password,
    email,
    id
  }
})

export const addUserError = error => ({
  type: ADD_USER_ERROR,
  payload: {
    error
  }
})

export const addFavoriteEpisode = idEpisode => ({
  type: ADD_FAVORITE_EPISODE,
  payload: {
    idEpisode
  }
})

export const addFavoriteCharacter = idCharacter => ({
  type: ADD_FAVORITE_CHARACTER,
  payload: {
    idCharacter
  }
})

const initialState = {
  users: {
    '1': {
      name: 'Manolo',
      password: 'manolo123',
      email: 'manolito@gmail.com',
      favoriteCharacters: [1, 2, 3],
      favoriteEpisodes: [2, 3, 4, 5, 6]
    },
    '2': {
      name: 'Ana',
      password: '123',
      email: 'anita@gmail.com',
      favoriteCharacters: [11, 12, 23],
      favoriteEpisodes: [5, 6, 3]
    },
    '3': {
      name: 'Federico',
      password: '123',
      email: 'federiquito@gmail.com',
      favoriteCharacters: [1, 12, 22],
      favoriteEpisodes: [9, 6 , 3 , 1]
    }
  },
  userList: ['1', '2'],
  loggedIn: localStorage.getItem('userId'),
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: action.payload.userId,
        loading: false,
        error: null
      }
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        loading: false
      }
    }
    case ADD_USER_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case ADD_USER_SUCCESS: {
      const {
        id,
        name,
        email,
        password
      } = action.payload

      return {
        ...state,
        users: {
          ...state.users,
          [id]: {
            name,
            email,
            password,
            favoriteCharacters: [],
            favoriteEpisodes: []
          }
        },
        userList: [...state.userList, id],
        loggedIn: id,
        loading: false,
        error: null
      }
    }
    case ADD_USER_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        loading: false
      }
    }
    case ADD_FAVORITE_EPISODE: {
      const newFavorite = [ action.payload.idEpisode ]

      return {
        ...state,
        users: {
          ...state.users,
          [state.loggedIn]: {
            ...state.users[state.loggedIn],
            favoriteEpisodes: [
              ...state.users[state.loggedIn].favoriteEpisodes,
              ...newFavorite
            ]
          }
        }
      }
    }
    case ADD_FAVORITE_CHARACTER: {
      const newFavorite = [ action.payload.idCharacter ]

      return {
        ...state,
        users: {
          ...state.users,
          [state.loggedIn]: {
            ...state.users[state.loggedIn],
            favoriteCharacters: [
              ...state.users[state.loggedIn].favoriteCharacters,
              ...newFavorite
            ]
          }
        }
      }
    }
    case LOGIN_OFF: {
      return {
        ...state,
        loggedIn: null
      }
    }
    default: return state
  }
}
