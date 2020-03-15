/**
 * @author lz
 * @description
 */

import Taro from '@tarojs/taro'
import apiConfig from '../config/apiConfig'

const codeMessage = {
  0: '未知错误',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  500: '服务器发生错误，请检查服务器。',
}

const LOG_TAG = 'HTTP'
const cacheRequest = []
let isRefreshing = false
// const showHeaderLog = false

const interceptor = function (chain) {
  const requestParams = chain.requestParams
  logRequest(requestParams)
  return chain.proceed(requestParams)
    .then(res => {
      logResponse(requestParams, res)
      // 微信小程序404，500等都会进入成功回调
      if (process.env.TARO_ENV === 'weapp') {
        if (res.statusCode !== 200) {
          throw res
        }
      }
      return res
    }).catch(error => {
      if (process.env.TARO_ENV === 'h5') {
        logError(requestParams, error).then(() => {
          console.log('aaa')
          let errorMsg
          if (error.statusCode || error.status) {
            errorMsg = codeMessage[error.statusCode || error.status] || codeMessage[0]
          }
          throw errorMsg
        })
      }else{
        let errorMsg
        if (error.statusCode || error.status) {
          errorMsg = codeMessage[error.statusCode || error.status] || codeMessage[0]
        }
        throw errorMsg
      }
    })
}

const logRequest = function ({ method, data, url, header }) {
  console.log(LOG_TAG, ` --> ${method || 'GET'} ${url} `)
  for (let key in header) {
    console.log(LOG_TAG, ` ${key}:${header[key]}`)
  }
  data && console.log(LOG_TAG, ' ' + JSON.stringify(data))
  console.log(LOG_TAG, ` --> END ${method || 'GET'}`)
}
const logResponse = function ({ url }, res) {
  console.log(LOG_TAG, ` <-- ${res.statusCode || res.status} ${url}`)
  res.data && console.log(LOG_TAG, ' ' + JSON.stringify(res.data))
  console.log(LOG_TAG, ` <-- END HTTP`)
  return new Promise((resolve, reject) => {
    console.log(LOG_TAG, ` <-- ${res.statusCode || res.status} ${url}`)
    if (process.env.TARO_ENV === 'h5') {
      res.text().then(text => {
        console.log(LOG_TAG, ' ' + text)
        console.log(LOG_TAG, ` <-- END HTTP`)
        resolve()
      }).catch(error => {
        reject(error)
      })
    } else {
      res.data && console.log(LOG_TAG, ' ' + JSON.stringify(res.data))
      console.log(LOG_TAG, ` <-- END HTTP`)
      resolve()
    }
  })
}

const logError = function ({ url }, res) {
  return new Promise((resolve, reject) => {
    console.log(LOG_TAG, ` <-- ${res.statusCode || res.status} ${url}`)
    res.text().then(text => {
      console.log(LOG_TAG, ' ' + text)
      console.log(LOG_TAG, ` <-- END HTTP`)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}

const authInterceptor = function (chain) {
  const requestParams = chain.requestParams
  const { header } = requestParams
  const access_token = Taro.getStorageSync('access_token')
  if (header && access_token) {
    header.Authorization = 'bearer ' + access_token
  }
  return chain.proceed(requestParams)
}

const refreshTokenInterceptor = function (chain) {
  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then(res => {
    return res
  }).catch(error => {
    if (error.status) {
      if (error.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true
          cacheRequest.push(requestParams)
          refreshToken().then(result => {
            isRefreshing = false
            if (result.access_token && result.refresh_token) {
              Taro.setStorageSync('access_token', result.access_token)
              Taro.setStorageSync('refresh_token', result.refresh_token)
            }
            cacheRequest.map(request => {
              request.header.Authorization = 'bearer ' + result.access_token
              chain.proceed(request).then(res => {
                return res
              })
            })
          }).catch(error => {
            isRefreshing = false
            console.log('刷新失败', error)
          })
        } else {
          cacheRequest.push(requestParams)
        }
      }
      throw error
    }
    throw error
  })
}

Taro.addInterceptor(interceptor)
// Taro.addInterceptor(authInterceptor)
// Taro.addInterceptor(refreshTokenInterceptor)
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)

const refreshToken = function () {
  const refresh_token = Taro.getStorageSync('refresh_token')
  return request('connect/token', {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    data: {
      client_id: '70d8bb06-0254-43f2-a371-0e1b2be932b0',
      client_secret: '830c409d-0f16-4c44-9eac-60e0f28d1bf7',
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    },
  })
}

const request = (url, options = { method: 'GET', contentType: 'application/json' }) => {
  return Taro.request({
    url: url.startsWith('http') ? url : apiConfig.host + url,
    method: options.method || 'GET',
    data: options.data,
    header: {
      'content-type': options.contentType,
    },
  })
}

const h5Request = {
  request: function ({ url, method = 'GET', data = {}, header = {}, oauth2=false }) {
    return new Promise(async function (resolve, reject) {
      const userId = Taro.getStorageSync('userId')
      if (!userId) {
        Taro.redirectTo({
          url: '/pages/oauth/signin/index',
        })
        return resolve({ code: '0000', message: '跳转到登录页', data: {} })
      }

      // 处理请求头
      if (oauth2) {
        const token = Taro.getStorageSync('token')
        header['Authorization'] = `Bearer ${token}`
      }

      if (method !== 'GET') {
        header['Content-Type'] = 'application/json'
      }

      await Taro.showLoading({ title: '加载中...' })
      const result = await Taro.request({
        url: apiConfig.host + url,
        method,
        data,
        header,
      })
      await Taro.hideLoading()

      if (result.statusCode === 401) {
        // 未认证，重新请求 token
        await h5Request.refreshToken()
        const result = await h5Request.request({ url, method, data, header, oauth2 })
        resolve(result)
      } else if (result.statusCode >= 200 && result.statusCode < 400) {
        resolve(result.data)
      } else  {
        reject({
          code: '9999',
          message: '服务端出错',
          data: {},
        })
      }
    })
  },
  refreshToken: async function () {
    const userId = Taro.getStorageSync('userId')
    const result = await Taro.request({
      url: h5Request.apiPrefix + api.OAUTH_TOKEN_GET,
      method: 'GET',
      data: { userId },
    })
    Taro.setStorageSync('token', result.data.data.token)

    const refresh_token = Taro.getStorageSync('refresh_token')
    return request('connect/token', {
      method: 'post',
      contentType: 'application/x-www-form-urlencoded',
      data: {
        client_id: '70d8bb06-0254-43f2-a371-0e1b2be932b0',
        client_secret: '830c409d-0f16-4c44-9eac-60e0f28d1bf7',
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      },
    })
  },
}

let request
if (process.env.TARO_ENV === 'weapp') {
  // request = weappRequest.request
} else {
  // h5 和 rn 都可以用 h5Request.request
  request = h5Request.request
}

export default request
