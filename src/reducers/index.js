import { combineReducers } from 'redux'
import menu from './menu'
import topiclist from '../reducers/topic'

export default combineReducers({
  menu,
  topiclist
})