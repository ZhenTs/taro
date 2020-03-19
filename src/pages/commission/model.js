import * as commissionApi from './service'

export default {
  namespace: 'commission',
  state: {},

  effects: {
    *effectsDemo({ payload }, { call, put }) {
      const { status, data } = yield call(commissionApi.demo, {})
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
