import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

@connect(({ commission }) => ({
  ...commission
}))
export default class Commission extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: 'commission'
  }

  render() {
    return <View className='commission-page'>commission</View>
  }
}
