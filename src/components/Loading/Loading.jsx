import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import PropTypes from 'prop-types';

import './index.scss'

export default class Loading extends Component {

  static propTypes = {
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: false,
  };


  render () {
    return this.props.loading ? (
      <View className='loading'>
        <View className='container'>
          <AtActivityIndicator color='white' />
          <Text className='text'>加载中</Text>
        </View>
      </View>
    ) : null
  }
}
