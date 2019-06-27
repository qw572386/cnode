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
    default: {
      return {...preState}
    }
  }
}
export default topicList
