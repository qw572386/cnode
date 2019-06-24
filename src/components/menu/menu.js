import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { showDrawer } from '../../actions/menu'
import './menu.less'

@connect(function(store) {
  return {...store.menu}
}, dispatch => {
  return {
    showDrawerMenu() {
      dispatch(showDrawer())
    }
  }
})
class Menu extends Component{
  showDrawer() {
    const { showDrawerMenu } = this.props;
    showDrawerMenu && showDrawerMenu();
  }
  render() {
    const { currentCata: { value } } = this.props;
    return (<View className='topiclist-menu'>
      <Image className='image' onClick={this.showDrawer.bind(this)} src={require('../../assets/img/cata.png')} />
      <Text>{value ? value : ''}</Text>
      <Image className='image' src={require('../../assets/img/login.png')} />
    </View>)
  }
}
export default Menu