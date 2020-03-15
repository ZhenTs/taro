import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'
import request from '../../utils/request'

export default class Index extends Component {

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页',
  }

  onLogin =async () => {
    // request('connect/token', {
    //   method: 'post',
    //   contentType: 'application/x-www-form-urlencoded',
    //   data: {
    //     client_id: '70d8bb06-0254-43f2-a371-0e1b2be932b0',
    //     client_secret: '830c409d-0f16-4c44-9eac-60e0f28d1bf7',
    //     grant_type: 'password',
    //     password: '17c4520f6cfd1ab53d8745e84681eb49',
    //     userName: 'superadmin',
    //   },
    // }).then(result => {
    //   Taro.setStorageSync('access_token', result.access_token)
    //   Taro.setStorageSync('refresh_token', result.refresh_token)
    // })

    const result= await request('http://47.98.105.79:5001/test/test');
    console.log(result)
  }

  onRefresh = () => {
    request('https://www.apiopen.top/journalismApi').then(result=>{
      console.log("结果",result)
    }).catch(error=>{
      console.log("错误",error)
    })
  }

  render () {
    return (
      <View className='index'>
        <Button onClick={this.onLogin}>测试登录</Button>
        <Button onClick={this.onRefresh}>测试刷新token</Button>
      </View>
    )
  }
}
