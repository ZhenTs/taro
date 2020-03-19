import * as paymentPwdApi from './service'

export default {
  namespace: 'paymentPwd',
  state: {},

  effects: {
    *effectsDemo({ payload }, { call, put }) {
      const { status, data } = yield call(paymentPwdApi.demo, {})
      if (status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            topData: data
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
