import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getTopicInfoAction } from '../../actions/topiclist'
import Replies from '../../components/topicinfo/replies'
import TopicInfo from '../../components/topicinfo/topicinfo'

@connect((store) => {
  return {
    topicinfo: store.topiclist.topicinfo,
    replies: store.topiclist.replies
  }
}, (dispatch) => {
  return {
    getTopicInfo(params) {
      dispatch(getTopicInfoAction(params))
    }
  }
})
class Detail extends Component{
  componentWillMount() {
    const { getTopicInfo } = this.props;
    const params = {
      id: this.$router.params.topicid,
      mdrender: true
    };
    getTopicInfo && getTopicInfo(params)
    
  }
  render() {
    const { topicinfo, replies } = this.props;
    return (
      <View>
        <TopicInfo topicinfo={topicinfo} />
        <Replies replies={replies} />
      </View>
    )
  }
}
export default Detail