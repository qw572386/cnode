import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtDrawer } from 'taro-ui'
import { showDrawerAction, hideDrawerAction, changeCategoryAction } from '../../actions/menu'
import { validataAction } from '../../actions/user'
import './menu.less'

@connect(function(store) {
  return {...store.menu, user: store.user}
}, dispatch => {
  return {
    showDrawerMenu() {
      dispatch(showDrawerAction())
    },
    hdieDrawerMenu() {
      dispatch(hideDrawerAction())
    },
    changeCategory(handleCata) {
      dispatch(changeCategoryAction(handleCata))
    }
  }
})
class Menu extends Component{
  getItems(cataData) {
    return cataData.map(item => item.value)
  }
  handleCatagry(index) {
    const { cataData, currentCata, changeCategory } = this.props;
    const handleCata = cataData[index];
    if (handleCata.key !== currentCata.key) {
      changeCategory(handleCata)
    }
  }
  toUser() {
    const { user } = this.props;
    validataAction(user).then(result => {
      if (result) {
        Taro.navigateTo({ url: '/pages/user/index' })
      } else {
        Taro.navigateTo({ url: '/pages/login/index' })
      }
    })
  }
  render() {
    const { currentCata: { value }, showDrawer, showDrawerMenu, hdieDrawerMenu, cataData } = this.props;
    return (
    <View className='menu-box'>
      <AtDrawer style='position: absolute;' onItemClick={this.handleCatagry.bind(this)} onClose={hdieDrawerMenu} show={showDrawer} items={this.getItems(cataData)} />
      <View className='topiclist-menu'>
        <Image className='image' onClick={showDrawerMenu} src={require('../../assets/img/cata.png')} />
        <Text>{value ? value : ''}</Text>
        <Image onClick={this.toUser.bind(this)} className='image' src={require('../../assets/img/login.png')} />
      </View>
    </View>
    )
  }
}
export default Menu