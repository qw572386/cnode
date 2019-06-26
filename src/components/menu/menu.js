import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { showDrawerAction, hideDrawerAction, changeCategoryAction } from '../../actions/menu'
import { AtDrawer } from 'taro-ui'
import './menu.less'

@connect(function(store) {
  return {...store.menu}
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
  render() {
    const { currentCata: { value }, showDrawer, showDrawerMenu, hdieDrawerMenu, cataData } = this.props;
    return (
    <View>
      <AtDrawer style='position: absolute;' onItemClick={this.handleCatagry.bind(this)} onClose={hdieDrawerMenu} show={showDrawer} items={this.getItems(cataData)} />
      <View className='topiclist-menu'>
        <Image className='image' onClick={showDrawerMenu} src={require('../../assets/img/cata.png')} />
        <Text>{value ? value : ''}</Text>
        <Image className='image' src={require('../../assets/img/login.png')} />
      </View>
    </View>
    )
  }
}
export default Menu