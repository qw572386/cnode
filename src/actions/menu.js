export function showDrawerAction() {
  return function (dispatch) {
    dispatch({type: 'showDrawer'})
  }
}
export function hideDrawerAction() {
  return function (dispatch) {
    dispatch({type: 'hideDrawer'})
  }
}
export function changeCategoryAction(currentCata) {
  return function (dispatch) {
    dispatch({type: 'changeCata', currentCata})
  }
}