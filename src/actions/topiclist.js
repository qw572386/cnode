import { getJson, postJson } from '../utils/require'
import api from '../constants/api'
import Taro from '@tarojs/taro'

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
// 请求话题详情
export const getTopicInfoAction = (params) => {
  return async dispatch => {
    const result = await getJson(api.gettopicsinfo + '/' + params.id, params)
    if (result && result.data && result.data.success) {
      dispatch({ type: 'getTopicInfo', infoData: result.data.data })
    } else {
      console.error('请求详情失败')
    }
  }
}
// 点赞话题回复
export const admireTopicAction = (params) => {
  return async dispatch => {
    const result = await postJson(api.upreply + params.replyid + '/ups', params)
    if (result && result.data && result.data.success) {
      dispatch({ type: 'admireSuccess' })
    } else {
      Taro.showToast({title: '点赞失败', icon: 'none'})
    }
  }
}
// 话题评论
export const replyContentAction = async (params) => {
  const result = await postJson(api.replytopic + params.replyid + '/replies', params)
  if (result && result.data && result.data.success) {
    return result.data.data
  } else {
    Taro.showToast({title: '评论失败', icon: 'none'})
  }
  return false;
}
export const submitTopicAction = (params) => {
  return async () => {
    const result = await postJson(api.createtopic, params)
    if (result && result.data && result.data.success) {
      return result.data
    } else {
      throw new Error(result && result.error_msg || '话题发布失败')
    }
  }
}
export const updateTopicAction = (params) => {
  return async () => {
    const result = await postJson(api.updatetopic, params)
    if (result && result.data && result.data.success) {
      return result.data
    } else {
      throw new Error(result && result.error_msg || '话题更新失败')
    }
  }
}