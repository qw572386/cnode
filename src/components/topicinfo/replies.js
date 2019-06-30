import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image, RichText } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './replies.less'
import timeToLocalFormat from '../../utils/date'

// const isweapp = process.env.TARO_NAV === 'weapp' // 小程序环境
const isweapp = true // 小程序环境
class Replies extends Component{
  render() {
    const { replies } = this.props;
    return (
      <View className='topicinfo-replies'>
        {replies.map((item, index) => {
          return (
            <View className='topicinfo-repliy' key={item.id}>
              <Image className='topicinfo-repliy-image' src={item.author ? item.author.avatar_url : ''} />
              <View className='topicinfo-repliy-right'>
                <View className='topicinfo-repliy-right-body'>
                  <View className='topicinfo-repliy-right-pie'>
                    <Text className='loginname'>{item.author ? item.author.loginname : ''}</Text>
                    <Text className='floor'>{(index + 1) + '楼'}</Text>
                    <Text className='time'>{timeToLocalFormat(item.create_at)}</Text>
                  </View>
                  <View className='topicinfo-repliy-right-content'>
                    {
                      isweapp ? <RichText nodes={item.content} /> : <View dangerouslySetInnerHTML={{__html: item.content}} />
                    }
                  </View>
                </View>
                <View className='topicinfo-repliy-right-zan'>
                  <Image className='topicinfo-repliy-image' src={require('../../assets/img/zan.png')} />
                  <Text>0</Text>
                  <Image className='topicinfo-repliy-image' src={require('../../assets/img/zhuan.png')} />
                  <Text>0</Text>
                </View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}
export default Replies