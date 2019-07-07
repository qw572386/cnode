import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'
import Head from '../../components/head/head'

@connect((store) => {
  return { ...store.user }
}, (dispatch) => {
  return {
  }
})

class User extends Component{
  config = {
    navigationBarTitleText: '个人信息'
  }
  render() {
    const { loginname, avatar_url } = this.props;
    return (
      <View className='user-box'>
        <Head loginname={loginname} avatar_url={avatar_url} />
      </View>
    )
  }
}
export default User