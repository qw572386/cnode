import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, RichText } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import timeToLocalFormat from '../../utils/date'
import './topicinfo.less'

class TopicInfo extends Component{
  render() {
    console.log(this.props)
    const { topicinfo: { create_at, title, author: { loginname }, visit_count, content } } = this.props;
    return (
    <View className='topic-info'>
      <View className='topic-info-header'>
        <View className='topic-info-header-title'>
          <Text>置顶</Text>
          <Text>{title}</Text>
        </View>
        <View className='topic-info-header-pie'>
          <Text>{timeToLocalFormat(create_at)}</Text>
          <Text>{loginname}</Text>
          <Text>{visit_count + '次浏览'}</Text>
        </View>
      </View>
      <View className='topic-info-body'>
        <RichText nodes={content} />
      </View>
    </View>
    )
  }
}
export default TopicInfo