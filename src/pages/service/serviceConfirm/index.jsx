import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

@connect(({ service }) => ({
  ...service
}))
export default class ServiceConfirm extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: 'serviceConfirm'
  }

  render() {
    return <View className='serviceConfirm-page'>serviceConfirm</View>
  }
}
