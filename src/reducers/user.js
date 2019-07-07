
const USER_STATE = {
  accesstoken: 'd5a1e2d3-5b7b-466e-a14d-8522f4041e3d', // 用户密钥
}
const user = (preState = USER_STATE, action) => {
  switch(action.type) {
    case 'loginSuccess': {
      return {...preState, accesstoken: action.accesstoken, loginname: action.loginname, avatar_url: action.avatar_url}
    }
    case 'loginFail': {
      return {...preState, accesstoken: action.accesstoken, loginname: action.loginname, avatar_url: action.avatar_url}
    }
    default: {
      return {...preState}
    }
  }
}
export default user;