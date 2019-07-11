import Taro from '@tarojs/taro';

export function getJson(url, data) {
  Taro.showLoading();
  return Taro.request({ url, data, method: 'GET' }).then(res => {
    Taro.hideLoading()
    return res
  })
}

export function postJson(url, data) {
  Taro.showLoading();
  return Taro.request({ url, data, method: 'POST', header: { 'content-type': 'application/json' } }).then(res => {
    Taro.hideLoading()
    return res
  })
}
