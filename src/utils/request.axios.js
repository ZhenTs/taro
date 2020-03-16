import { axios } from 'taro-axios'

axios.interceptors.response.use(response => {
    //拦截响应，做统一处理
    console.log(response)
    return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  })
