import * as homeApi from './service';

export default {
  namespace: 'home',
  state: {},

  effects: {
    *fetchData({payload, callback}, {call, put}) {
      yield new Promise(resolve => {
        setTimeout(() => resolve(), 2000);
      });

      yield put({
        type: 'save',
        payload: {
          noMore: true,
        },
      });
      callback && callback();
    },
  },

  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
};
