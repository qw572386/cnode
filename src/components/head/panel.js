import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import timeToLocalFormat from '../../utils/date'
import './panel.less'

class Panel extends Component{
  toDetail(item) {
    Taro.navigateTo({ url: '/pages/detail/index?topicid=' + item.id })
  }
  render() {
    const { listdata, title } = this.props;
    return (
    <View className='panel-box'>
      <View className='panel-header'>{title}</View>
      <View className='panel-body'>
      {listdata.map(item => {
        return (<View onClick={this.toDetail.bind(this, item)} className='panel-list-item' key={item.id}>
            <Image className='panel-list-item-img' src={item.author.avatar_url} />
            <Text className='panel-list-item-title'>{item.title}</Text>
            <Text className='panel-list-item-date'>{timeToLocalFormat(item.last_reply_at)}</Text>
          </View>)
      })}
      </View>
    </View>
    )
  }
}
Panel.defaultProps = {
  listdata: []
}
export default Panel