/**
 * @author lz
 * @description
 */

import Taro from '@tarojs/taro';
import apiConfig from '../config/apiConfig';

const errorMessage = {
  0: '未知错误',
  400: '请求错误',
  500: '服务器错误',
};

const LOG_TAG = 'HTTP';
const cacheRequest = [];
let isRefreshing = false;
// const showHeaderLog = false

// 统一日志处理、错误处理
const interceptor = function(chain) {
  const requestParams = chain.requestParams;
  logRequest(requestParams);
  return chain
    .proceed(requestParams)
    .then(res => {
      const {statusCode} = res;
      // 微信小程序所有错误会进成功回调，所以需要判断statusCode处理
      if (statusCode >= 200 && statusCode < 300) {
        logResponse(requestParams, res);
        return res.data;
      }
      throw res;
    })
    .catch(error => {
      return handleError(requestParams, error);
    });
};

const logRequest = function({method, data, url /* header */}) {
  console.log(
    LOG_TAG,
    `--> ${(method && method.toUpperCase()) || 'GET'} ${url} `,
  );
  // for (let key in header) {
  //   console.log(LOG_TAG, `${key}:${header[key]}`)
  // }
  data && console.log(LOG_TAG, ' ' + JSON.stringify(data));
  console.log(LOG_TAG, `--> END ${(method && method.toUpperCase()) || 'GET'}`);
};
const logResponse = function({url}, res) {
  console.log(LOG_TAG, `<-- ${res.statusCode || res.status} ${url}`);
  res.data && console.log(LOG_TAG, ' ' + JSON.stringify(res.data));
  console.log(LOG_TAG, `<-- END HTTP`);
};

const processErrorMessage = function(statusCode) {
  if (statusCode >= 400 && statusCode < 500) {
    return errorMessage[400];
  } else if (statusCode >= 500) {
    return errorMessage[500];
  }
  return errorMessage[0];
};

const handleError = function({url}, res) {
  const {status, statusCode, data} = res;
  if ((status || statusCode) === 401) {
    throw res;
  }
  return new Promise((resolve, reject) => {
    let message = '';
    if (statusCode) {
      console.log(LOG_TAG, `<-- ${statusCode} ${url}`);
      message = processErrorMessage(statusCode);
      console.log(LOG_TAG, data || message);
      console.log(LOG_TAG, `<-- END HTTP`);
      reject(message);
    } else if (status) {
      console.log(LOG_TAG, `<-- ${status} ${url}`);
      res
        .text()
        .then(text => {
          message = processErrorMessage(status);
          console.log(LOG_TAG, text || message);
          console.log(LOG_TAG, `<-- END HTTP`);
          reject(message);
        })
        .catch(e => {
          reject(e);
        });
    } else {
      reject(message);
    }
  });
};

// 统一认证处理
const authInterceptor = function(chain) {
  const requestParams = chain.requestParams;
  console.log('requestParams', requestParams);
  const header = requestParams.header || {};
  const access_token = Taro.getStorageSync('access_token');

  if (access_token) {
    header.Authorization = 'bearer ' + access_token;
  }
  return chain.proceed(requestParams);
};

const refreshTokenInterceptor = function(chain) {
  const requestParams = chain.requestParams;
  return chain
    .proceed(requestParams)
    .then(res => {
      return res;
    })
    .catch(error => {
      if (error.status === 401 || error.statusCode === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          cacheRequest.push(requestParams);
          return new Promise((resolve, reject) => {
            refreshToken()
              .then(result => {
                isRefreshing = false;
                if (result.access_token && result.refresh_token) {
                  Taro.setStorageSync('access_token', result.access_token);
                  Taro.setStorageSync('refresh_token', result.refresh_token);
                }
                cacheRequest.map(request => {
                  return chain
                    .proceed(request)
                    .then(res => {
                      resolve(res);
                    })
                    .catch(e => {
                      reject(e);
                    });
                });
              })
              .catch(e => {
                isRefreshing = false;
                console.log('刷新失败', e);
                reject(error);
              });
          });
        } else {
          cacheRequest.push(requestParams);
        }
      } else {
        throw error;
      }
    });
};
Taro.addInterceptor(refreshTokenInterceptor);
Taro.addInterceptor(authInterceptor);
Taro.addInterceptor(interceptor);

const refreshToken = function() {
  const refresh_token = Taro.getStorageSync('refresh_token');
  return Taro.request({
    url: apiConfig.host + 'connect/token',
    method: 'post',
    data: {
      client_id: '70d8bb06-0254-43f2-a371-0e1b2be932b0',
      client_secret: '830c409d-0f16-4c44-9eac-60e0f28d1bf7',
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  });
};

const request = (
  url,
  options = {method: 'GET', header: {}, contentType: 'application/json'},
) => {
  console.log(options);
  return Taro.request({
    url: url.startsWith('http') ? url : apiConfig.host + url,
    method: options.method || 'GET',
    data: options.data,
    header: {
      'content-type': options.contentType,
      ...options.header,
    },
  });
};

export default request;
