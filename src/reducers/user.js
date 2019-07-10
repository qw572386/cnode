import { setCache, getCache } from '../utils/cache'

const cacheKey = 'cnode-user-key'
const user_cache = getCache(cacheKey) || {}; // 读取缓存

const USER_STATE = {
  ...user_cache
}
const user = (preState = USER_STATE, action) => {
  switch(action.type) {
    case 'loginSuccess': {
      const state = {...preState, ...action}
      setCache(cacheKey, state)
      return state
    }
    case 'loginFail': {
      const state = {...preState, accesstoken: action.accesstoken, loginname: action.loginname, avatar_url: action.avatar_url}
      setCache(cacheKey, state)
      return state
    }
    default: {
      return {...preState}
    }
  }
}
export default user;