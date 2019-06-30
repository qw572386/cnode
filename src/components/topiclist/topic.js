import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import timeToLocalFormat from '../../utils/date'
import './topic.less'

class Topic extends Component{
  // 跳转到详情页
  goToDetail(id) {
    Taro.navigateTo({ url: '/pages/detail/index?topicid=' + id })
  }
  render() {
    let { item: { author: { avatar_url, loginname }, id, title, create_at, top, reply_count, visit_count, tab } } = this.props;
    return (<View className='topiclist-topic' onClick={this.goToDetail.bind(this, id)}>
      <Image className='head-img' src={avatar_url || ''} />
      <View className='right'>
        <View className='topic-title'>
          {top ? <Text className='topic-up'>置顶</Text> : (tab === 'share' ? <Text className='topic-up blue'>分享</Text> : <Text className='topic-up blue'>问答</Text>) }
          <Text className='topic-name'>{title}</Text>
        </View>
        <View className='topic-info'>
          <Text>{loginname}</Text>
          <Text>{reply_count + '/' + visit_count}</Text>
          <Text>创建时间:{timeToLocalFormat(create_at)}</Text>
        </View>
      </View>
    </View>)
  }
}
Topic.defaultProps = {
  item: {
    author: {}
  }
}
export default Topic