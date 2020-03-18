import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton, AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import './index.scss'
import Loading from '../../components/base/Loading/Loading'

@connect(({ login, loading }) => ({
  ...login,
  loading: loading.models.login,
}))
export default class Login extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      userName: '',
      password: '',
    }
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: 'login',
  }

  onLogin = async () => {
    this.props.dispatch({
      type: 'login/login',
      payload: this.state,
    })
  }

  handleChange = (value, e) => {
    let state = {}
    state[e.target.name] = value
    this.setState({
      ...state,
    })
  }

  render () {
    return (
      <View className='login-page'>
        <Loading loading={this.props.loading} />
        <View className='icon'>
          <AtIcon value='sketch' size='100' color='blue'></AtIcon>
        </View>
        <AtInput
          name='userName'
          type='text'
          placeholder='用户名'
          value={this.state.userName}
          onChange={this.handleChange}
        />
        <AtInput
          name='password'
          type='password'
          placeholder='用户名'
          value={this.state.password}
          onChange={this.handleChange}
        />
        <AtButton className='btn-submit' type='primary' onClick={this.onLogin}>登录</AtButton>
      </View>
    )
  }
}
