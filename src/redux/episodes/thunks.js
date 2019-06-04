import axios from "axios";
import {
  getEpisodesRequest,
  getEpisodesSuccess,
  getEpisodesFail
} from './index'

const baseApiUrl = 'https://rickandmortyapi.com/api/episode/'

export const getEpisodes = () => {
  return async (dispatch, getState) => {
    dispatch(getEpisodesRequest())
    try {
      const response = await axios.get(baseApiUrl)
      console.log(response)
      dispatch(
        getEpisodesSuccess(response.data.results)
      )
    } catch (e) {
      const error = new Error(e)
      dispatch(getEpisodesFail(error.toString()))
    }   
  }
}