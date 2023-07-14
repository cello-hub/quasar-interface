import { SocialPlatfromInOne } from '../../constants/social-platform'
import { IPaginationParams } from '../../types/pagination'

export interface ISocialListParams extends IPaginationParams {
  platform?: string
}

export interface ICreateSocialParams {
  account: string
  password: string
  platform: SocialPlatfromInOne
  available: boolean
  remark: string
}

export interface IUpdateSocialParams {
  account: string
  password: string
  platform: SocialPlatfromInOne
  available: boolean
  remark: string
}
