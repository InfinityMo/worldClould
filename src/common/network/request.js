/*
Author：Infinity
Time：2020-07-27
*/
import axios from 'axios'
import { stringify } from 'qs'
import store from '@/store'
import { Message } from 'element-ui'
// import router from '@/router'
// 创建axios实例，设置超时时间为4S
const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 40000
})
// instance.defaults.withCredentials = true // 配置跨域，需要跨域时将此配置加上，同时需要后端配合开放跨域
// 设置post请求默认 Content-Type
instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
// 请求服务器后返回的状态提示（请求异常时提示）
// eslint-disable-next-line no-unused-vars
const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但是访问是被禁止的',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除，且不会再得到的',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}
// 解决快速点击或并发请求出现的多个请求的问题
const pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
// eslint-disable-next-line no-unused-vars
const removePending = (config) => {
  const url = `${config.url}?${stringify(config.data)}`
  for (const p in pending) {
    if (pending[p].url === url) {
      pending[p].cancel('cancelToken')
      store.commit('setSpinning', false)
      pending.splice(p, 1)
    }
  }
}
// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // removePending(config)
    // 添加请求cancel
    // config.cancelToken = new axios.CancelToken((cancel) => {
    //   const url = `${config.url}?${stringify(config.data)}`
    //   pending.push({ url, cancel })
    // })
    // 序列化参数
    config.data = stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
instance.interceptors.response.use(response => {
  store.commit('setSpinning', false)
  // removePending(response.config) // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  return response.data // 过滤响应对象里多余的字段，只返回需要的data
}, error => {
  store.commit('setSpinning', false)
  // 如果错误是axios.Cancel构造出来的实例则说明多余的请求被拦截掉了，直接返回promise抛出错误信息
  // if (error.constructor === axios.Cancel) return Promise.reject(error)
  // 添加前端提示code
  let code = error.response && error.response.status
  // 如果code不存在且错误信息里包含timeout字段，判断为服务器请求超时，则code设置为504
  if (code === undefined && (error.message.includes('timeout') || error.message.includes('Network Error'))) code = 504
  Message.error(codeMessage[code])
  return Promise.reject(error)
})
// 清除请求参数的首尾空格
const trimParams = (params) => {
  for (const prop in params) {
    // eslint-disable-next-line no-prototype-builtins
    if (params.hasOwnProperty(prop)) {
      if (params[prop] && typeof (params[prop]) === 'string') {
        params[prop] = params[prop].trim()
      }
    }
  }
}
/*
url：请求的地址
params：请求的参数{ key:code }形式
isLoading：请求是否添加loading，默认添加，请求时为false，去除loading
*/
export default {
  // post 请求
  post (url, params, spinning) {
    trimParams(params)
    if (!spinning) {
      store.commit('setSpinning', true)
    }
    return instance.post(url, params)
  },
  // get 请求
  get (url, params, spinning) {
    if (!spinning) {
      store.commit('setSpinning', true)
    }
    return instance.get(url, params)
  }
}
