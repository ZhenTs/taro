import request from '../../utils/request'

export const demo = data =>
  request('url', {
    method: 'POST',
    data
  })
