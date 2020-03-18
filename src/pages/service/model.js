import * as serviceApi from './service';

export default {
  namespace: 'service',
  state: {},

  effects: {
    *effectsDemo({payload}, {call, put}) {
      const {status, data} = yield call(serviceApi.demo, {});
      if (status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            topData: data,
          },
        });
      }
    },
  },

  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
};
