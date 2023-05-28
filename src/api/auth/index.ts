import Http from '../http'
import { ILoginParams } from './types'

export const login = (data: ILoginParams) => {
  return Http.post({
    url: '/auth/login',
    data
  })
}
