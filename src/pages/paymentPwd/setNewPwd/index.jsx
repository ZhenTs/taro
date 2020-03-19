import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

@connect(({ paymentPwd }) => ({
  ...paymentPwd
}))
export default class SetNewPwd extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: 'setNewPwd'
  }

  render() {
    return <View className='setNewPwd-page'>setNewPwd</View>
  }
}
