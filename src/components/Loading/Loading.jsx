import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import PropTypes from 'prop-types'

import './index.scss'

export default class Loading extends Component {

  static propTypes = {
    inline: PropTypes.bool,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    inline: false,
    loading: false,
  }

  render () {
    return this.props.loading ? (this.props.inline ? (
      <View className='loading-view'>
        <View className='container'>
          <AtActivityIndicator size={32} color='black'/>
          <Text className='text'>加载中</Text>
        </View>
      </View>
    ) : (<View className='loading-mask'>
      <View className='container'>
        <AtActivityIndicator size={32} color='white'/>
        <Text className='text'>加载中</Text>
      </View>
    </View>)) : null
  }
}
