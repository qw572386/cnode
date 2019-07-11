import Taro, { Component } from '@tarojs/taro'
import { View, Text, RichText, Image } from '@tarojs/components'
import timeToLocalFormat from '../../utils/date'
import './topicinfo.less'

class TopicInfo extends Component{
  getTitle(title){
    return title;
  }
  delTopic(topicinfo) {
    this.props.onDelTopic && this.props.onDelTopic(topicinfo)
  }
  editTopic() {
    Taro.redirectTo({url: '/pages/publish/index?edit=1'})
  }
  render() {
    const { topicinfo, topicinfo: { create_at, title, author: { loginname }, visit_count, content, top, tab }, selfPublish } = this.props;
    return (
    <View className='topic-info'>
      <View className='topic-info-header'>
        <View className='topic-info-header-title'>
        {top ? <Text className='topic-up'>置顶</Text> : (tab === 'share' ? <Text className='topic-up blue'>分享</Text> : <Text className='topic-up blue'>问答</Text>) }
          <Text>{title}</Text>
        </View>
        <View className='topic-info-header-pie'>
          <Text>{timeToLocalFormat(create_at)}</Text>
          <Text>{loginname || ''}</Text>
          <Text>{visit_count + '次浏览'}</Text>
          {
            selfPublish ? (<View className='topic-info-header-img'>
              <Image onClick={this.delTopic.bind(this, topicinfo)} className='img' src={require('../../assets/img/del.png')} />
              <Image onClick={this.editTopic.bind(this)} className='img' src={require('../../assets/img/edit.png')} />
            </View>) : null
          }
        </View>
      </View>
      <View className='topic-info-body'>
        <RichText nodes={content} />
      </View>
    </View>
    )
  }
}
TopicInfo.defaultProps = {
  topicinfo: {
    author: {
      loginname: ''
    }
  }
}
export default TopicInfo