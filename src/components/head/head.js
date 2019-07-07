import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './head.less'

class Head extends Component{
  render() {
    const { loginname, avatar_url } = this.props;
    return (
    <View className='head-box'>
      <Image className='login-back' src={require('../../assets/img/loginBack.jpg')} />
      <Image className='login-head' src={avatar_url ? avatar_url : require('../../assets/img/head.png')} />
      {loginname ? <Text className='login-head-name'>{loginname}</Text> : null}
    </View>
    )
  }
}
export default Head