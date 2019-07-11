import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { getTopicInfoAction, admireTopicAction, replyContentAction } from '../../actions/topiclist'
import Replies from '../../components/topicinfo/replies'
import TopicInfo from '../../components/topicinfo/topicinfo'
import ReplyContent from '../../components/topicinfo/replycontent'
import './index.less'
import { validataAction } from '../../actions/user'

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
    validataAction(this.props.user).then(res => {
      if (res) {
        this.setState({showReplyContent: true});
      }
    })
  }
  closeReplyContent() {
    this.setState({showReplyContent: false})
  }
  async relyContent(content) {
    const { user } = this.props;
    const { currentReply } = this.state;
    const preName = currentReply ? '@' + currentReply.author.loginname + ' ' : ''; // 评论人的名称
    const params = {
      accesstoken: user.accesstoken,
      topicid: this.$router.params.topicid,
      content: preName + connect,
      reply_id: currentReply ? currentReply.id : null
    }
    const result = await replyContentAction(params);
    if(result && result.success) {
      this.getDetail();
      this.closeReplyContent();
    }
  }
  replyToReply(reply) {
    this.setState({ currentReply: reply, showReplyContent: true });
  }
  render() {
    const { topicinfo, replies, user } = this.props;
    const { showReplyContent } = this.state;
    const selfPublish = user.loginname === topicinfo.author.loginname;
    return (
      <View className='detail'>
        {showReplyContent ? <ReplyContent onCancelReply={this.closeReplyContent.bind(this)}  onReply={this.relyContent.bind(this)} /> : null}
        <TopicInfo selfPublish={selfPublish} topicinfo={topicinfo} />
        <Replies user={user} replies={replies} onAdmire={this.admire.bind(this)} onReplyToReply={this.replyToReply.bind(this)} />
        <Button className='reply-btn' onClick={this.Reply.bind(this)}>回复</Button>
      </View>
    )
  }
}
export default Detail