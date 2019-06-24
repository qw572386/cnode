export function showDrawer() {
  return function (dispatch) {
    dispatch({type: 'showDrawer'})
  }
}