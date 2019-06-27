import { getJson, postJson } from '../utils/require'
import api from '../constants/api'

export const getTopicListAction = (params) => {
  return async dispatch => {
    let result = await getJson(api.topics, params);
    if (result && result.data) {
      if (result.data.success) {
        dispatch({ type: 'getTopicList', list: result.data.data })
      }
    }
  }
}
export const getNextTopicListAction = (params) => {
  return async dispatch => {
    let result = await getJson(api.topics, params);
    if (result && result.data) {
      if (result.data.success) {
        if (result.data.data.length) {
          dispatch({ type: 'appendTopicList', list: result.data.data, page: params.page })
        }
      }
    }
  }
}