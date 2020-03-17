import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import './index.scss';

@connect(({mine}) => ({
  ...mine,
}))
export default class Mine extends Component {

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: 'mine',
  };

  render() {
    return (
      <View className='mine-page'>
        mine
      </View>
    )
  }
}