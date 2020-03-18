import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'
import LoadMore from '../../components/LoadMore/LoadMore'
import Loading from '../../components/Loading/Loading'

@connect(({ home, loading }) => ({
  ...home,
  loading: loading.models.home,
}))
export default class Home extends Component {

  componentWillMount () {

  }

  componentDidMount () {
    this.props.dispatch&&this.props.dispatch({
      type: 'home/fetchData',
      callback:()=>{
        Taro.showToast({title:'test'})
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: 'home',
    backgroundTextStyle: 'dark',
  }

  onPullDownRefresh () {

  }

  onReachBottom () {

  }

  render () {
    return (
      <View className='home-page'>
        <Loading loading={this.props.loading} inline />
        <LoadMore loading={this.props.loading} noMore={this.props.noMore}/>
      </View>
    )
  }
}
