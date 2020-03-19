import Taro from '@tarojs/taro'
import * as loginApi from './service'

export default {
  namespace: 'login',
  state: {
    access_token: '',
    refresh_token: '',
    errMsg: ''
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        yield new Promise(resolve => {
          setTimeout(() => resolve(), 2000)
        })
        const { access_token, refresh_token } = yield call(loginApi.login, {
          // ...payload,
          userName: 'superadmin',
          password: '17c4520f6cfd1ab53d8745e84681eb49'
        })
        yield put({
          type: 'save',
          payload: {
            access_token,
            refresh_token
          }
        })
        Taro.switchTab({ url: '/pages/home/index' })
      } catch (e) {
        yield put({
          type: 'save',
          payload: {
            errMsg: e
          }
        })
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
