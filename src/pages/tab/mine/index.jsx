import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

@connect(({ mine }) => ({
  ...mine
}))
export default class Tab extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: 'tab'
  }

  render() {
    return <View className='tab-page'>mine tab</View>
  }
}
