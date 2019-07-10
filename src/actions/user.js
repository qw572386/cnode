import Taro from '@tarojs/taro'
import api from '../constants/api'
import { getJson, postJson } from '../utils/require'

export const accessTokenAction = (params) => {
  return async dispatch => {
    let result = await postJson(api.checkusertoken, params);
    if (result &&result.data && result.data.success) {
      dispatch({
        type: 'loginSuccess',
        accesstoken: params.accesstoken,
        loginname: result.data.loginname,
        avatar_url: result.data.avatar_url
      })
      return result.data
    } else {
      dispatch({
        type: 'loginFail',
        accesstoken: null,
        loginname: null,
        avatar_url: null
      })
    }
    throw new Error(result.data.error_msg || '登录失败');
  }
}
// 获取用户信息
export const getUserInfoAction = async (params) => {
  let result = await getJson(api.getuserinfo + params.loginname);
  if (result && result.data && result.data.success) {
    return result.data
  } else {
    Taro.showToast({
      title: '获取用户信息失败',
      icon: 'none'
    })
  }
}
// 验证用户信息
export const validataAction = async (params) => {
  if (params && params.accesstoken) {
    return true;
  }
  Taro.navigateTo({url: '/pages/login/index'})
  return false
}
