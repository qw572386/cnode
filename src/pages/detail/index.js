import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getTopicInfoAction, admireTopicAction } from '../../actions/topiclist'
import Replies from '../../components/topicinfo/replies'
import TopicInfo from '../../components/topicinfo/topicinfo'

@connect((store) => {
  return {
    admireState: store.topiclist.admireState,
    user: store.user,
    topicinfo: store.topiclist.topicinfo,
    replies: store.topiclist.replies
  }
}, (dispatch) => {
  return {
    getTopicInfo(params) {
      dispatch(getTopicInfoAction(params))
    },
    admireTopic(params) {
      dispatch(admireTopicAction(params))
    }
  }
})
class Detail extends Component{
  config = {
    navigationBarTitleText: '话题详情'
  }
  componentWillMount() {
    this.getDetail()
  }
  admire(repliy) {
    const { admireTopic, user: { accesstoken } } = this.props;
    const params = {
      replyid: repliy.id,
      accesstoken,
    }
    admireTopic && admireTopic(params)
  }
  getDetail() {
    const { getTopicInfo, user } = this.props;
    const params = {
      id: this.$router.params.topicid,
      mdrender: true,
      accesstoken: user.accesstoken
    };
    getTopicInfo && getTopicInfo(params)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.admireState != nextProps.admireState) {
      this.getDetail();
    }
  }
  render() {
    const { topicinfo, replies } = this.props;
    return (
      <View>
        <TopicInfo topicinfo={topicinfo} />
        <Replies replies={replies} onAdmire={this.admire.bind(this)} />
      </View>
    )
  }
}
export default Detail