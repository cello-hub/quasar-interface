import axios from 'axios'
import { get } from 'lodash-es'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

class http {
  static axiosInstance

  static setInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        return config
      },
      async (error) => {
        return Promise.reject(error)
      }
    )

    this.axiosInstance.interceptors.response.use(
      (response) => {
        const code = get(response, 'data.code', 0)
        if (code === 200) return response
        return Promise.reject(response.data)
      },
      async (error) => {
        return Promise.reject(error)
      }
    )
  }

  /**
   * 单例: 创建axios实例
   * @returns axios实例
   */
  static getAxiosInstance() {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({
        // baseURL: envBaseURL,
        timeout: 20000 // 超时时间
      })
      // 设置拦截器
      this.setInterceptors()
    }
    return this.axiosInstance
  }

  static async get(params) {
    return this._request('GET', params)
  }

  static async post(params) {
    return this._request('POST', params)
  }

  static async put(params) {
    return this._request('PUT', params)
  }

  static async delete(params) {
    return this._request('DELETE', params)
  }

  static async patch(params) {
    return this._request('PATCH', params)
  }

  static async _request(method, params) {
    // const baseURL = params.baseURL ? params.baseURL : envBaseURL
    if (!params.url) throw new Error('url can not be empty')

    const config = {
      // baseURL,
      method,
      url: params.url
    }
    if (method === 'GET') {
      params.data && (config.params = params.data)
    } else {
      params.data && (config.data = params.data)
    }
    params.headers && (config.headers = params.headers)

    const instance = this.getAxiosInstance()

    return instance(config)
      .then((response) => {
        return get(response, 'data.data', {})
      })
      .catch(async (error) => {
        return Promise.reject(error)
      })
  }
}

export default http
