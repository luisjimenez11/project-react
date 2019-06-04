import { combineReducers } from 'redux'
import episodesReducer from './episodes'
import charactersReducer from './characters'
import userReducer from './users'

export default combineReducers({
  episodes: episodesReducer,
  characters: charactersReducer,
  users: userReducer,
})
