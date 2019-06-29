import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
class Detail extends Component{
  componentWillMount() {
    console.log('**********' + this.$router.params.topicid)
  }
  render() {
    return (<View>Detail</View>)
  }
}
export default Detail