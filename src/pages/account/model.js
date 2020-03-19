import * as accountApi from './service'

export default {
  namespace: 'account',
  state: {},

  effects: {
    *effectsDemo({ payload }, { call, put }) {
      const { status, data } = yield call(accountApi.demo, {})
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
