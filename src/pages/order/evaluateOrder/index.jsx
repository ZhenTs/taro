import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

@connect(({ order }) => ({
  ...order
}))
export default class EvaluateOrder extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: 'evaluateOrder'
  }

  render() {
    return <View className='evaluateOrder-page'>evaluateOrder</View>
  }
}
