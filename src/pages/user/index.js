import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'
import Head from '../../components/head/head'
import Panel from '../../components/head/panel'
import { getUserInfoAction } from '../../actions/user'

@connect((store) => {
  return { ...store.user }
}, (dispatch) => {
  return {
  }
})

class User extends Component{
  config = {
    navigationBarTitleText: '个人信息'
  }
  state = {
    recent_replies: [],
    recent_topics: []
  }
  componentWillMount() {
    getUserInfoAction({ loginname: this.props.loginname }).then(res => {
      this.setState({
        recent_topics: res.data.recent_topics,
        recent_replies: res.data.recent_replies
      })
    })
  }
  render() {
    const { loginname, avatar_url } = this.props;
    const { recent_topics, recent_replies } = this.state;
    return (
      <View className='user-box'>
        <Head loginname={loginname} avatar_url={avatar_url} />
        <Panel listdata={recent_topics} title='最近的话题' />
        <Panel listdata={recent_replies} title='最近的回复' />
      </View>
    )
  }
}
export default User