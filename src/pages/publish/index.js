import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input, Textarea, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'
import { submitTopicAction, updateTopicAction } from '../../actions/topiclist'

@connect((store) => {
  return {...store.menu, ...store.user, topicinfo: store.topiclist.topicinfo}
}, (dispatch) => {
  return {
    submitTopic(params) {
      return dispatch(submitTopicAction(params))
    },
    updateTopic(params) {
      return dispatch(updateTopicAction(params))
    }
  }
})

class Publish extends Component{
  config = {
    navigationBarTitleText: '发布话题'
  }
  state = {
    selectCata: null,
    title: '',
    content: '',
    isEdit: false
  }
  componentWillMount() {
    const { edit } = this.$router.params;
    this.setState({ isEdit: edit === '1' }, () => {
      if (this.state.isEdit) {
        const {topicinfo} = this.props;
        this.setState({ topicinfo, title: topicinfo.title, content: topicinfo.content, selectCata: topicinfo.selectCata })
      }
    })
  }
  // 分类改变
  changeCata(e) {
    const { cataData } = this.props;
    this.setState({
      selectCata: cataData[e.detail.value]
    })
  }
  // 标题改变
  titleChange(e) {
    this.setState({title: e.target.value})
  }
  // 内容改变
  contentChange(e) {
    this.setState({content: e.target.value})
  }
  // 提交话题
  submitTopic() {
    let { title, content, selectCata, isEdit } = this.state;
    const { accesstoken, submitTopic, updateTopic, topicinfo } = this.props;
    if (title && content && selectCata) {
      const params = {
        tab: 'dev',
        title,
        content,
        accesstoken,
        topic_id: topicinfo.id
      }
      if (isEdit) {
        updateTopic && updateTopic(params).then(res => {
          res && Taro.navigateBack()
        }).catch(error => {
          Taro.showToast({title: error.message || '更新话题失败', icon: 'none'})
        })
      } else {
        submitTopic && submitTopic(params).then(res => {
          res && Taro.redirectTo({url: '/pages/user/index'})
        }).catch(error => {
          Taro.showToast({title: error.message || '发布话题失败', icon: 'none'})
        })
      }
    } else {
      Taro.showToast({title: '分类、标题或者内容不能为空', icon: 'none'})
    }
  }
  render() {
    const { cataData } = this.props;
    const { selectCata, topicinfo } = this.state;
    return (
      <View className='publish-box'>
        <Input value={topicinfo && topicinfo.title || ''} className='publish-title' onInput={this.titleChange.bind(this)} placeholder='请输入标题' />
        <Textarea value={topicinfo && topicinfo.content || ''} className='publish-content' onInput={this.contentChange.bind(this)} placeholder='请输入内容'></Textarea>
        <Picker onChange={this.changeCata.bind(this)} mode='selector' range={cataData} rangeKey='value'>
          <View  className='publish-cate'>{selectCata ? selectCata.value : '请选择'}</View>
        </Picker>
        <Button className='publish-btn' onClick={this.submitTopic.bind(this)}>提交</Button>
      </View>
    )
  }
}
export default Publish