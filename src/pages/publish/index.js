import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input, Textarea, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'
import { submitTopicAction } from '../../actions/topiclist'

@connect((store) => {
  return {...store.menu}
}, (dispatch) => {
  return {
    submitTopic(params) {
      return dispatch(submitTopicAction(params))
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
    content: ''
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
    let { title, content, selectCata } = this.state;
    const { accesstoken, submitTopic } = this.props;
    if (title && content && selectCata) {
      const params = {
        tab: 'dev',
        title,
        content,
        accesstoken
      }
      submitTopic && submitTopic(params).then(res => {
        res && Taro.navigateBack()
      }).catch(error => {
        console.log('***')
        console.log(error.message)
        Taro.showToast({title: error.message || '发布话题失败', icon: 'none'})
      })
    } else {
      Taro.showToast({title: '分类、标题或者内容不能为空', icon: 'none'})
    }
  }
  render() {
    const { cataData } = this.props;
    const { selectCata } = this.state;
    return (
      <View className='publish-box'>
        <Picker onChange={this.changeCata.bind(this)} mode='selector' range={cataData} rangeKey='value'>
          <View>{selectCata ? selectCata.value : '请选择'}</View>
        </Picker>
        <Input onInput={this.titleChange.bind(this)} placeholder='请输入标题' />
        <Textarea onInput={this.contentChange.bind(this)} placeholder='请输入内容'></Textarea>
        <Button onClick={this.submitTopic.bind(this)}>提交</Button>
      </View>
    )
  }
}
export default Publish