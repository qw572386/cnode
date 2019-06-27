import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getTopicListAction } from '../../actions/topiclist'
import Topic from './topic'

@connect((store) => {
  return {
    ...store.topiclist,
    currentCata: store.menu.currentCata
  }
}, (dispatch) => {

  return {
    getTopicList(params) {
      dispatch(getTopicListAction(params))
    }
  }
})
class TopicList extends Component{
  componentWillMount() {
    const { getTopicList, currentCata: { key }, page, limit } = this.props;
    getTopicList && getTopicList({page, limit, tab: key})
  }
  render() {
    const { list } = this.props;

    return (<ScrollView>
      {
        list.map(item => {
          return <Topic item={item} key={item.id} />
        })
      }
    </ScrollView>)
  }
}
export default TopicList
