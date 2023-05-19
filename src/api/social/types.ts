import { SocialPlatfromInOne } from '../../constants/social-platform'

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
