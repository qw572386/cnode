import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Textarea } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './replycontent.less'

class ReplyContent extends Component{
  btnCancel() {
    this.props.onCancelReply && this.props.onCancelReply()
  }
  btnOk() {
    if (this.state.value) {
      this.props.onReply && this.props.onReply(this.state.value);
    } else {
      Taro.showToast({ title: '请输入评论内容', icon: 'none' })
    }
  }
  stopPropagation(e) {
    e.stopPropagation();
  }
  changeContent(e) {
    if (e && e.target) {
      this.setState({ value: e.target.value })
    }
  }
  render() {
    return (
      <View className='replycontent' onClick={this.bntCancel.bind(this)}>
        <View className='replycontent-dialog' onClick={this.stopPropagation.bind(this)}>
          <Textarea onInput={this.changeContent.bind(this)} className='reply-textarea' placeholder='请输入回复内容'></Textarea>
          <View className='btn-group'>
            <Button onClick={this.btnOk.bind(this)} className='btn btn-ok'>确定</Button>
            <Button onClick={this.btnCancel.bind(this)} className='btn btn-cancel'>取消</Button>
          </View>
        </View>
      </View>
    )
  }
}
export default ReplyContent