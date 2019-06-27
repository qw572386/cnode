import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getTopicListAction, getNextTopicListAction } from '../../actions/topiclist'
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
    },
    getNextTopicList(params) {
      dispatch(getNextTopicListAction(params))
    }
  }
})
class TopicList extends Component{
  componentWillMount() {
    const { getTopicList, currentCata: { key }, page, limit } = this.props;
    getTopicList && getTopicList({page , limit, tab: key})
  }
  // 触发分页
  onScrollToLower() {
    const { getNextTopicList, currentCata: { key }, page, limit } = this.props;
    getNextTopicList && getNextTopicList({page: page + 1, limit, tab: key})
  }
  render() {
    const { list } = this.props;

    return (<ScrollView scrollY onScrollToLower={this.onScrollToLower.bind(this)} style='height: 650px'>
      {
        list.map(item => {
          return <Topic item={item} key={item.id} />
        })
      }
    </ScrollView>)
  }
}
export default TopicList
