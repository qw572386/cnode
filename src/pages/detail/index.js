import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getTopicInfoAction, admireTopicAction } from '../../actions/topiclist'
import Replies from '../../components/topicinfo/replies'
import TopicInfo from '../../components/topicinfo/topicinfo'
import ReplyContent from '../../components/topicinfo/replycontent'
import './index.less'

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
  state = {
    showReplyContent: false // 显示回复组件
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
  Reply() {
    this.setState({showReplyContent: true});
  }
  closeReplyContent() {
    this.setState({showReplyContent: false})
  }
  relyContent(content) {
    console.log(content)
  }
  render() {
    const { topicinfo, replies } = this.props;
    const { showReplyContent } = this.state;
    return (
      <View className='detail'>
        {showReplyContent ? <ReplyContent onCancelReply={this.closeReplyContent.bind(this)} onRely={this.relyContent.bind(this)} /> : null}
        <TopicInfo topicinfo={topicinfo} />
        <Replies replies={replies} onAdmire={this.admire.bind(this)} />
        <Button className='reply-btn' onClick={this.Reply.bind(this)}>回复</Button>
      </View>
    )
  }
}
export default Detail