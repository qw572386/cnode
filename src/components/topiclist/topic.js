import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './topic.less'

class Topic extends Component{
  render() {
    let { item: { author: { avatar_url, loginname }, title, create_at, top, reply_count, visit_count } } = this.props;
    return (<View className='topiclist-topic'>
      <Image className='head-img' src={avatar_url || ''} />
      <View className='right'>
        <View className='topic-title'>
          {top ? <Text className='topic-up'>置顶</Text> : ''}
          <Text className='topic-name'>{title}</Text>
        </View>
        <View className='topic-info'>
          <Text>{loginname}</Text>
          <Text>{reply_count + '/' + visit_count}</Text>
          <Text>创建时间:{create_at}</Text>
        </View>
      </View>
    </View>)
  }
}
export default Topic