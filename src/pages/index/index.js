import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Menu from '../../components/menu/menu'
import TopicList from '../../components/topiclist/topiclist'

import './index.less'

class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  componentWillMount () {
  }

  render () {
    return (
      <View className='index'>
        <Menu />
        <TopicList />
      </View>
    )
  }
}

export default Index
