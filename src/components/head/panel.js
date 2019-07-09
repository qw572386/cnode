import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './panel.less'

class Panel extends Component{
  render() {
    const { listdata, title } = this.props;
    return (
    <View className='panel-box'>
      {title}有{listdata.length}条数据
    </View>
    )
  }
}
export default Panel