import * as addressApi from './service'

export default {
  namespace: 'address',
  state: {},

  effects: {
    *effectsDemo({ payload }, { call, put }) {
      const { status, data } = yield call(addressApi.demo, {})
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
