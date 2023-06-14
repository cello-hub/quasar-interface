import { message } from 'antd'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { get } from 'lodash-es'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

enum methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

interface IRequestConfig {
  /**
   * 请求的baseURL
   */
  baseURL?: string
  /**
   * 请求地址
   */
  url: string
  /**
   * 携带的参数
   */
  data?: any
  /**
   * 自定义header
   */
  headers?: any
  /**
   * 是否显示loading
   */
  showLoading?: boolean
  /**
   * 是否显示错误信息
   */
  showErrorMessage?: boolean
  /**
   * 请求错误展示的信息
   */
  errorMessage?: string
  /**
   * 是否忽略reponse statusCode
   */
  ignoreStatusCode?: boolean
}

class Http {
  static axiosInstance: AxiosInstance

  /**
   * 设置请求和响应拦截器
   */
  static setInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.axiosInstance.interceptors.response.use(
      (response) => {
        const code = get(response, 'data.code', 0)
        if (code === 200) return response
        if (code === 401) {
          window.location.href = '/login'
          return Promise.reject()
        }
        return Promise.reject(response.data)
      },
      (error: AxiosError) => {
        console.log(error)
        if (error.response?.status === 401) {
          window.location.href = '/login'
          return Promise.reject()
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * 单例: 创建axios实例
   * @returns axios实例
   */
  static getAxiosInstance(): AxiosInstance {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({
        timeout: 10000,
        withCredentials: true,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
      // 设置拦截器
      this.setInterceptors()
    }
    return this.axiosInstance
  }

  static get<T = any>(params: IRequestConfig): Promise<T> {
    return this._request(methods.GET, params)
  }

  static post<T = any>(params: IRequestConfig): Promise<T> {
    return this._request(methods.POST, params)
  }

  static put<T = any>(params: IRequestConfig): Promise<T> {
    return this._request(methods.PUT, params)
  }

  static delete<T = any>(params: IRequestConfig): Promise<T> {
    return this._request(methods.DELETE, params)
  }

  static patch<T = any>(params: IRequestConfig): Promise<T> {
    return this._request(methods.PATCH, params)
  }

  static _request<T = any>(
    method: methods,
    params: IRequestConfig
  ): Promise<T> {
    if (!params.url) throw new Error('url can not be empty')

    const config: AxiosRequestConfig = {
      url: params.url,
      method: method
    }
    if (method === methods.GET) {
      params.data && (config.params = params.data)
    } else {
      params.data && (config.data = params.data)
    }
    params.headers && (config.headers = params.headers)

    if (params.showLoading) {
      // Toast.loading({
      //   message: '加载中',
      //   forbidClick: true
      // })
    }
    const instance = this.getAxiosInstance()

    return instance(config)
      .then((response) => {
        return get(response, 'data.data', {})
      })
      .catch((error) => {
        if (params.ignoreStatusCode) return Promise.resolve(error)
        if (params.showErrorMessage !== false) {
          message.error((error && error.message) || 'An error occurred')
        }
        return Promise.reject(error)
      })
  }
}

export default Http
