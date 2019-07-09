import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'

@connect((store) => {
  return {}
}, (dispatch) => {
  return {
  }
})

class Publish extends Component{
  config = {
    navigationBarTitleText: '发布话题'
  }
  render() {
    return (
      <View className='publish-box'>
        Publish
      </View>
    )
  }
}
export default Publish