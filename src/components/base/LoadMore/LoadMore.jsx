import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import PropTypes from 'prop-types'

import './index.scss'

export default class LoadMore extends Component {
  static propTypes = {
    noMore: PropTypes.bool,
    loading: PropTypes.bool
  }

  static defaultProps = {
    noMore: false,
    loading: false
  }

  render() {
    console.log(this.props)
    return this.props.loading ? (
      <View className='load-more'>
        <AtActivityIndicator size={24} color='black' />
        <Text className='text'>加载中</Text>
      </View>
    ) : this.props.noMore ? (
      <View className='load-more'>
        <Text className='text'>没有更多了</Text>
      </View>
    ) : null
  }
}
