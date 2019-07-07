import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'
import Head from '../../components/head/head'
import { accessTokenAction } from '../../actions/user'

@connect((store) => {
  return { user: store.user }
}, (dispatch) => {
  return {
    onAccessToken(param) {
      return dispatch(accessTokenAction(param))
    }
  }
})

class Login extends Component{
  config = {
    navigationBarTitleText: '登录'
  }
  changeToken(e) {
    if(e && e.target) {
      this.setState({ token: e.target.value })
    }
  }
  tokenLogin() {
    if (this.state.token) {
      if (this.props.onAccessToken) {
        this.props.onAccessToken({ accesstoken: this.state.token }).then(res => {
          Taro.redirectTo({
            url: '/pages/user/index'
          })
        }).catch(err => {
          Taro.showToast({title: err.message, icon: 'none'})
        })
      }
    } else {
      Taro.showToast({ title: '请输入accesstoken后在登录', icon: 'none' })
    }
  }
  render() {
    return (
      <View className='login-box'>
        <Head />
        <View className='login-form'>
          <Input onInput={this.changeToken.bind(this)} className='login-input' placeholder='请输入accesstoken' />
          <Button onClick={this.tokenLogin.bind(this)} className='btn-login'>登录</Button>
        </View>
      </View>
    )
  }
}
export default Login