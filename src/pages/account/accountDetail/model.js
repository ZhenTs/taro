import * as accountDetailApi from './service'

export default {
  namespace: 'accountDetail',
  state: {},

  effects: {
    *effectsDemo({ payload }, { call, put }) {
      const { status, data } = yield call(accountDetailApi.demo, {})
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
