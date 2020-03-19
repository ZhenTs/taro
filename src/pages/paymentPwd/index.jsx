import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

@connect(({ paymentPwd }) => ({
  ...paymentPwd
}))
export default class Paymentpwd extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: 'paymentPwd'
  }

  render() {
    return <View className='paymentPwd-page'>paymentPwd</View>
  }
}
