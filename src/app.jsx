import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import './styles/base.scss'
import Index from './pages/index'
import dva from './utils/dva'
import models from './models'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
})
const store = dvaApp.getStore()

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/login/index',
      'pages/home/index',
      'pages/index/index',
      'pages/mine/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      list: [{
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './images/tab/home.png',
        selectedIconPath: './images/tab/home_selected.png',
      }, {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: './images/tab/mine.png',
        selectedIconPath: './images/tab/mine_selected.png',
      }],
      color: '#333',
      selectedColor: '#d81e06',
      backgroundColor: '#fff',
      borderStyle: 'black',
    },
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'))
