const GET_EPISODES_REQUEST = 'GET_EPISODES_REQUEST'
const GET_EPISODES_SUCCESS = 'GET_EPISODES_SUCCESS'
const GET_EPISODES_FAIL = 'GET_EPISODES_FAIL'

export const getEpisodesRequest = () => ({
  type: 'GET_EPISODES_REQUEST'
})

export const getEpisodesSuccess = (episodes) => ({
  type: 'GET_EPISODES_SUCCESS',
  payload: {
    episodes
  }
})

export const getEpisodesFail = (error) => ({
  type: 'GET_EPISODES_FAIL',
  payload: {
    error
  }
});


const initialState = {
  entities: [],
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EPISODES_REQUEST:
      return {
        ...state,
        loanding: true
      }
    case GET_EPISODES_SUCCESS:
      return {
        ...state,
        loanding: false,
        entities: [
          ...state.entities,
          ...action.payload.episodes
        ]
      }
    case GET_EPISODES_FAIL:
      return {
        ...state,
        loanding: false,
        error: action.payload.error
      }
    default: return state
  }
}