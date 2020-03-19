import request from '../../utils/request'

export const login = data =>
  request('connect/token', {
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    data: {
      client_id: '70d8bb06-0254-43f2-a371-0e1b2be932b0',
      client_secret: '830c409d-0f16-4c44-9eac-60e0f28d1bf7',
      grant_type: 'password',
      password: data.password,
      userName: data.userName
    }
  })
