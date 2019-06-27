const TOPIC_STATE = {
  page: 1,
  limit: 20,
  list: []
}
const topicList = (preState = TOPIC_STATE, action) => {
  switch(action.type) {
    case 'getTopicList': {
      return { ...preState, list: action.list }
    }
    case 'appendTopicList': {
      return { ...preState, list: [...preState.list, ...action.list], page: action.page }
    }
    default: {
      return {...preState}
    }
  }
}
export default topicList
