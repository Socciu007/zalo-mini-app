import axios from 'axios'
import { goHome } from 'utils/location'
import zmp from 'zmp-sdk'

// create instance with default config
const http = axios.create({
  baseURL: 'https://www.dadaex.cn/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request Interceptor
http.interceptors.request.use(
  async (config) => {
    try {
      const res = await zmp.getStorage({ keys: ['Authorization'] });
      const token = res?.Authorization;
      if (token) {
        config.headers.Authorization = token;
      }
    } catch (err) {
      console.warn('No token in storage:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
)

// Response Interceptor
http.interceptors.response.use(
  (response) => {
    const { status, data } = response

    if (status === 200) {
      // if (data?.warning) {
      //   alert(data?.warning)
      //   // redirect login
      //   setTimeout(() => {
      //     goHome() // redirect to home
      //   }, 1500)
      //   return Promise.reject(data?.warning)
      // }
      return response
    }

    return Promise.reject(data)
  },
  (error) => {
    if (error.response?.status === 401) {
      alert('请登录')
      setTimeout(() => {
        goHome()
      }, 1500)
    } else if (error.response?.status === 500) {
      alert(error.response.data.errors)
    }
    return Promise.reject(error)
  }
)

export default http
